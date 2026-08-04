import { ErrorSeverities } from '@js/constants/error-severities';
import { ESCAPE_LITERAL } from '@js/constants/keyCodes';
import { KEY_UP } from '@js/constants/keyEvents';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { UploadIcon } from '@js/common/upload-icon';
import { useVideoContext } from '@js/common/video-player';
import Mousetrap from 'mousetrap';
import React, { useCallback, useEffect } from 'react';
import { getCloudfrontURI } from '@js/utilities/avatar';
import fetch from '@js/utilities/fetch';

import { Arrange, Button, Container, Text } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';

import { OG_THUMB_FULL } from '@loomhq/shared-utilities/constants/video';

import SharePageDropzone from '../../../../share-video/share-page-dropzone/index';
import { ContentContainer } from '../../ContentContainer';
import { Footer } from '../Footer';

import { useRemoveVideoThumbnail } from '../common/useRemoveVideoThumbnail';
import { getDimensionsRecommendation } from './helper';

import './styles.less';

interface Props {
  goBackToEditPage: () => void;
  pageTitle: string;
}

export const ThumbnailWidget = ({
  goBackToEditPage,
  pageTitle,
}: Props): JSX.Element => {
  const { showErrorBar } = useErrorBar();
  const {
    video: { thumbnails },
  } = useVideoContext();
  const {
    isInThumbnailFlow,
    thumbnailData: { thumbnailLocal, uploading },
    endThumbnailFlow,
    initiateThumbnailSave,
    setLocalThumbnail,
  } = useThumbnailFlow();
  const { removeVideoThumbnail } = useRemoveVideoThumbnail();
  const handleDeleteThumbnail = () => {
    removeVideoThumbnail();

    setLocalThumbnail(null);
  };

  const readFile = useCallback(
    (blob: Blob) => {
      const reader = new FileReader();

      reader.onload = e => {
        const imgSrc = e?.target?.result as string;
        const img = new Image();

        img.onload = () => {
          setLocalThumbnail({
            url: imgSrc,
            dims: {
              width: img.width,
              height: img.height,
            },
          });
        };
        img.src = imgSrc;
      };
      reader.readAsDataURL(blob);
    },
    [setLocalThumbnail]
  );

  const handleFile = (file: File) => {
    if (!file) {
      return;
    }

    readFile(file);
  };

  const handleDropzoneDrop = (files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    handleFile(file);
  };

  const handleBrowseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length) {
      const file = files[0];

      handleFile(file);
    }

    (event.target as HTMLInputElement).value = '';
  };

  const handleUploadCoverClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
  };

  const handleAddCoverClick = () => {
    if (thumbnailLocal) {
      initiateThumbnailSave();

      return;
    }

    document.querySelector<HTMLInputElement>('#upload-thumbnail-file')?.click();
  };

  useEffect(() => {
    Mousetrap.bind(
      ESCAPE_LITERAL,
      () => {
        setLocalThumbnail(null);
        endThumbnailFlow();
      },
      KEY_UP
    );

    return () => {
      Mousetrap.unbind(ESCAPE_LITERAL, KEY_UP);
    };
  }, [endThumbnailFlow, setLocalThumbnail]);

  useEffect(() => {
    const ogThumbnail = (thumbnails || {})[OG_THUMB_FULL];

    if (!ogThumbnail) {
      return;
    }

    const couldfrontUri = getCloudfrontURI(ogThumbnail);

    if (!couldfrontUri) {
      return;
    }

    fetch(couldfrontUri)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Failed to fetch current thumbnail');
        }

        return resp.blob();
      })
      .then(thumbBlob => {
        readFile(thumbBlob);
      })
      .catch(() => {
        showErrorBar({
          message:
            'Oops! failed to fetch current thumbnail, please delete current thumbnail to upload new image',
          severity: ErrorSeverities.ERROR,
        });
      });
  }, [readFile, showErrorBar, thumbnails]);

  const onClose = () => {
    setLocalThumbnail(null);
    endThumbnailFlow();
    goBackToEditPage();
  };

  useEffect(() => {
    // when thumbnail flow ends, close widget
    if (!isInThumbnailFlow) {
      goBackToEditPage();
    }
  }, [isInThumbnailFlow, goBackToEditPage]);

  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const FooterContainer: React.FC<{ localThumbnail: string | null }> = ({
    localThumbnail = null,
  }) => {
    let deleteButton;

    if (localThumbnail) {
      deleteButton = (
        <Button
          variant="danger"
          icon={<SvgTrash />}
          onClick={handleDeleteThumbnail}
          hasFullWidth
        >
          Delete
        </Button>
      );
    }

    return (
      <Footer>
        {deleteButton}
        <Button
          variant="primary"
          isDisabled={uploading}
          onClick={handleAddCoverClick}
          hasFullWidth
        >
          {localThumbnail ? 'Save' : 'Browse'}
        </Button>
        <input
          type="file"
          className="upload-thumbnail-input"
          id="upload-thumbnail-file"
          onClick={handleUploadCoverClick}
          onChange={handleBrowseInput}
          accept="image/jpeg,image/pjpeg,image/png"
        />
      </Footer>
    );
  };

  return (
    <ContentContainer
      footer={<FooterContainer localThumbnail={thumbnailLocal} />}
      title={pageTitle}
      goBackToEditPage={onClose}
    >
      <div
        style={{ position: 'relative', marginTop: 'var(--lns-space-small)' }}
      >
        <div className="dropzone-wrapper">
          <SharePageDropzone multiple={false} onDrop={handleDropzoneDrop} />
        </div>
        <div className="thumbnail-dropzone-area">
          <div className="mb:small">
            <UploadIcon color="var(--lns-color-orange)" size={6} />
          </div>

          <Text>Drag and drop to upload</Text>
          <Text size="body-sm" color="bodyDimmed">
            {getDimensionsRecommendation()}
          </Text>
        </div>
        {thumbnailLocal && (
          <Container paddingY="medium">
            <Arrange autoFlow="row" justifyContent="center">
              <Text alignment="center">Adjust positioning and zoom</Text>
              <Text alignment="center" size="body-sm">
                Delete to use a different thumbnail
              </Text>
            </Arrange>
          </Container>
        )}
      </div>
    </ContentContainer>
  );
};
