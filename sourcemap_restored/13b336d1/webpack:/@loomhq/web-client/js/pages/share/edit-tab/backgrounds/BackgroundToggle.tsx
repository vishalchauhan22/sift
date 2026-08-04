import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, Loader, Switch } from '@loomhq/lens';
import { EditItem } from '../common/edit-item';
import { usePreloadImages } from '@js/hooks/usePreloadImages';
import {
  PRESET_BACKGROUND_NAME_TO_SRC_MAP,
  PRESET_OPTIONS,
} from '@js/common/background-picker/image-background-picker/presets';
import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import {
  SharePageGetVideoBackgroundQuery,
  useSharePageGetVideoBackgroundQuery,
} from './SharePageGetVideoBackground.generated';
import { SelectedBackground } from '@js/common/background-picker/types';
import {
  BackgroundType,
  HexColor,
  PresetBackgroundName,
} from '@loomhq/shared-utilities';
import { useSharePageUpdateHexVideoBackgroundMutation } from './SharePageUpdateHexVideoBackground.generated';
import { useSharePageUpdatePresetVideoBackgroundMutation } from './SharePageUpdatePresetVideoBackground.generated';
import { useSharePageRemoveVideoBackgroundMutation } from './SharePageRemoveVideoBackground.generated';
import { useUpdateVideoAfterBackgroundChange } from './useUpdateVideoAfterBackgroundChange';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { BackgroundPicker } from '@js/common/background-picker/BackgroundPicker';
import { StackablePopover } from '@js/common/stackable-popover';
import { MiniBackgroundPreview } from '@js/common/background-picker/mini-background';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useSharePageUpdateCustomVideoBackgroundMutation } from './SharePageUpdateCustomVideoBackground.generated';
import { useConfirmationToast } from '@js/common/confirmation-toast';
import {
  fireShareBackgroundHexChangedEvent,
  fireShareBackgroundPresetChangedEvent,
  fireShareBackgroundSeeMoreClickedEvent,
  fireShareBackgroundToggledEvent,
} from './analyticsEvents';
import { OPEN_BACKGROUND_PICKER_PARAM } from '@loomhq/shared-utilities/constants/urlParams';

const BACKGROUND_UPDATE_ERROR_MESSAGE =
  'Failed to update background. Please try again.';

const selectVideoBackground = (
  videoBackgroundData: SharePageGetVideoBackgroundQuery | undefined
): SelectedBackground => {
  if (videoBackgroundData?.getVideo?.__typename !== 'RegularUserVideo') {
    return { type: 'none' };
  }

  const background = videoBackgroundData.getVideo.background;

  if (background?.__typename === 'PresetVideoBackground') {
    return {
      type: BackgroundType.PRESET,
      presetBackgroundName:
        background.presetBackgroundName as PresetBackgroundName,
    };
  }

  if (background?.__typename === 'HexVideoBackground') {
    return {
      type: BackgroundType.HEX,
      hexValue: background.hexValue as HexColor,
    };
  }

  if (background?.__typename === 'CustomVideoBackground') {
    return {
      type: BackgroundType.CUSTOM,
      assetId: background.assetId,
      src: background.src ?? '',
    };
  }

  return { type: 'none' };
};

const selectProcessingInformation = (
  videoBackgroundData: SharePageGetVideoBackgroundQuery | undefined
): any => {
  if (videoBackgroundData?.getVideo?.__typename !== 'RegularUserVideo') {
    return {
      trim_id: undefined,
      trim_progress: undefined,
      videoUploadValid: undefined,
    };
  }

  return videoBackgroundData.getVideo.processing_information;
};

