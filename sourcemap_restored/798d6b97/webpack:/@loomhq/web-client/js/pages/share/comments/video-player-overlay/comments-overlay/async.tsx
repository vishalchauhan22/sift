import { UiEvents, usePlayerFromContext } from '@js/common/video-player';
import { useCreateAutoComment } from '@js/pages/share/comments/common/auto-comment-and-reaction/hooks';
import { useCommentStore } from '@js/pages/share/comments/common/createStore';
import { useFetchComments } from '@js/pages/share/comments/common/hooks';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { isFullScreen } from '@js/pages/share/common/helpers';
import React, { Suspense } from 'react';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import type { CommentsOverlayProps } from '../common/types';

const CommentsOverlay = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "CommentsOverlay" */ '@js/pages/share/comments/video-player-overlay/comments-overlay'
  ).then(module => ({ default: module.CommentsOverlay }))
);

const LazyLoadTracker = ({
  setIsOverlayReady,
}: {
  setIsOverlayReady: (isOverlayReady: boolean) => void;
}): null => {
  React.useEffect(() => {
    // isOverlayReady is set to true once the suspense fallback unmounts
    return () => {
      setIsOverlayReady(true);
    };
  }, [setIsOverlayReady]);

  return null;
};

export const MayRenderCommentsOverlay = ({
  isSharePlayer,
}: CommentsOverlayProps): JSX.Element => {
  const player = usePlayerFromContext();
  const { comments, videoMeetingPlatform } = useFetchComments();
  const autoComment = useCreateAutoComment();
  const isPlaying = React.useRef(false);
  const [commentsSelected, setCommentsSelected] = React.useState<string[]>([]);
  const [commentsSelectedAsync, setCommentsSelectedAsync] = React.useState<
    string[]
  >([]);
  const [hasOverlayOpenedOnce, setHasOverlayOpenedOnce] =
    React.useState<boolean>(false);
  const { overlayOpen, setOverlayOpen, timestampClicked, setTimestampClicked } =
    useCommentStore();
  const [commentsWithAutoComment, setCommentsWithAutoComment] =
    React.useState<CommentFromServer[]>();

  const [isOverlayReady, setIsOverlayReady] = React.useState<boolean | null>(
    false
  );

  // reset selected state when overlay closes
  React.useEffect(() => {
    if (overlayOpen) {
      setHasOverlayOpenedOnce(true);

      return;
    }

    setCommentsSelected([]);
  }, [overlayOpen, setHasOverlayOpenedOnce]);

  // register for comment click event
  React.useEffect(() => {
    if (!player) {
      return;
    }

    isPlaying.current = !player.paused;
    const handleCommentEvent = selectedComments => {
      isPlaying.current = !player.paused;

      // we don't want to show overlay if on share page and not full screen, but still pause
      if (isSharePlayer && !isFullScreen()) {
        if (isPlaying.current) {
          player?.togglePlay();
        }

        return;
      }

      setOverlayOpen(true);

      if (isOverlayReady) {
        setCommentsSelected(selectedComments);
      } else {
        // Since we lazy load the comments overlay, if the overlay is still loading we want to
        // delay scrolling and highlighting the comments till isOverlayReady === true (see useEffect hook below)
        setCommentsSelectedAsync(selectedComments);
      }
    };

    player?.on([UiEvents.commentClicked], handleCommentEvent);

    return () => {
      player?.off([UiEvents.commentClicked], handleCommentEvent);
    };
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, setOverlayOpen, isOverlayReady]);

  // Close comments overlay if exiting full screen mode in share player
  React.useEffect(() => {
    if (!player) {
      return;
    }

    const handleFullScreenExit = () => {
      if (
        !document['webkitIsFullScreen'] &&
        !document['mozFullScreen'] &&
        !document['msFullscreenElement'] &&
        isSharePlayer
      ) {
        setOverlayOpen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenExit);
    document.addEventListener('webkitfullscreenchange', handleFullScreenExit);
    document.addEventListener('mozfullscreenchange', handleFullScreenExit);
    document.addEventListener('MSFullscreenChange', handleFullScreenExit);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenExit);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullScreenExit
      );
      document.removeEventListener('mozfullscreenchange', handleFullScreenExit);
      document.removeEventListener('MSFullscreenChange', handleFullScreenExit);
    };
  }, [isSharePlayer, player, setOverlayOpen]);

  // insert autoComment for sharePlayer overlay only
  React.useEffect(() => {
    if (comments) {
      if (autoComment && isSharePlayer) {
        setCommentsWithAutoComment([autoComment, ...comments]);

        return;
      }

      setCommentsWithAutoComment(comments);
    }
  }, [comments, autoComment, isSharePlayer]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    player.media.setAttribute('data-active', overlayOpen ? 'false' : 'true');

    if (timestampClicked) {
      player.play();
      setTimestampClicked(false);

      return;
    }

    if (isPlaying.current) {
      player.togglePlay();
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayOpen]);

  // Since we lazy load the comments overlay, we will only highlight and scroll comments once isOverlayReady is true
  React.useEffect(() => {
    if (isOverlayReady && commentsSelectedAsync) {
      setCommentsSelected(commentsSelectedAsync);
      setCommentsSelectedAsync([]);
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverlayReady]);

  return (
    <Suspense
      fallback={<LazyLoadTracker setIsOverlayReady={setIsOverlayReady} />}
    >
      {hasOverlayOpenedOnce ? (
        <CommentsOverlay
          comments={
            commentsWithAutoComment ? commentsWithAutoComment : comments
          }
          commentsSelected={commentsSelected}
          overlayOpen={overlayOpen}
          videoMeetingPlatform={videoMeetingPlatform}
        />
      ) : undefined}
    </Suspense>
  );
};
