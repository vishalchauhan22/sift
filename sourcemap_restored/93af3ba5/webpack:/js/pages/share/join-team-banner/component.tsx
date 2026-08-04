import {
  LARGE_DESKTOP_MIN_WIDTH,
  SMALL_DESKTOP_MAX_WIDTH,
} from '@js/constants/breakpoints';

import { FacePile } from '@js/common/face-pile';
import { MediaQuery } from '@js/common/layout';
import WorkspaceLogo from '@js/components/workspace-logo';
import pluralize from 'pluralize';
import React from 'react';

import {
  Arrange,
  Button,
  Container,
  IconButton,
  Text,
  TextButton,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import { Avatar, Workspace } from './types';

type JoinTeamBannerComponentProps = {
  memberCount: number;
  suggestedWorkspace: Workspace;
  requestPending: boolean;
  autoJoin: boolean | null;
  avatars: Avatar[] | undefined;
  handleSetDismissed: () => void;
  onRequestClick: (workspaceId: string) => void;
};

export const JoinTeamBannerComponent = ({
  memberCount,
  suggestedWorkspace,
  requestPending,
  autoJoin,
  avatars = [],
  handleSetDismissed,
  onRequestClick,
}: JoinTeamBannerComponentProps): JSX.Element => {
  return (
    <>
      <MediaQuery query={`(min-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`}>
        <Container paddingX="large">
          <Container
            backgroundColor="blurpleLight"
            paddingX="large"
            paddingY="medium"
            width="100%"
            radius="large"
            marginTop="large"
            marginBottom="xlarge"
          >
            <Arrange autoFlow="column" justifyContent="space-between">
              <Arrange autoFlow="column" gap="small">
                <FacePile
                  userData={avatars}
                  maxImages={4}
                  alignment="left"
                  avatarSize={4}
                />
                <Text htmlTag="p">
                  <span className="mr:xsmall" role="img" aria-label="megaphone">
                    📣
                  </span>
                  <Text htmlTag="span" isInline fontWeight="bold">
                    Your team is on Loom!{' '}
                  </Text>
                  Join{' '}
                  <Text isInline fontWeight="bold">
                    {memberCount}{' '}
                  </Text>
                  {pluralize('other', memberCount)} in{' '}
                  <Text isInline fontWeight="bold">
                    {suggestedWorkspace.name}{' '}
                  </Text>
                  and gain access to your team’s content!
                </Text>
              </Arrange>
              <div>
                <TextButton
                  className="c:blurpleDark mr:small"
                  disabled={requestPending}
                  onClick={() => {
                    onRequestClick(suggestedWorkspace.id);
                  }}
                >
                  {requestPending ? 'Requested' : autoJoin ? 'Join' : 'Request'}
                </TextButton>
                {!requestPending ? (
                  <TextButton onClick={handleSetDismissed}>Dismiss</TextButton>
                ) : null}
              </div>
            </Arrange>
          </Container>
        </Container>
      </MediaQuery>
      {/* End desktop layout */}
      {/* Begin mobile layout */}
      <MediaQuery query={`(max-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`}>
        <Container
          backgroundColor="blurpleLight"
          paddingRight="xsmall"
          paddingLeft="large"
          paddingY="medium"
          marginTop="large"
          marginBottom="xlarge"
          width="100%"
        >
          <Arrange autoFlow="column" justifyContent="space-between">
            <Arrange gap="medium">
              <WorkspaceLogo workspace={suggestedWorkspace} size={5} />
              <Arrange autoFlow="row">
                <Text fontWeight="bold">Join your team on Loom</Text>

                <Text color="bodyDimmed" size="body-sm">
                  {suggestedWorkspace.name} - members
                </Text>
              </Arrange>
            </Arrange>

            <Container>
              <Button
                disabled={requestPending}
                onClick={() => {
                  onRequestClick(suggestedWorkspace.id);
                }}
                variant="primary"
              >
                {requestPending ? 'Pending' : 'Join'}
              </Button>
              <IconButton
                className="ml:small"
                altText="Dismiss"
                icon={<SvgClose />}
                onClick={handleSetDismissed}
              />
            </Container>
          </Arrange>
        </Container>
      </MediaQuery>
    </>
  );
};
