import InlinePlayerVideoCard from '@js/components/inline-player-video-card';
import React from 'react';

import { NotificationVideoCardLargeProps } from '../types';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

const NotificationVideoCardLarge = ({
  video,
  workspace,
}: NotificationVideoCardLargeProps): JSX.Element => {
  const { data: workspaces } = useGetWorkspaceMemberships();

  const inNotificationWorkspace = workspaces?.some(
    w => w?.id === workspace?.id
  );

  return (
    <InlinePlayerVideoCard
      htmlTag="h3"
      video={video}
      showProfileOnHover={inNotificationWorkspace}
    />
  );
};

// eslint-disable-next-line import/no-default-export
export default NotificationVideoCardLarge;
