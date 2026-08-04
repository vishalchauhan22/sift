import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import React from 'react';

import { useHistory } from 'react-router-dom';

import { Arrange, Button, Container, Spacer, Text } from '@loomhq/lens';
import { SpacesAvatar } from '@js/common/spaces';
import UserAvatar from '@js/components/user-avatar';
import { SPACE_ADMIN_ACTION_NOTIFICATION_CLICKED } from '@js/constants/events';
import { SPACES_BROWSE_PAGE } from '@js/constants/routes';

import * as analytics from '@js/utilities/analytics';

import { ProfileCard } from '../../ProfileCard';
import { SpaceAdminActionCardProps } from '../../types';
import { getNotificationOwner } from '../utils';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../utilities/analytics/attribute-transformer';

export const SpaceAdminActionCard = ({
  notification,
}: SpaceAdminActionCardProps): JSX.Element => {
  const history = useHistory();

  let heading = '';
  let description = '';

  switch (notification.data.adminActionType) {
    case 'delete_space':
      heading = 'A Space you’re in has been deleted';
      description = 'deleted ';
      break;
    case 'remove_user':
      heading = 'You have been removed from a Space';
      description = 'removed you from ';
      break;
    case 'remove_user_generic':
      heading = 'You have been removed from a Space';
      description = 'You are no longer in ';
      break;
    default:
      break;
  }

  const notificationOwner = getNotificationOwner(notification.user);

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
          <Text color="bodyDimmed" isInline>
            {heading}
          </Text>
        </Container>
        <Container
          borderSide="all"
          radius="medium"
          padding="medium"
          overflow="hidden"
          maxWidth="43.25rem"
        >
          <Container>
            <Arrange gap={1.5} alignItems="center">
              {notification.user && (
                <ProfileCard
                  avatarMode={true}
                  notificationOwner={notificationOwner}
                >
                  <UserAvatar
                    avatarSize={4}
                    avatarSrc={notificationOwner.avatar}
                    name={notificationOwner.name}
                  />
                </ProfileCard>
              )}
              <Arrange>
                {!notification.user ? (
                  <div className="pr:small">
                    <SpacesAvatar
                      spaceName={notification.data.spaceName}
                      size="large"
                    />
                  </div>
                ) : (
                  <ProfileCard
                    avatarMode={false}
                    notificationOwner={notificationOwner}
                  >
                    <>
                      <Text fontWeight="bold" isInline>
                        {notificationOwner.name}
                      </Text>
                      <Text fontWeight="bold" isInline>
                        (admin){' '}
                      </Text>
                    </>
                  </ProfileCard>
                )}
                <Text color="bodyDimmed" isInline className="px:xsmall">
                  {description}
                </Text>
                <Text fontWeight="bold" isInline>
                  {notification.data.spaceName}
                </Text>
                <Text color="bodyDimmed" isInline>
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </Arrange>
            </Arrange>
          </Container>
          <Spacer bottom={2} />
          <Arrange gap="small" justifyContent="end">
            <Button
              variant="primary"
              onClick={() => {
                analytics.track(SPACE_ADMIN_ACTION_NOTIFICATION_CLICKED, {
                  ...withIdentifiers(
                    SPACE_ADMIN_ACTION_NOTIFICATION_CLICKED,
                    AnalyticsEntityId.space(
                      notification.data.spaceId,
                      'string',
                      'space_id'
                    )
                  ),
                  admin_action_type: notification.data.adminActionType,
                });
                history.push(SPACES_BROWSE_PAGE);
              }}
            >
              Browse other Spaces
            </Button>
          </Arrange>
        </Container>
      </Container>
    </Arrange>
  );
};
