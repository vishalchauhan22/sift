import { CREATION_METHOD_COMMENT_OVERLAY } from '@js/constants/comments';
import { VIDEO_COMMENT_CREATED } from '@js/constants/events';

import { ModalTypeEnum } from '@js/common/modal-container';
import { useAsgCommentModalIsVisible } from '@js/common/modal-container/UseAsgCommentModalIsVisible';
import { useModals } from '@js/common/modal-container/useModals';
import { useAnonUserName } from '@js/common/useAnonUserName';
import {
  UiEvents,
  usePlayer,
  useUserContext,
  useVideoContext,
  CommentPost,
} from '@js/common/video-player';
import { useViewerInsight } from '@js/common/viewer-insights';
import {
  commentCreatedByOneOf,
  getEngagementInsightUsersFromView,
  hasUsers,
} from '@js/components/video-player-fresh/utils';
import { useFetchComments } from '@js/pages/share/comments/common/hooks';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';
import {
  ASG_SOURCES,
  GATES,
} from '@loomhq/shared-utilities/constants/anonActivity';
import React from 'react';
import { ASGTertiaryButtonIcon } from '@js/utilities/modals';

import * as analytics from '@js/utilities/analytics';

// TODO: viewx-2147-isolate-migrate-parsecomments-function
import { parseComments } from './utils/model';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

const { SignedOutHardGatingComments } = ASG_SOURCES;

export const CommentsHandler = (): null => {
  const { setComments, video } = useVideoContext();
  const { comments } = useFetchComments();
  const player = usePlayer(video.id);
  const { createComment } = useCreateComment();
  const { selectedViewer: selectedEngagementInsightsView } = useViewerInsight();
  const { anonUserName } = useAnonUserName();
  const anonName = anonUserName || 'Anonymous';
  const { openModal } = useModals();
  const { isLoggedUser } = useUserContext();
  const { setAsgCommentModalIsVisible } = useAsgCommentModalIsVisible();

  const handleComment = (payload: CommentPost) => {
    if (!isLoggedUser) {
      openModal({
        modalType: ModalTypeEnum.HARD_GATE_COMMENT_EMOJI_MODAL,
        options: {
          gate: GATES.EOVN,
          anonName,
          comment: payload.content,
          videoOwnerName: video?.owner?.displayName,
          commentVideoId: video?.id,
          header: 'Add your name to this comment',
          subheader: `${
            video?.owner?.displayName ?? 'They'
          } sent this Loom instead of a meeting invite. Use async video to stay connected to your team while staying focused on what counts.`,
          tertiaryButtonText: 'Post comment anonymously',
          tertiaryButtonIcon: ASGTertiaryButtonIcon.Comment,
          hideModeSwitcher: true,
          source: SignedOutHardGatingComments,
          signupParams: {
            anonComment: payload.content,
            anonCommentVideoId: video?.id,
            anonCommentTimestamp: Math.round(payload?.time || 0),
            signup_source: SignedOutHardGatingComments,
          },
        },
      });
      setAsgCommentModalIsVisible(true);
    } else {
      createComment({
        content: payload.content,
      });
    }

    analytics.track(VIDEO_COMMENT_CREATED, {
      ...withIdentifiers(
        VIDEO_COMMENT_CREATED,
        AnalyticsEntityId.video(video.modelId, 'video_id')
      ),
      comment_length: payload.content.length,
      freshPlayer: true,
      creation_method: CREATION_METHOD_COMMENT_OVERLAY,
      source: payload.source,
    });
  };

  // when comments change, update the player context
  React.useEffect(() => {
    if (comments) {
      // if engagement insights panel is open with viewer selected,
      // filter comments out by selected viewer
      const engagementInsightsUsers = getEngagementInsightUsersFromView(
        selectedEngagementInsightsView
      );

      if (hasUsers(engagementInsightsUsers)) {
        const filteredComments = comments.filter(
          commentCreatedByOneOf(engagementInsightsUsers)
        );

        setComments(parseComments(filteredComments));
      } else {
        setComments(parseComments(comments));
      }
    }
  }, [setComments, comments, selectedEngagementInsightsView]);

  // register for new comment event
  React.useEffect(() => {
    player?.on([UiEvents.newComment], handleComment);

    return () => {
      player?.off([UiEvents.newComment], handleComment);
    };
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  return null;
};
