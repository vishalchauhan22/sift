import { RetranscriptionFailureCard } from '@js/components/destination-notifications/cards/retranscription-failure-card';
import { RetranscriptionSuccessCard } from '@js/components/destination-notifications/cards/retranscription-success-card';
import React from 'react';

import * as logger from '@js/utilities/loggerx'; // PLOP_NOTIFICATION_STEP5

import { Container, Icon } from '@loomhq/lens';
import { SvgRecord } from '@loomhq/lens/icons/record';
import {
  CREATED,
  DELIVERED,
  NotificationClientType,
  NotificationType,
  SEEN,
} from '@loomhq/shared-utilities/constants/notifications';

import { AccessChangeCard } from './cards/access-change-card';
import { BusinessTrialWelcomeCard } from './cards/business-trial-welcome-card';
import { CalendarEfficiencyCard } from './cards/calendar-efficiency-card';
import { CommentCard } from './cards/comment-card';
import {
  CreatorLiteLimitApproachingCard,
  CreatorLiteLimitReachedCard,
} from './cards/creator-lite-limit-card';
import { FirstViewCard } from './cards/first-view-card';
import { IngestionCompletedCard } from './cards/ingestion-completed';
import { IngestionEnabledCard } from './cards/ingestion-enabled-card';
import { InsightsTimeSavedCard } from './cards/insights-time-saved-card';
import { InsightsViewMilestoneCard } from './cards/insights-view-milestone-card';
import { NewFollowerCard } from './cards/new-follower';
import { OrgInviteAcceptedWithIncentivesCard } from './cards/org-invite-accepted-with-incentives-card';
import { ReactionsCard } from './cards/reactions-card';
import { ReminderToRecordCard } from './cards/reminder-to-record-card';
import { RoleChangeCard } from './cards/role-change-card';
import { SharedWithMeCard } from './cards/shared-with-me-card';
import { SpaceAdminActionCard } from './cards/spaces/space-admin-action-card';
import { SpaceContentCard } from './cards/spaces/space-content-card';
import { SpaceInvitationCard } from './cards/spaces/space-invitation-card';
import { SpaceStateChangeCard } from './cards/spaces/space-state-change-card';
import { SpaceVideoMovedCard } from './cards/spaces/space-video-moved-card';
import { VideoTaskMentionCard } from './cards/video-task-mention-card';
import { VideoTaskResponseCard } from './cards/video-task-response-card';
import { VideoUsedAsClipCard } from './cards/video-used-as-clipcard';

import './styles.less';
import styles from './styles.module.css';

const NotificationCardsConfig = {
  cardTypeMappings: {
    // New notifications should use `NotificationType`. We will eventually
    // migrate and deprecate `NotificationClientType`
    // PLOP_NOTIFICATION_STEP6
    [NotificationType.CalendarEfficiency]: CalendarEfficiencyCard,
    [NotificationType.BusinessAiTrialWelcome]: BusinessTrialWelcomeCard,

    [NotificationType.InsightsTimeSaved]: InsightsTimeSavedCard,

    [NotificationType.InsightsViewMilestone]: InsightsViewMilestoneCard,

    [NotificationType.VideoUsedAsWeaveClip]: VideoUsedAsClipCard,
    [NotificationType.WeaveFirstVideoView]: FirstViewCard,
    [NotificationType.IngestionIntegrationEnabled]: IngestionEnabledCard,
    [NotificationType.ReminderToRecord]: ReminderToRecordCard,
    [NotificationType.SpaceInvitation]: SpaceInvitationCard,
    [NotificationType.SpaceContent]: SpaceContentCard,
    [NotificationType.SpaceAllHandsContent]: SpaceContentCard,
    [NotificationType.SpaceAdminAction]: SpaceAdminActionCard,
    [NotificationType.SpaceStateChange]: SpaceStateChangeCard,
    [NotificationType.SpaceVideoMoved]: SpaceVideoMovedCard,
    [NotificationType.HighVideoViews]: ReminderToRecordCard,
    [NotificationType.RecordingNudgeAfterXViewsGiven]: ReminderToRecordCard,

    // Add notification card types in here
    [NotificationClientType.Comment]: CommentCard,
    [NotificationClientType.Reply]: CommentCard,
    [NotificationClientType.ShareVideo]: SharedWithMeCard,
    [NotificationClientType.FirstVideoView]: FirstViewCard,
    [NotificationClientType.Reaction]: ReactionsCard,
    [NotificationClientType.VideoPrivacyChange]: AccessChangeCard,
    [NotificationClientType.CreatorLiteLimitApproaching]:
      CreatorLiteLimitApproachingCard,
    [NotificationClientType.CreatorLiteLimitReached]:
      CreatorLiteLimitReachedCard,
    [NotificationClientType.ReshareVideo]: AccessChangeCard,
    [NotificationClientType.PostCommentMention]: CommentCard,
    [NotificationClientType.ReplyCommentMention]: CommentCard,
    [NotificationType.VideoTaskMention]: VideoTaskMentionCard,
    [NotificationType.VideoTaskResponse]: VideoTaskResponseCard,
    [NotificationType.RetranscriptionSuccess]: RetranscriptionSuccessCard,
    [NotificationType.RetranscriptionFailure]: RetranscriptionFailureCard,
    [NotificationClientType.MembershipRoleChange]: RoleChangeCard,
    [NotificationClientType.ExternalIngestionCompleted]: IngestionCompletedCard,
    [NotificationClientType.NewFollower]: NewFollowerCard,
    [NotificationType.OrgInviteAcceptedWithIncentives]:
      OrgInviteAcceptedWithIncentivesCard,
  },
};

const NotificationsCard = ({
  notification,
}: {
  notification: {
    status: string;
    notificationType: NotificationClientType;
    url: string | null;
  };
}): JSX.Element | null => {
  // We use a ref to track the initial value of the notification status, so that we can
  // show an unread indicator even though the notification has been marked as read on
  // the server.
  const showIndicator = [CREATED, DELIVERED, SEEN].includes(
    notification.status
  );

  const NotificationCard =
    NotificationCardsConfig.cardTypeMappings[notification.notificationType];

  if (!NotificationCard) {
    logger.warning(new Error('missing card for the notification type'), {
      notificationType: notification.notificationType,
    });

    return null;
  }

  return (
    <Container
      paddingY="large"
      paddingX="medium"
      borderSide="bottom"
      data-testid="destination-notification-card"
      className={styles.notification}
    >
      {showIndicator && (
        <Container
          position="relative"
          right="medium"
          top="small"
          height={0}
          width={0}
        >
          <Icon icon={<SvgRecord />} size="1" color="blurple" />
        </Container>
      )}

      <NotificationCard notification={notification} />
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default NotificationsCard;
