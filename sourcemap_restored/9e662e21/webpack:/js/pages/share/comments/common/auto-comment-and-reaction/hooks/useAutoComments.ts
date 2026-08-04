import { useEffect } from 'react';

import { useVideoContext } from '@js/common/video-player';
import { useViewerInsight } from '@js/common/viewer-insights';
import {
  commentCreatedByOneOf,
  getEngagementInsightUsersFromView,
  hasUsers,
} from '@js/components/video-player-fresh/utils';

// TODO: viewx-2147-isolate-migrate-parsecomments-function
import { parseComments } from '@js/components/video-player-fresh/utils/model';
import { useCreateAutoComment } from '@js/pages/share/comments/common/auto-comment-and-reaction/hooks';
import { useFetchComments } from '@js/pages/share/comments/common/hooks';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';

type AutoCommentsProps = {
  commentsEnabled: boolean;
};

export const useAutoComments = ({
  commentsEnabled,
}: AutoCommentsProps): null => {
  const { setComments: setCommentsInPlayerContext } = useVideoContext();
  const { comments: serverComments } = useFetchComments();
  const autoComment = useCreateAutoComment();
  const { selectedViewer: selectedEngagementInsightsView } = useViewerInsight();

  // when comments change, update the player context
  useEffect(() => {
    if (!commentsEnabled) {
      return;
    }

    if (serverComments) {
      // if engagement insights panel is open with viewer selected,
      // filter comments out by selected viewer
      const engagementInsightsUsers = getEngagementInsightUsersFromView(
        selectedEngagementInsightsView
      );

      let commentsForPlayerContext: CommentFromServer[] = serverComments;

      if (hasUsers(engagementInsightsUsers)) {
        commentsForPlayerContext = serverComments.filter(
          commentCreatedByOneOf(engagementInsightsUsers)
        );
      }

      setCommentsInPlayerContext(
        parseComments(
          autoComment
            ? [...commentsForPlayerContext, autoComment]
            : commentsForPlayerContext
        )
      );
    }
  }, [
    setCommentsInPlayerContext,
    selectedEngagementInsightsView,
    autoComment,
    serverComments,
    commentsEnabled,
  ]);

  return null;
};
