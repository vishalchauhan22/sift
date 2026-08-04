import { ErrorSeverities } from '@js/constants/error-severities';

import {
  VIDEO_COMMENT_CREATED,
  VIDEO_COMMENT_REPLY_CREATED,
} from '@js/constants/events';

import { LOOM_URI } from '@js/constants/routes';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { usePlayer } from '@js/common/video-player';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import * as analytics from '@js/utilities/analytics';

import {
  useUtilityCreateVideoCommentMutation,
  UtilityCreateVideoCommentMutation,
} from './CreateVideoComment.generated';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

type AddCommentParams = {
  anonUserName: string | null;
  comment: string;
  creationMethod?: string;
  onCompleted?: (data: UtilityCreateVideoCommentMutation) => void;
  parentPostId?: string;
  timestamp?: number;
  videoId: string;
};

type PostRecordReplyCommentParams = {
  parentPostId?: string;
  creationMethod?: string;
  password?: string | null;
  recordedReplyVideoId?: string;
  videoId: string;
};

export const usePostComment = (
  videoId?: string
): {
  postComment: (params: AddCommentParams) => Promise<void>;
  postRecordReplyComment: (params: PostRecordReplyCommentParams) => void;
  isCreatingComment: boolean;
} => {
  const { showErrorBar } = useErrorBar();
  const player = usePlayer(videoId ?? '');

  const [createComment, { loading }] = useUtilityCreateVideoCommentMutation();

  // Comments are no longer handled in Redux
  // This function serves as an endpoint to post new comments, but it DOES NOT update the UI
  const postComment = async ({
    anonUserName,
    comment,
    creationMethod,
    onCompleted,
    parentPostId,
    timestamp,
    videoId,
  }: AddCommentParams) => {
    const isCommentReply = Boolean(parentPostId);

    await createComment({
      variables: {
        anonUserName,
        content: comment,
        parentPostIdV2: parentPostId,
        // TODO: the password should be passed in here but to access the video password
        // we need to be within a VideoPasswordProvider. Since this hook is invoked during
        // the login flow, we can't access the password here. We should refactor how the code
        // handles after login actions to be more specific to the context in which the user
        // is logging in.
        password: undefined,
        timestamp: timestamp ? timestamp : Math.round(player?.currentTime ?? 0),
        videoId,
      },
      onCompleted: data => {
        const newComment = data.createVideoComment;
        const eventName = isCommentReply
          ? VIDEO_COMMENT_REPLY_CREATED
          : VIDEO_COMMENT_CREATED;
        analytics.track(eventName, {
          ...withIdentifiers(
            eventName,
            AnalyticsEntityId.commentPost(
              newComment?.id,
              'string',
              'comment_id'
            ),
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          creation_method: creationMethod,
          comment_length: newComment?.content?.length,
        });
        onCompleted?.(data);
      },
      onError: error => {
        showErrorBar({
          message: `Unable to create comment`,
          severity: ErrorSeverities.ERROR,
        });

        logger.error(
          error,
          { videoId, message: 'Error creating comment' },
          { team: 'create' }
        );
      },
    });
  };

  const postRecordReplyComment = async ({
    parentPostId,
    creationMethod,
    password,
    recordedReplyVideoId,
    videoId,
  }: PostRecordReplyCommentParams): Promise<void> => {
    const comment = `${LOOM_URI}/share/${recordedReplyVideoId}`;

    await createComment({
      variables: {
        anonUserName: null,
        content: comment,
        parentPostIdV2: parentPostId,
        password,
        timestamp: Math.round(player?.currentTime ?? 0),
        videoId,
      },
      onCompleted: data => {
        const newComment = data.createVideoComment;

        analytics.track(VIDEO_COMMENT_CREATED, {
          ...withIdentifiers(
            VIDEO_COMMENT_CREATED,
            AnalyticsEntityId.commentPost(
              newComment?.id,
              'string',
              'comment_id'
            ),
            AnalyticsEntityId.video(videoId, 'video_id')
          ),
          creation_method: creationMethod,
          comment_length: newComment?.content?.length,
        });
      },
      onError: error => {
        showErrorBar({
          message: `Unable to create comment`,
          severity: ErrorSeverities.ERROR,
        });
        logger.error(
          error,
          {
            message: 'Failed to create a comment for anonymous record a reply',
          },
          { feature: Feature.CommentReactions }
        );
      },
    });
  };

  return {
    postComment,
    postRecordReplyComment,
    isCreatingComment: loading,
  };
};
