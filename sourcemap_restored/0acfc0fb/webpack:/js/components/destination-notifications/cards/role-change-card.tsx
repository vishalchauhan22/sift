import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';

import { Arrange, Avatar, Container, Text } from '@loomhq/lens';
import {
  ORG_ROLE_DISPLAY_NAMES,
  ORG_ROLE_INDEFINITE_ARTICLE_MAP,
} from '@loomhq/shared-utilities/constants/organizationRoles';

import { RoleChangeCardProps } from '../types';

export const RoleChangeCard = ({
  notification,
}: RoleChangeCardProps): JSX.Element => {
  return (
    <>
      <Container paddingBottom="medium">
        <Text color="bodyDimmed" isInline>
          New role in Workspace
        </Text>
      </Container>
      <Container>
        <Arrange gap={1.5}>
          <Avatar
            imageSrc={notification.workspace?.icon}
            letter={notification.workspace?.name?.charAt(0)}
          />

          <Arrange gap="xsmall">
            <Text color="bodyDimmed">
              You are now{' '}
              {ORG_ROLE_INDEFINITE_ARTICLE_MAP[notification.data?.newRole]}{' '}
              <Text color="body" fontWeight="bold" isInline>
                {ORG_ROLE_DISPLAY_NAMES[notification.data?.newRole]}
              </Text>{' '}
              in{' '}
              <Text color="body" fontWeight="bold" isInline>
                {notification.data?.orgName}
              </Text>
            </Text>
            <Text color="bodyDimmed">
              ・
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </Arrange>
        </Arrange>
      </Container>
    </>
  );
};
