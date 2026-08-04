// TODO(tatiana, viewerx): Change this into an operator function that takes in the Comment TS object (see note here: https://github.com/loomhq/loom/pull/22395#discussion_r1142670968)

import {
  CREATOR_AUTO_COMMENT_ID,
  VISITOR_AUTO_COMMENT_ID,
} from '@js/pages/share/common/constants';

export const isAutoComment = (commentId: string): boolean => {
  return [CREATOR_AUTO_COMMENT_ID, VISITOR_AUTO_COMMENT_ID].includes(commentId);
};
