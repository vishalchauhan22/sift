import { ErrorSeverities } from '@js/constants/error-severities';

// eslint-disable-next-line no-restricted-imports
import { ApolloError, useMutation } from '@apollo/client';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoPasswordContext } from '@js/common/video-password';
import {
  usePlayerFromContext,
  useVideoContext,
  useViewportContext,
} from '@js/common/video-player';
import { useErrorStore } from '@js/components/video-player-fresh/error-layer/ErrorStoreProvider';
import * as logger from '@js/utilities/loggerx';
import { inEmbedPlayer } from '@js/utilities/url';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useToggleFollowingVideoMutation } from '../ToggleFollowingVideo.generated';
import CreateCommentPost from './CreateCommentPost.gql';
import CreateCommentReply from './CreateCommentReply.gql';
import FetchComments from './FetchComments.gql';
import { mergeNewComment } from './mergeNewComment';

const COMMENT_CREATE_ERROR = 'Error creating comment';
const COMMENT_DISABLED_ERROR = 'Comments disabled on this video';

const COMMENTS_SMALL_WIDTH_BREAKPOINT = 350;

export function useCommentsInSmallWidth(): boolean {
  const { width } = useViewportContext();

  return width <= COMMENTS_SMALL_WIDTH_BREAKPOINT;
}

type CreateCommentParams = {
  content?: string | undefined;
  parentPostId?: string;
  anonName?: string;
  anonUserName?: string; // NOTE(tatiana): Likely redundant to above, but larger refactor needed to consolidate
  extendedReaction?: string;
  timestamp?: number;
  addReplyId?: string | null;
};

type useCreateCommentParams = {
  handleOnCompleteCreateComment?: () => void;
  shouldUseGlobalError?: boolean;
};

type CreateComment = (params: CreateCommentParams) => void;

export function useCreateComment({
  handleOnCompleteCreateComment,
  shouldUseGlobalError,
}: useCreateCommentParams = {}): {
  createComment: CreateComment;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const { video } = useVideoContext();
  const { password } = useVideoPasswordContext();
  const player = usePlayerFromContext();
  const { pushError } = useErrorStore();
  const { showErrorBar } = useErrorBar();
  const commentsEnabled = video.commentsEnabled;
  const videoId = video.modelId;
  const { anonUserName } = useAnonUserName();

  const [toggleFollowingVideoMutation, { loading: userFollowingVideoLoading }] =
    useToggleFollowingVideoMutation({
      onError: err => {
        logger.warning(err, { message: 'Error toggle video follow' });
      },
    });

  const toggleFollowingVideo = () => {
    if (!video.isOwner && !inEmbedPlayer() && !userFollowingVideoLoading) {
      toggleFollowingVideoMutation({
        variables: {
          videoId,
          follow: true,
          password,
        },
      });
    }
  };

  const createComment: CreateComment = ({
    content,
    parentPostId,
    anonName,
    extendedReaction,
    timestamp,
  }: CreateCommentParams) => {
    if (!commentsEnabled) {
      pushError(COMMENT_DISABLED_ERROR);
      showErrorBar({
        message: COMMENT_DISABLED_ERROR,
        severity: ErrorSeverities.ERROR,
      });
      logger.error(
        COMMENT_DISABLED_ERROR,
        {
          message: COMMENT_CREATE_ERROR,
        },
        { feature: Feature.CommentReactions }
      );

      return;
    }

    const getCommentAnonUserName = () => {
      const defaultAnonName = anonUserName || 'Anonymous';

      if (anonName && anonName !== '') {
        return anonName;
      }

      return defaultAnonName;
    };

    const baseVariables = {
      videoId: video.modelId,
      timestamp: timestamp ?? Math.round(player?.currentTime ?? 0),
      content,
      password,
      anonUserName: getCommentAnonUserName(),
      extendedReaction,
    };

    if (parentPostId) {
      createCommentReplyInternal({
        variables: {
          ...baseVariables,
          parentPostIdV2: parentPostId,
        },
      });
    } else {
      createCommentPostInternal({
        variables: baseVariables,
      });
    }
  };

  const handleOnCreateCommentError = () => {
    if (shouldUseGlobalError) {
      pushError(COMMENT_CREATE_ERROR);
      showErrorBar({
        message: 'Failed to create comment.',
        severity: ErrorSeverities.ERROR,
      });
      logger.error(
        `${COMMENT_CREATE_ERROR}, Failed to create comment.`,
        {
          message: COMMENT_CREATE_ERROR,
        },
        { feature: Feature.CommentReactions }
      );
    }
  };

  const handleCreateCommentCacheUpdate = (cache, data) => {
    const newComment = data.data.createVideoComment;

    cache.updateQuery(
      {
        query: FetchComments,
        variables: { id: video.modelId, password },
      },
      cacheData => {
        const existingComments = cacheData.video.video_comments ?? [];
        const newComments = mergeNewComment({
          existingComments,
          newComment,
        });

        return {
          video: {
            ...cacheData.video,
            video_comments: newComments,
          },
        };
      }
    );
  };

  // TODO: Replace with autogenerated hook
  const [
    createCommentReplyInternal,
    { loading: createCommentReplyLoading, error: createCommentReplyError },
  ] = useMutation(CreateCommentReply, {
    onError: handleOnCreateCommentError,
    onCompleted: () => {
      handleOnCompleteCreateComment?.();

      toggleFollowingVideo();
    },
    update: handleCreateCommentCacheUpdate,
  });

  // TODO: Replace with autogenerated hook
  const [
    createCommentPostInternal,
    { loading: createCommentPostLoading, error: createCommentPostError },
  ] = useMutation(CreateCommentPost, {
    onError: handleOnCreateCommentError,
    onCompleted: () => {
      handleOnCompleteCreateComment?.();

      toggleFollowingVideo();
    },
    update: handleCreateCommentCacheUpdate,
  });

  return {
    createComment,
    loading: createCommentPostLoading || createCommentReplyLoading,
    error: createCommentReplyError || createCommentPostError,
  };
}
