import React from 'react';

import { Container, Text } from '@loomhq/lens';

import { OrgInviteAcceptedWithIncentivesProps } from '../types';
import { getInviteeName } from './utils';

export const OrgInviteAcceptedWithIncentivesCard = ({
  notification,
}: OrgInviteAcceptedWithIncentivesProps): JSX.Element => {
  const inviteeNames = notification.data?.inviteeName.split(' ');
  const inviteeNameTrimmed = getInviteeName(inviteeNames);

  return (
    <>
      <Container paddingBottom="medium">
        <Text className="mr:small" isInline>
          👏
        </Text>
        <Text fontWeight="bold" isInline>
          <span className="c:blurple">{inviteeNameTrimmed}</span> has joined
          your workspace
        </Text>
      </Container>

      <Container>
        <Text color="bodyDimmed">
          You earned 25 free videos on your account! Earn an additional 25
          videos when they record a Loom video.
        </Text>
      </Container>
    </>
  );
};