export const BackgroundToggle = ({
  videoId,
  isUnavailable,
}: {
  videoId: string;
  isUnavailable: boolean;
}): JSX.Element => {
  // Preload the preset background images
  usePreloadImages(Object.values(PRESET_BACKGROUND_NAME_TO_SRC_MAP));
  const { setShowConfirmationToast } = useConfirmationToast();
  const { password } = useVideoPasswordContext();
  const updateVideoAfterBackgroundChange =
    useUpdateVideoAfterBackgroundChange();

  const { data: videoBackgroundData, loading: isVideoBackgroundLoading } =
    useSharePageGetVideoBackgroundQuery({
      variables: { videoId, password },
    });

  const background = useMemo(
    () => selectVideoBackground(videoBackgroundData),
    [videoBackgroundData]
  );

  const processingInformation = useMemo(
    () => selectProcessingInformation(videoBackgroundData),
    [videoBackgroundData]
  );

  const backgroundIsOn = useMemo(
    () => background.type !== 'none',
    [background]
  );

  const [updateHexVideoBackground, { loading: isUpdatingHexVideoBackground }] =
    useSharePageUpdateHexVideoBackgroundMutation({
      onCompleted: data => {
        if (
          data?.updateHexVideoBackground?.__typename ===
            'UpdateHexVideoBackgroundPayload' &&
          data.updateHexVideoBackground.video.background?.__typename ===
            'HexVideoBackground'
        ) {
          updateVideoAfterBackgroundChange(
            data.updateHexVideoBackground.video.processing_information
          );
          fireShareBackgroundHexChangedEvent({
            videoId,
            color: data.updateHexVideoBackground.video.background?.hexValue,
          });
        } else {
          setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
        }
      },
      onError: () => {
        setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
      },
    });

  const [
    updatePresetVideoBackground,
    { loading: isUpdatingPresetVideoBackground },
  ] = useSharePageUpdatePresetVideoBackgroundMutation({
    onCompleted: data => {
      if (
        data?.updatePresetVideoBackground?.__typename ===
          'UpdatePresetVideoBackgroundPayload' &&
        data.updatePresetVideoBackground.video.background?.__typename ===
          'PresetVideoBackground'
      ) {
        updateVideoAfterBackgroundChange(
          data.updatePresetVideoBackground.video.processing_information
        );
        fireShareBackgroundPresetChangedEvent({
          videoId,
          name: data.updatePresetVideoBackground.video.background
            ?.presetBackgroundName,
        });
      } else {
        setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
      }
    },
    onError: () => {
      setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
    },
  });

  const [
    updateCustomVideoBackground,
    { loading: isUpdatingCustomVideoBackground },
  ] = useSharePageUpdateCustomVideoBackgroundMutation({
    onCompleted: data => {
      if (
        data?.updateCustomVideoBackground?.__typename ===
        'UpdateCustomVideoBackgroundPayload'
      ) {
        updateVideoAfterBackgroundChange(
          data.updateCustomVideoBackground.video.processing_information
        );
      } else {
        setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
      }
    },
    onError: () => {
      setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
    },
  });

  const [removeVideoBackground, { loading: isRemovingVideoBackground }] =
    useSharePageRemoveVideoBackgroundMutation({
      onCompleted: data => {
        if (
          data?.removeVideoBackground?.__typename ===
          'RemoveVideoBackgroundPayload'
        ) {
          updateVideoAfterBackgroundChange(
            data.removeVideoBackground.video.processing_information
          );
        } else {
          setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
        }
      },
      onError: () => {
        setShowConfirmationToast(BACKGROUND_UPDATE_ERROR_MESSAGE);
      },
    });

  const isUpdatingBackground = useMemo(
    () =>
      isUpdatingHexVideoBackground ||
      isUpdatingPresetVideoBackground ||
      isUpdatingCustomVideoBackground ||
      isRemovingVideoBackground,
    [
      isUpdatingHexVideoBackground,
      isUpdatingPresetVideoBackground,
      isUpdatingCustomVideoBackground,
      isRemovingVideoBackground,
    ]
  );

  const isDisabled = useMemo(
    () => isVideoBackgroundLoading || isUpdatingBackground || isUnavailable,
    [isVideoBackgroundLoading, isUpdatingBackground, isUnavailable]
  );

  const [isBackgroundPickerOpen, setIsBackgroundPickerOpen] = useState(false);

  const onBackgroundDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBackgroundPickerOpen(!isBackgroundPickerOpen);
  };

  const handleSelectBackground = (selectedBackground: SelectedBackground) => {
    if (selectedBackground.type === 'none') {
      if (background.type === 'none') {
        return;
      }

      removeVideoBackground({
        variables: { videoId },
        optimisticResponse: {
          __typename: 'Mutation',
          removeVideoBackground: {
            __typename: 'RemoveVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: null,
              processing_information: processingInformation,
            },
          },
        },
      });
    } else if (selectedBackground.type === 'preset') {
      if (
        background.type === 'preset' &&
        selectedBackground.presetBackgroundName ===
          background.presetBackgroundName
      ) {
        return;
      }
      updatePresetVideoBackground({
        variables: {
          videoId,
          presetBackgroundName: selectedBackground.presetBackgroundName,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePresetVideoBackground: {
            __typename: 'UpdatePresetVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: {
                __typename: 'PresetVideoBackground',
                presetBackgroundName: selectedBackground.presetBackgroundName,
              },
              processing_information: processingInformation,
            },
          },
        },
      });
    } else if (selectedBackground.type === 'hex') {
      if (
        background.type === 'hex' &&
        selectedBackground.hexValue === background.hexValue
      ) {
        return;
      }
      updateHexVideoBackground({
        variables: { videoId, hexValue: selectedBackground.hexValue },
        optimisticResponse: {
          __typename: 'Mutation',
          updateHexVideoBackground: {
            __typename: 'UpdateHexVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: {
                __typename: 'HexVideoBackground',
                hexValue: selectedBackground.hexValue,
              },
              processing_information: processingInformation,
            },
          },
        },
      });
    } else if (selectedBackground.type === 'custom') {
      if (
        background.type === 'custom' &&
        selectedBackground.assetId === background.assetId
      ) {
        return;
      }
      updateCustomVideoBackground({
        variables: { videoId, assetId: selectedBackground.assetId },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCustomVideoBackground: {
            __typename: 'UpdateCustomVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: {
                __typename: 'CustomVideoBackground',
                assetId: selectedBackground.assetId,
                src: selectedBackground.src,
              },
              processing_information: processingInformation,
            },
          },
        },
      });
    }
  };

  const handleToggleBackground = () => {
    if (backgroundIsOn) {
      removeVideoBackground({
        variables: { videoId },
        optimisticResponse: {
          __typename: 'Mutation',
          removeVideoBackground: {
            __typename: 'RemoveVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: null,
              processing_information: processingInformation,
            },
          },
        },
      });
      fireShareBackgroundToggledEvent({
        videoId,
        enabled: false,
      });
    } else {
      // select first preset background
      const firstPresetBackgroundName = PRESET_OPTIONS[0].presetBackgroundName;
      updatePresetVideoBackground({
        variables: {
          videoId,
          presetBackgroundName: firstPresetBackgroundName,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updatePresetVideoBackground: {
            __typename: 'UpdatePresetVideoBackgroundPayload',
            video: {
              __typename: 'RegularUserVideo',
              id: videoId,
              background: {
                __typename: 'PresetVideoBackground',
                presetBackgroundName: firstPresetBackgroundName,
              },
              processing_information: processingInformation,
            },
          },
        },
      });
      fireShareBackgroundToggledEvent({
        videoId,
        enabled: true,
      });
    }
  };

  const onSeeMoreClicked = useCallback(() => {
    fireShareBackgroundSeeMoreClickedEvent({
      videoId,
    });
    // redirect to edit page with the same video id
    // and open the background picker
    window.location.href =
      window.location.href.replace('/share/', '/edit/') +
      `?${OPEN_BACKGROUND_PICKER_PARAM}=1`;
  }, [videoId]);

  const isCustomImageBackgroundsEnabled: boolean =
    useFeatureFlagValue(
      FEATURE_GATES.LOOM_CUSTOM_IMAGE_BACKGROUNDS,
      ControlType.STATSIG_FEATURE_GATE
    ) ?? false;

  return (
    <EditItem
      icon={<MiniBackgroundPreview selectedBackground={background} />}
      title={
        isUpdatingBackground
          ? 'Adding background...'
          : backgroundIsOn
            ? 'Background added'
            : 'Add background'
      }
      onClick={isBackgroundPickerOpen ? undefined : handleToggleBackground} // prevents bubbling up to the parent
      isDisabled={isDisabled}
      textOption={
        backgroundIsOn ? (
          <StackablePopover
            onClose={() => setIsBackgroundPickerOpen(false)}
            isOpen={isBackgroundPickerOpen}
            placement="bottomCenter"
            offset={1}
            content={
              <BackgroundPicker
                title="Add a background"
                selectedBackground={background}
                onSelectBackground={handleSelectBackground}
                onSeeMoreClicked={onSeeMoreClicked}
                onClose={() => setIsBackgroundPickerOpen(false)}
                allowCustomImages={isCustomImageBackgroundsEnabled}
                allowNone={false}
                variant="mini"
              />
            }
          >
            <IconButton
              icon={<SvgChevronDown />}
              size="small"
              onClick={onBackgroundDropdownClick}
              altText="Open background picker"
              isDisabled={isDisabled}
            />
          </StackablePopover>
        ) : null
      }
      rightOption={
        isUpdatingBackground ? (
          <Loader />
        ) : (
          <Switch readOnly isActive={backgroundIsOn} isDisabled={isDisabled} />
        )
      }
    />
  );
};
