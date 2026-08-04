import React from 'react';

import { Container, Text, Arrange, TextButton, Spacer } from '@loomhq/lens';
import { PromotionalCheckbox } from '@js/common/signup/promotional-email-gdpr';

import { useVideoContext } from '@js/common/video-player';

import LegalAgreement from '@js/components/legal-agreement';
import ConnectButtons from '@js/components/signup/connect-buttons';

import { SIGNUP_PAGE } from '@js/constants/routes';

export const SignupOverlay = ({
  commentCount = 0,
}: {
  commentCount?: number;
}): React.ReactElement => {
  const {
    video: {
      owner: { displayName },
    },
  } = useVideoContext();

  return (
    <Container>
      <Arrange autoFlow="row" justifyItems="center" justifyContent="center">
        {commentCount > 0 ? (
          <Text variant="title">Sign up to see who’s commented</Text>
        ) : (
          <Text variant="title">Leave {displayName} some feedback</Text>
        )}

        <Container paddingTop="large">
          <ConnectButtons isSignUp isSingleAuthPage={false} />
          <Spacer bottom="medium" />
          <PromotionalCheckbox size="body-sm" />
          <LegalAgreement size="body-sm" />
          <Spacer bottom="medium" />
        </Container>

        <Container>
          <TextButton href={SIGNUP_PAGE} target="_blank" htmlTag="a">
            Sign up with email
          </TextButton>
        </Container>
      </Arrange>
    </Container>
  );
};
