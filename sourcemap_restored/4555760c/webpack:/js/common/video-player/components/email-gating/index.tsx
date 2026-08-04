import {
  SHARE_PAGE_EMAIL_GATING_MODAL_RENDERED,
  SHARE_PAGE_EMAIL_GATING_MODAL_RESOLVED,
  SHARE_PAGE_EMAIL_GATING_MODAL_SIGN_IN_CLICKED,
} from '@js/constants/events';

import { LoggedOutOnly } from '@js/common/current-user';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoContext, zIndexes } from '@js/common/video-player';
import UserAvatar from '@js/components/user-avatar';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import { useMount } from '@js/hooks/useMount';
import React, { useState, Suspense } from 'react';
import { isSlackDesktop } from '@js/utilities/device';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import {
  Container,
  TextInput,
  Text,
  Button,
  IconButton,
  Link,
  Arrange,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { validateUtils } from '@loomhq/shared-utilities';
import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';
import { getAnonUserId } from '@js/utilities/auth-anon';

import $ from './styles.module.css';
import { useDidPassEmailGateModal } from './useDidPassEmailGateModal';
const { EMAIL_REGEX_CHECK } = validateUtils;

const EmailGatingAnalyticsWrapper = ({ children, analyticsProps }) => {
  useMount(() => {
    analytics.track(SHARE_PAGE_EMAIL_GATING_MODAL_RENDERED, analyticsProps);
  });

  return children;
};

const EmailGatingOverlay = () => (
  <Container
    position="absolute"
    top={0}
    right={0}
    bottom={0}
    left={0}
    backgroundColor="hsla(0,0%,13%,0.8)"
    zIndex={2}
  />
);

const EmailGateWithoutFeatureWrapper = (): JSX.Element | null => {
  const { featureLoadedRef } = useFeatureWrapper();
  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  const {
    video: {
      emailGateVideoType,
      id: videoId,
      owner: {
        displayName: ownerName,
        avatar: { thumbFullUrl: ownerAvatarSrc },
      },
    },
  } = useVideoContext();

  const isVideoEmbedded = useIsVideoEmbedded();

  const { anonUserName, setAnonUserName } = useAnonUserName();
  const [email, setEmail] = useState(anonUserName);
  const isValidEmail = email && EMAIL_REGEX_CHECK.test(email);
  const [emailGateComplete, setEmailGateComplete] = useState(isValidEmail);
  const { setDidPassEmailGateModal } = useDidPassEmailGateModal();
  const anonymousId = getAnonUserId();
  const shouldShowSignInSection = !isSlackDesktop && !isVideoEmbedded;

  const analyticsProps = { emailGateVideoType, videoId, anonymousId };

  const isSoftGate = emailGateVideoType === EmailGatingSetting.Soft;

  const closeModal = () => {
    setEmailGateComplete(true);

    analytics.track(SHARE_PAGE_EMAIL_GATING_MODAL_RESOLVED, {
      ...analyticsProps,
      emailProvided: Boolean(isValidEmail),
    });

    // We also need to update the zustand state so that elements intentionally hidden can now be displayed (engagement-bar, hotkeys, chapters)
    setDidPassEmailGateModal(true);
  };

  if (emailGateVideoType === EmailGatingSetting.None || emailGateComplete) {
    return null;
  }

  return (
    <LoggedOutOnly>
      <EmailGatingAnalyticsWrapper analyticsProps={analyticsProps}>
        <Container zIndex={zIndexes.emailGate} refHandler={refHandler}>
          <EmailGatingOverlay />
          <Container
            maxHeight={44}
            maxWidth={54}
            minWidth={40}
            height="fit-content"
            width="50%"
            borderWidth="2px"
            radius="xlarge"
            position="absolute"
            backgroundColor="background"
            margin="auto"
            overflow="auto"
            zIndex={3}
            style={{ inset: 0 }}
          >
            <Suspense fallback={null}>
              <Container
                className={$.HeaderBackground}
                radius="xlarge"
                position="absolute"
                width="100%"
              />

              {isSoftGate && (
                <Container position="absolute" top={2} right={2}>
                  <IconButton
                    className={$.closeButton}
                    altText="Close"
                    icon={<SvgClose />}
                    onClick={closeModal}
                  />
                </Container>
              )}

              <UserAvatar
                className={$.center}
                avatarSize={8}
                avatarSrc={ownerAvatarSrc}
              />

              <Container paddingX="10%" paddingY="large">
                <Arrange autoFlow="row" gap={2}>
                  <Text
                    color="body"
                    htmlTag="h1"
                    fontWeight="bold"
                    size="heading-sm"
                  >
                    {ownerName || 'This user'}
                    {` `}
                    {isSoftGate ? 'would like' : 'requires'}{' '}
                    {`your email to continue`}
                  </Text>
                  <TextInput
                    className={$.emailInput}
                    autoFocus
                    value={email}
                    placeholder="Email address"
                    onKeyPress={e => {
                      if (e.key === 'Enter' && isValidEmail) {
                        setAnonUserName(email);
                        closeModal();
                      }
                    }}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Button
                    hasFullWidth
                    variant="primary"
                    isDisabled={!isValidEmail}
                    onClick={() => {
                      setAnonUserName(email);
                      closeModal();
                    }}
                  >
                    Continue to video
                  </Button>
                  {shouldShowSignInSection ? (
                    <Text color="body" size="body-sm" alignment="center">
                      Already have an account?{' '}
                      <Link
                        variant="neutral"
                        href={`/login?redirect_after=${document.URL}`}
                        onClick={() => {
                          analytics.track(
                            SHARE_PAGE_EMAIL_GATING_MODAL_SIGN_IN_CLICKED,
                            analyticsProps
                          );
                        }}
                      >
                        Sign in
                      </Link>
                    </Text>
                  ) : null}
                </Arrange>
              </Container>
            </Suspense>
          </Container>
        </Container>
      </EmailGatingAnalyticsWrapper>
    </LoggedOutOnly>
  );
};

export const EmailGate = (): JSX.Element | null => {
  return (
    <FeatureWrapper
      feature={Feature.EmailGating}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <EmailGateWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};
