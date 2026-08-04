import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import {
  CREATOR_AUTO_COMMENT_ID,
  LOOM_LOGO_LOCAL_URI,
} from '@js/pages/share/common/constants';

import type { FetchAutoCommentDisplayControlsQuery } from '../auto-comment-and-reaction/data/FetchAutoCommentControls.generated';

const CREATOR_COMMENT_MESSAGE =
  'You nailed it! Congrats on recording your Loom and saving everyone a meeting. Share it with your teammates so they can leave comments like this one.';

type CreateCommentsProps = {
  videoCreatedAt: string;
  timeStamp: number;
};

function _createComment({
  videoCreatedAt,
  timeStamp,
}: CreateCommentsProps): CommentFromServer {
  return {
    guid: CREATOR_AUTO_COMMENT_ID,
    user_name: 'Loom',
    createdAt: videoCreatedAt,
    children_comments: [],
    avatar: { name: 'Loom Logo White', thumb: LOOM_LOGO_LOCAL_URI },
    time_stamp: timeStamp ?? 0,
    id: CREATOR_AUTO_COMMENT_ID,
    content: CREATOR_COMMENT_MESSAGE,
    plainContent: CREATOR_COMMENT_MESSAGE,
    isChatMessage: false,
  };
}

type CreateAutoCommentProps = {
  controls: Exclude<
    FetchAutoCommentDisplayControlsQuery['fetchAutoCommentDisplayControls'],
    null
  >;
  isCreator: boolean;
};

export const createAutoComment = ({
  controls,
  isCreator,
}: CreateAutoCommentProps): CommentFromServer | null => {
  const { __typename } = controls;

  switch (__typename) {
    case 'CreatorExperiencePayload':
      if (isCreator && controls.showCommentToCreator) {
        const { videoCreatedAt, videoDuration } = controls;

        return _createComment({
          videoCreatedAt,
          timeStamp: Math.round(videoDuration * 0.1), // 10% of duration for creator experience
        });
      }

      return null;
    default:
      return null;
  }
};
