import React, { useMemo, useState } from 'react';

import { Arrange, Container, Text, IconButton, Button } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import { useFileUploader } from '@js/common/useFileUploader';
import { useUppyForAssetUploads } from '@js/utilities/uppy/assetUploads';

import { ASSETS_S3_FOLDER } from '@loomhq/shared-utilities/constants/asset';

import { BackgroundType } from '@loomhq/shared-utilities';

import { ErrorText } from '@js/common/error-management';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as logger from '@js/utilities/loggerx';

import { SelectedBackground } from './types';
import placeholderImage from '@assets/img/background-for-editing/placeholder-image.svg';

import { useAddAssetMutation } from '@js/common/asset/AddAsset.generated';
import { useDeleteAssetMutation } from '@js/common/asset/DeleteAsset.generated';
import {
  GetAssetsForUserDocument,
  useGetAssetsForUserQuery,
} from '@js/common/asset/GetAssetsForUser.generated';
import {
  ColorOptionButton,
  CustomColorButton,
  COLOR_PALETTE_OPTIONS,
} from './hex-background-picker';
import {
  ImageOptionButton,
  CustomUploadOptionButton,
  PresetOptionButton,
  NoBackgroundOptionButton,
  PRESET_OPTIONS,
} from './image-background-picker';
import { MiniBackgroundIcon } from './mini-background';

const FULL_PICKER_WIDTH = 376;
const MINI_PICKER_WIDTH = 168;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 10; // 10 MB
const MAX_ALLOWED_BACKGROUNDS = 4; // Maximum number of custom backgrounds allowed

type BackgroundPickerProps = {
  title: string;
  selectedBackground: SelectedBackground;
  onSelectBackground: (background: SelectedBackground) => void;
  onCustomBackgroundAdded?: ({
    assetId,
    fileSize,
    status,
  }: {
    assetId: string | null;
    fileSize: number;
    status: 'success' | 'fail';
  }) => void;
  onCustomBackgroundDeleted?: ({ assetId }: { assetId: string }) => void;
  onSeeMoreClicked?: () => void;
  onClose: () => void;
  allowNone?: boolean;
  allowCustomImages?: boolean;
  uploadLocation?: string;
  variant?: 'full' | 'mini';
};

