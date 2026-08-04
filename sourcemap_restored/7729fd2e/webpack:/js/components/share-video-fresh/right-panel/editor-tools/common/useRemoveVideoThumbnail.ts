import { ErrorSeverities } from '@js/constants/error-severities';

import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext, Video } from '@js/common/video-player';
import {
  RemoveVideoThumbnailMutation,
  useRemoveVideoThumbnailMutation,
} from '@js/utilities/RemoveVideoThumbnail.generated';
import { getCloudfrontURI } from '@js/utilities/avatar';
import * as loggerx from '@js/utilities/loggerx';

import {
  THUMB_VIDEO_PREVIEW,
  THUMB_GIF_PLAY,
  THUMB_GIF,
  THUMB_FULL_PLAY,
  THUMB_FULL,
  OG_THUMB_FULL,
  THUMB_DEFAULT_PLAY,
  THUMB_DEFAULT_4x3,
  THUMB_DEFAULT,
} from '@loomhq/shared-utilities/constants/video';
import { Feature } from '@loomhq/shared-utilities/constants/product';

const selectThumbnailsForVideoContext = (
  video: Video,
  dataFromServer: RemoveVideoThumbnailMutation
) => {
  if (
    dataFromServer?.removeVideoThumbnail?.__typename !==
      'RemoveVideoThumbnailPayload' ||
    !dataFromServer?.removeVideoThumbnail?.video
  ) {
    return null;
  }
  const videoFromServer = dataFromServer?.removeVideoThumbnail?.video;
  return {
    thumbnails: {
      ...video.thumbnails,
      [THUMB_DEFAULT]: videoFromServer.thumbnails.default ?? undefined,
      [THUMB_DEFAULT_4x3]: videoFromServer.thumbnails.default4X3 ?? undefined,
      [THUMB_DEFAULT_PLAY]: videoFromServer.thumbnails.defaultPlay ?? undefined,
      [OG_THUMB_FULL]: videoFromServer.thumbnails.ogFull ?? undefined,
      [THUMB_FULL]: videoFromServer.thumbnails.full ?? undefined,
      [THUMB_FULL_PLAY]: videoFromServer.thumbnails.fullPlay ?? undefined,
      [THUMB_GIF]: videoFromServer.thumbnails.defaultGif ?? undefined,
      [THUMB_GIF_PLAY]: videoFromServer.thumbnails.defaultGifPlay ?? undefined,
      [THUMB_VIDEO_PREVIEW]:
        videoFromServer.thumbnails.animatedPreview ?? undefined,
      previewFullUrl:
        getCloudfrontURI(videoFromServer.thumbnails.animatedPreview) ?? '',
      defaultFullUrl:
        getCloudfrontURI(videoFromServer.defaultThumbnails.default) ?? '',
      staticFullUrl:
        getCloudfrontURI(videoFromServer.defaultThumbnails.static) ?? '',
    },
  };
};

export const useRemoveVideoThumbnail = (): {
  removeVideoThumbnail: () => void;
} => {
  const {
    setVideo,
    video: videoFromContext,
    video: { id: videoId },
  } = useVideoContext();

  const { showErrorBar } = useErrorBar();
  const { setShowConfirmationToast } = useConfirmationToast();

  const { password } = useVideoPasswordContext();

  const [removeVideoThumbnail] = useRemoveVideoThumbnailMutation({
    variables: { videoId, password },
    refetchQueries: ['fetchVideoData'],
    onError: error => {
      showErrorBar({
        message: 'Oops! Failed to remove video thumbnail.',
        severity: ErrorSeverities.ERROR,
      });
      loggerx.error(
        'Error in removeVideoThumbnail mutation',
        { error },
        { feature: Feature.CustomThumbnails }
      );
    },
    onCompleted: data => {
      const result = data?.removeVideoThumbnail;
      if (!result || result?.__typename !== 'RemoveVideoThumbnailPayload') {
        showErrorBar({
          message: result?.message || 'Oops! Failed to remove video thumbnail.',
          severity: ErrorSeverities.ERROR,
        });
        return;
      }
      const updatedVideo = selectThumbnailsForVideoContext(
        videoFromContext,
        data
      );
      if (updatedVideo) {
        setVideo(updatedVideo);
      }
      setShowConfirmationToast('Thumbnail deleted');
    },
  });

  return {
    removeVideoThumbnail,
  };
};
