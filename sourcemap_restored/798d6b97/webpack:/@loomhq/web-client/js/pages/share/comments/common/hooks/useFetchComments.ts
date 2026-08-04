import { ErrorSeverities } from '@js/constants/error-severities';
import { ApolloError } from '@apollo/client';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext } from '@js/common/video-player';
import { useErrorStore } from '@js/components/video-player-fresh/error-layer/ErrorStoreProvider';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { inEmbedPlayer } from '@js/utilities/url';
import { useFetchVideoCommentsQuery } from '@js/pages/share/common/comments/FetchComments.generated';
import { useEffect, useMemo } from 'react';
import {
  CommentAddedDocument,
  CommentAddedSubscription,
  CommentAddedSubscriptionVariables,
} from '@js/pages/share/common/comments/CommentAdded.generated';
import { mergeNewComment } from '@js/pages/share/common/comments/mergeNewComment';

const COMMENT_FETCH_ERROR = 'Error fetching comments';

export function useFetchComments(): {
  comments: CommentFromServer[];
  videoMeetingPlatform: string | null;
  error?: ApolloError;
  loading: boolean;
  refetch: () => void;
} {
  const { video } = useVideoContext();
  const { password } = useVideoPasswordContext();
  const { pushError } = useErrorStore();
  const { showErrorBar } = useErrorBar();

  const { data, error, loading, refetch, subscribeToMore } =
    useFetchVideoCommentsQuery({
      variables: { id: video.modelId, password },
      onError: () => {
        // In the web-app, prefer using the error object returned
        // by the hook over the error banner
        if (inEmbedPlayer()) {
          pushError(COMMENT_FETCH_ERROR);
          showErrorBar({
            message: 'Failed to fetch comments.',
            severity: ErrorSeverities.ERROR,
          });
        }
      },
    });

  useEffect(() => {
    const unsubscribe = subscribeToMore<
      CommentAddedSubscription,
      CommentAddedSubscriptionVariables
    >({
      document: CommentAddedDocument,
      variables: { videoId: video.modelId, password },
      updateQuery: (prev, { subscriptionData }) => {
        // Ensure valid comment and video data
        if (
          !subscriptionData.data?.videoCommentAdded ||
          prev.video?.__typename !== 'RegularUserVideo'
        ) {
          return prev;
        }

        const existingComments = prev.video.video_comments ?? [];
        const newComment = subscriptionData.data?.videoCommentAdded;
        const newComments = mergeNewComment({
          existingComments,
          newComment,
        });

        return {
          ...prev,
          video: { ...prev.video, video_comments: newComments },
        };
      },
    });

    return unsubscribe;
  }, [subscribeToMore, video.modelId, password]);

  const comments = useMemo(() => {
    if (data?.video?.__typename !== 'RegularUserVideo') {
      return [];
    }

    return data.video.video_comments as CommentFromServer[];
  }, [data]);

  const videoMeetingPlatform = useMemo(() => {
    if (data?.video?.__typename !== 'RegularUserVideo') {
      return null;
    }
    return data.video.videoMeetingPlatform;
  }, [data]);

  return {
    comments,
    videoMeetingPlatform,
    error,
    loading,
    refetch,
  };
}
