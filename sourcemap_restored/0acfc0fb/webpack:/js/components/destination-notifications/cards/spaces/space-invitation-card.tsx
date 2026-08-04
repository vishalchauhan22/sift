import { SPACE_INVITATION_NOTIFICATION_VISIT_CLICKED } from '@js/constants/events';

import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { SpaceInvitationCardProps } from '../../types';
import { VisitSpaceCard } from './visit-space-card';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../utilities/analytics/attribute-transformer';

export const SpaceInvitationCard = ({
  notification,
}: SpaceInvitationCardProps): JSX.Element => {
  const onClick = () => {
    analytics.track(
      SPACE_INVITATION_NOTIFICATION_VISIT_CLICKED,
      withIdentifiers(
        SPACE_INVITATION_NOTIFICATION_VISIT_CLICKED,
        AnalyticsEntityId.space(notification.data.spaceId, 'string', 'spaceId')
      )
    );
  };

  return (
    <VisitSpaceCard
      notification={notification}
      title={`You've been added to a Space`}
      action="added you"
      onClick={onClick}
    />
  );
};
