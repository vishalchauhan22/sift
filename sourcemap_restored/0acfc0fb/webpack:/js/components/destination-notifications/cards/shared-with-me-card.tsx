import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Arrange, Container, Text } from '@loomhq/lens';

import NotificationVideoCardLarge from '../notification-video-card-large';
import { SharedWithMeCardProps } from '../types';
import { CommentContainer } from './common';
import { getNotificationOwner } from './utils';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';

export const SharedWithMeCard = ({
  notification,
}: SharedWithMeCardProps): JSX.Element => {
  const { workspace, user, video } = notification;

  const { data: workspaces } = useGetWorkspaceMemberships();

  const inNotificationWorkspace = workspace
    ? workspaces?.some(w => w?.id === workspace.id)
    : false;
  const recipientIsVideoOwner =
    inNotificationWorkspace &&
    Boolean(video.enhancedVideo.current_user_is_owner);

  const loomWording = video.enhancedVideo.isMeetingRecording
    ? `meeting recording`
    : `video`;

  const notificationOwner = getNotificationOwner(user);

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'minmax(250px, auto)'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      <Container>
        <Container paddingBottom="medium">
          <Text color="bodyDimmed" htmlTag="h2">
            {inNotificationWorkspace
              ? recipientIsVideoOwner
                ? `Your ${loomWording} is ready`
                : `A ${loomWording} was shared with you`
              : workspace?.name
                ? `A ${loomWording} from another Workspace (${workspace.name}) was shared with you`
                : `A ${loomWording} from another Workspace was shared with you`}
          </Text>
        </Container>
        <Container paddingBottom="small">
          <CommentContainer
            avatarSrc={notificationOwner.avatar ?? ''}
            name={notificationOwner.name}
            createdAt={formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
            content={notification.content}
            profileId={notificationOwner.id}
            verticallyCenter
          />
        </Container>
        <NotificationVideoCardLarge
          video={video.enhancedVideo}
          workspace={workspace}
        />
      </Container>
    </Arrange>
  );
};
