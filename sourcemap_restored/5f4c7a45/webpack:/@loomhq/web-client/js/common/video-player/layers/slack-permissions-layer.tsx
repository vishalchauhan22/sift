import { EMBED_LOGGED_OUT_SCREEN_VIEWED } from '@js/constants/events';

import { useMount } from '@js/hooks/useMount';
import React, { useCallback, useState } from 'react';

import { invokeSharedAuthFlow } from '@js/utilities/slack/sharedAuthHandler';

import { SharedAuthSource } from '@js/utilities/slack/source';

import {
  Align,
  Arrange,
  Button,
  Container,
  Logo,
  Text,
  Link,
  TextInput,
  Spacer,
  Icon,
} from '@loomhq/lens';
import { SvgSlack } from '@loomhq/lens/icons/slack';

import { slackUtils } from '@loomhq/shared-utilities';

import { APP_SOURCE_SLACK_DESKTOP } from '@loomhq/shared-utilities/constants/analytics';

import { track } from '@js/utilities/analytics';

import { useVideoContext } from '../context';
import { zIndexes } from '../utils';

const AppLogo = ({ children }) => (
  <Container
    width={8}
    height={8}
    radius="full"
    borderSide="all"
    borderColor="white"
    borderWidth="4px"
  >
    <Align alignment="center">{children}</Align>
  </Container>
);

export const SlackPermissionsLayer = ({
  videoId,
}: {
  videoId: string;
}): React.ReactElement => {
  const [authUrl, setAuthUrl] = useState<string | undefined>();
  const { setRequestedSlackPermissionLayer } = useVideoContext();

  const showVideoBlockAuth = slackUtils.isVideoBlockUnfurl();

  useMount(() => {
    const props = {
      slack_shared_auth_enabled: true,
      slack_shared_auth_v2: true,
      source: APP_SOURCE_SLACK_DESKTOP,
    };

    track(EMBED_LOGGED_OUT_SCREEN_VIEWED, props);
  });

  const handleButtonClick = useCallback(async () => {
    setAuthUrl(
      await invokeSharedAuthFlow(
        videoId,
        SharedAuthSource.PUBLIC_LOGGED_OUT_SCREEN
      )
    );
  }, [videoId, setAuthUrl]);

  return (
    <Container
      backgroundColor="blurpleLight"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={zIndexes.permissionLayer}
    >
      <Align alignment="center">
        <Arrange autoFlow="row" justifyItems="center" gap="medium">
          <Arrange>
            <AppLogo>
              <Icon icon={<SvgSlack />} size={4}></Icon>
            </AppLogo>
            <Container
              borderSide="all"
              borderColor="white"
              borderWidth="2px"
              width="30px"
              style={{ borderStyle: 'dashed' }}
            />

            <AppLogo>
              <Logo variant="symbol" maxWidth={4} />
            </AppLogo>
          </Arrange>
          <Text
            size="heading-sm"
            fontWeight="bold"
            color="grey7"
            alignment="center"
          >
            Connect your account to
            <br />
            leave a comment in Slack
          </Text>
          {(!showVideoBlockAuth || !authUrl) && (
            <Button variant="primary" onClick={handleButtonClick}>
              Connect my account
            </Button>
          )}

          {showVideoBlockAuth && authUrl && (
            <Arrange autoFlow="row" gap="small">
              {/* TODO: FSP-279 add button for copying to clipboard */}
              <Text
                size="body-md"
                fontWeight="bold"
                color="grey7"
                alignment="center"
              >
                Copy and paste this link into your browser to connect to Slack:
              </Text>
              <TextInput
                onFocus={event => event.target.select()}
                value={authUrl}
                readOnly
                style={{ cursor: 'pointer' }}
              />

              <Text alignment="center">
                <Spacer top="xsmall"></Spacer>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  href="#"
                  onClick={() => setRequestedSlackPermissionLayer(false)}
                >
                  Return to video
                </Link>
              </Text>
            </Arrange>
          )}
        </Arrange>
      </Align>
    </Container>
  );
};