export const BackgroundPicker = ({
  title,
  selectedBackground,
  onSelectBackground,
  onCustomBackgroundAdded,
  onCustomBackgroundDeleted,
  onSeeMoreClicked,
  onClose,
  allowNone = true,
  allowCustomImages = false,
  uploadLocation,
  variant = 'full',
}: BackgroundPickerProps): JSX.Element => {
  const [addAsset] = useAddAssetMutation();
  const [deleteAsset] = useDeleteAssetMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // define custom error messages for Uppy https://uppy.io/docs/uppy/#locale
  const localeOptions = {
    strings: {
      exceedsSize: `Upload failed: image must be under ${MAX_FILE_SIZE}MB`,
    },
  };

  // Setup Uppy instance
  const uppy = useUppyForAssetUploads({
    allowedFileTypes: ALLOWED_FILE_TYPES,
    maxFileSizeMB: MAX_FILE_SIZE,
    maxNumberOfFiles: 1,
    localeOptions,
    onUploadSuccess: (uploadedFile, data) => {
      // Reset error message on successful upload
      setErrorMessage(null);

      // Get the uploaded file URL and set it as custom image
      const uploadedFileName = uploadedFile.name;
      const s3Key = data.body?.key;
      if (!s3Key || !uploadLocation) {
        return;
      }
      const s3Id = s3Key.replace(ASSETS_S3_FOLDER, '');
      addAsset({
        variables: { s3Id, uploadedFileName, uploadLocation },
        refetchQueries: [GetAssetsForUserDocument],
        onCompleted: completedData => {
          if (
            !completedData ||
            !completedData.addAsset ||
            completedData.addAsset.__typename !== 'AddAssetPayload'
          ) {
            setErrorMessage('Upload failed: Try again');
            logger.error(
              'Error in addAsset mutation',
              { s3Id },
              { feature: Feature.VideoBackground }
            );
            return;
          }
          const assetId = completedData.addAsset.asset?.id;
          if (!assetId) {
            setErrorMessage('Upload failed: Try again');
            logger.error(
              'Error in addAsset mutation. Asset ID not found',
              { s3Id },
              { feature: Feature.VideoBackground }
            );
            return;
          }
          if (uploadedFile && uploadedFile.data) {
            const fileUrl = URL.createObjectURL(uploadedFile.data);
            onSelectBackground({
              type: BackgroundType.CUSTOM,
              assetId,
              src: fileUrl,
            });
            onCustomBackgroundAdded?.({
              assetId,
              fileSize: uploadedFile.size,
              status: 'success',
            });
          }
          setIsLoading(false);
        },
        onError: error => {
          setIsLoading(false);
          logger.error(
            error,
            {
              s3Id,
            },
            { feature: Feature.VideoBackground }
          );
        },
      });
    },
    onUploadError: (file, error) => {
      setErrorMessage('Upload failed: Try again');
      setIsLoading(false);

      onCustomBackgroundAdded?.({
        assetId: null,
        fileSize: file.size,
        status: 'fail',
      });

      logger.error(
        error,
        {
          fileType: file.type,
          fileSize: file.size,
        },
        { feature: Feature.VideoBackground }
      );
    },
    onUploadStart: () => {
      setIsLoading(true);
    },
  });

  const { data: assetsData } = useGetAssetsForUserQuery({
    variables: uploadLocation ? { uploadLocation } : {},
  });

  const { latestAssets, isAtMaxLimit } = useMemo(() => {
    const returnData = assetsData?.getAssetsForUser;
    if (
      returnData?.__typename !== 'GetAssetsForUserPayload' ||
      returnData.assets === null
    ) {
      return { latestAssets: [], isAtMaxLimit: false };
    }
    const assets = returnData.assets.slice(0, MAX_ALLOWED_BACKGROUNDS);
    return {
      latestAssets: assets,
      isAtMaxLimit: assets.length >= MAX_ALLOWED_BACKGROUNDS,
    };
  }, [assetsData]);

  const handleImageDelete = async (assetId: string) => {
    if (!assetId) {
      return;
    }

    try {
      // TODO: Consume loading state here to show loading spinner
      await deleteAsset({
        variables: { assetId },
        refetchQueries: [GetAssetsForUserDocument],
        onCompleted: () => {
          setErrorMessage(null);
          if (
            selectedBackground.type === BackgroundType.CUSTOM &&
            selectedBackground.assetId === assetId
          ) {
            onSelectBackground({ type: 'none' });
          }
          onCustomBackgroundDeleted?.({ assetId });
          logger.info(
            `Background image with Asset ID is deleted successfully`,
            {
              assetId,
            },
            { feature: Feature.VideoBackground }
          );
        },
        onError: error => {
          setErrorMessage('Failed to delete image. Try again.');
          logger.error(
            error,
            { assetId },
            { feature: Feature.VideoBackground }
          );
        },
      });
    } catch (error) {
      setErrorMessage('Failed to delete image. Try again.');
      logger.error(error, { assetId }, { feature: Feature.VideoBackground });
    }
  };

  const handleCustomImageSelected = (file: File) => {
    // Reset Uppy state before adding new file to ensure clean slate
    uppy.reset();
    setErrorMessage(null);

    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
      source: 'Local',
      isRemote: false,
    });
  };

  const { openFileDialog, fileInputElement } = useFileUploader({
    onFileSelected: handleCustomImageSelected,
    onError: error => {
      setErrorMessage(error.message);
      logger.error(error, {}, { feature: Feature.VideoBackground });
    },
    accept: ALLOWED_FILE_TYPES.join(','),
    validate: false, // Validation is handled by Uppy
  });

  const isDisabled = isLoading || isAtMaxLimit;
  const disabledReason = isLoading
    ? 'Uploading...'
    : `Max ${MAX_ALLOWED_BACKGROUNDS} uploads. Delete an image to add more`;

  const isSelectedColorInPalette = useMemo(
    () =>
      COLOR_PALETTE_OPTIONS.some(
        paletteOption =>
          selectedBackground.type === BackgroundType.HEX &&
          selectedBackground.hexValue === paletteOption.hexValue
      ),
    [selectedBackground]
  );

  const selectedColor = useMemo(
    () =>
      selectedBackground.type === BackgroundType.HEX
        ? selectedBackground.hexValue
        : null,
    [selectedBackground]
  );

  // Store extra background option
  // This is specifically used for the mini picker
  // to continue showing a custom image or custom hex
  // that was previously selected
  const [extraBackgroundOption] = useState<SelectedBackground | null>(() => {
    if (variant === 'full') {
      return null;
    }
    if (
      (selectedBackground.type === BackgroundType.CUSTOM &&
        allowCustomImages) ||
      (selectedBackground.type === BackgroundType.HEX &&
        !isSelectedColorInPalette)
    ) {
      return selectedBackground;
    }
    return null;
  });

  return (
    <Container
      backgroundColor="background"
      radius="250"
      shadow="large"
      borderSide="all"
      padding="medium"
      width={`${variant === 'full' ? FULL_PICKER_WIDTH : MINI_PICKER_WIDTH}px`}
    >
      <Arrange gap="medium" autoFlow="row">
        {variant === 'full' ? (
          <>
            <Arrange justifyContent="space-between">
              <Text fontWeight="bold" size="body-lg">
                {title}
              </Text>
              <IconButton
                size="small"
                icon={<SvgClose />}
                altText="close background picker"
                onClick={onClose}
              />
            </Arrange>

            {errorMessage && <ErrorText error={errorMessage} />}
            <Arrange gap="small" columns={`repeat(3, 1fr)`} role="listbox">
              {allowNone && (
                <NoBackgroundOptionButton
                  isSelected={selectedBackground.type === 'none'}
                  onClick={() => onSelectBackground({ type: 'none' })}
                />
              )}

              {allowCustomImages && (
                <CustomUploadOptionButton
                  isSelected={false}
                  onClick={openFileDialog}
                  isDisabled={isDisabled}
                  disabledReason={disabledReason}
                />
              )}

              {PRESET_OPTIONS.map(presetOption => (
                <PresetOptionButton
                  key={presetOption.presetBackgroundName}
                  isSelected={
                    selectedBackground.type === BackgroundType.PRESET &&
                    selectedBackground.presetBackgroundName ===
                      presetOption.presetBackgroundName
                  }
                  presetOption={presetOption}
                  onClick={() =>
                    onSelectBackground({
                      type: BackgroundType.PRESET,
                      presetBackgroundName: presetOption.presetBackgroundName,
                    })
                  }
                />
              ))}

              {allowCustomImages &&
                latestAssets.map(asset => {
                  const isSelected =
                    selectedBackground.type === BackgroundType.CUSTOM &&
                    selectedBackground.assetId === asset.id;
                  return (
                    <ImageOptionButton
                      key={asset.id}
                      isSelected={isSelected}
                      onClick={() => {
                        if (isSelected) {
                          return;
                        }
                        onSelectBackground({
                          type: BackgroundType.CUSTOM,
                          assetId: asset.id ?? '',
                          src: asset.srcUrl ?? '',
                        });
                      }}
                      onDelete={() => handleImageDelete(asset.id ?? '')}
                      imageSrc={asset.srcUrl ?? placeholderImage}
                    />
                  );
                })}

              {/* Placeholder loading state until the uploaded image is loaded */}
              {isLoading && (
                <ImageOptionButton isLoading={true} onClick={() => {}} />
              )}
            </Arrange>
            {/* Hidden file input - required for the hook */}
            {allowCustomImages && fileInputElement}

            <Arrange gap="small" role="listbox">
              {COLOR_PALETTE_OPTIONS.map(paletteOption => (
                <ColorOptionButton
                  key={paletteOption.label}
                  color={paletteOption.hexValue}
                  name={paletteOption.label}
                  onClick={() =>
                    onSelectBackground({
                      type: BackgroundType.HEX,
                      hexValue: paletteOption.hexValue,
                    })
                  }
                  isSelected={
                    selectedBackground.type === 'hex' &&
                    selectedBackground.hexValue === paletteOption.hexValue
                  }
                />
              ))}
              <CustomColorButton
                isSelected={
                  selectedBackground.type === 'hex' && !isSelectedColorInPalette
                }
                selectedColor={selectedColor}
                onSelectedColorChange={hexValue => {
                  onSelectBackground({
                    type: BackgroundType.HEX,
                    hexValue,
                  });
                }}
              />
            </Arrange>
          </>
        ) : (
          <Arrange gap="small" autoFlow="row">
            <Arrange gap="4px" columns={`repeat(5, 1fr)`} role="listbox">
              {PRESET_OPTIONS.map(presetOption => (
                <MiniBackgroundIcon
                  key={presetOption.presetBackgroundName}
                  background={{
                    type: BackgroundType.PRESET,
                    presetBackgroundName: presetOption.presetBackgroundName,
                  }}
                  isSelected={
                    selectedBackground.type === BackgroundType.PRESET &&
                    selectedBackground.presetBackgroundName ===
                      presetOption.presetBackgroundName
                  }
                  onClick={() =>
                    onSelectBackground({
                      type: BackgroundType.PRESET,
                      presetBackgroundName: presetOption.presetBackgroundName,
                    })
                  }
                />
              ))}
              {extraBackgroundOption?.type === BackgroundType.CUSTOM && (
                <MiniBackgroundIcon
                  background={extraBackgroundOption}
                  isSelected={
                    selectedBackground.type === BackgroundType.CUSTOM &&
                    selectedBackground.assetId === extraBackgroundOption.assetId
                  }
                  onClick={() => {
                    onSelectBackground(extraBackgroundOption);
                  }}
                />
              )}
              {COLOR_PALETTE_OPTIONS.map(paletteOption => (
                <MiniBackgroundIcon
                  key={paletteOption.label}
                  background={{
                    type: BackgroundType.HEX,
                    hexValue: paletteOption.hexValue,
                  }}
                  isSelected={
                    selectedBackground.type === BackgroundType.HEX &&
                    selectedBackground.hexValue === paletteOption.hexValue
                  }
                  onClick={() =>
                    onSelectBackground({
                      type: BackgroundType.HEX,
                      hexValue: paletteOption.hexValue,
                    })
                  }
                />
              ))}
              {extraBackgroundOption?.type === BackgroundType.HEX && (
                <MiniBackgroundIcon
                  background={extraBackgroundOption}
                  isSelected={
                    selectedBackground.type === BackgroundType.HEX &&
                    selectedBackground.hexValue ===
                      extraBackgroundOption.hexValue
                  }
                  onClick={() => {
                    onSelectBackground(extraBackgroundOption);
                  }}
                />
              )}
            </Arrange>
            <Button size="small" onClick={onSeeMoreClicked}>
              See more
            </Button>
          </Arrange>
        )}
      </Arrange>
    </Container>
  );
};
