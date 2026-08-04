/* eslint-disable @loomhq/loom/no-js-extension */
import { ErrorSeverities } from '@js/constants/error-severities';

import { SHOW_JOIN_NEW_WORKSPACE_BANNER } from '@js/constants/localStorage';

import classnames from 'classnames';

import { useCurrentUserSelector } from '@js/common/current-user';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useGetPendingWorkspaceInvitesForUserQuery } from '@js/common/workspace/getPendingWorkspaceInvitations.generated';
import WorkspaceLogo from '@js/components/workspace-logo';
import React from 'react';
import * as logger from '@js/utilities/loggerx';

import {
  goToWorkspace,
  requestAcceptWorkspaceInvite,
} from '@js/utilities/workspace';

import {
  Button,
  Container,
  IconButton,
  Layout,
  Spacer,
  Text,
  Tooltip,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import { setLocalStorageKey } from '@js/utilities/localStorage';

import styles from './styles.module.less';
import { useDeclinePendingWorkspaceInvite } from './useDeclinePendingWorkspaceInvite';

const PendingInvites = ({ hideSections = false, showLogos = false }) => {
  const isDeletionPending = useCurrentUserSelector(
    user => user.deletionPending,
    false
  );

  const { data: pendingWorkspaceInvitesData } =
    useGetPendingWorkspaceInvitesForUserQuery();
  const invites = pendingWorkspaceInvitesData?.invites?.pendingInvites || [];

  const { showErrorBar } = useErrorBar();

  const { declinePendingWorkspaceInvite } = useDeclinePendingWorkspaceInvite();

  const acceptInvite = async (token, workspaceId, workspaceName) => {
    try {
      await requestAcceptWorkspaceInvite(token);

      setLocalStorageKey(SHOW_JOIN_NEW_WORKSPACE_BANNER, workspaceName);
      goToWorkspace(workspaceId);
    } catch (err) {
      showErrorBar({
        message: 'Error accepting workspace invitation',
        severity: ErrorSeverities.ERROR,
      });
      logger.warning(err, 'Error accepting workspace invitation');
    }
  };

  if (!invites.length) {
    return null;
  }

  return (
    <div
      className={
        hideSections
          ? null
          : classnames(
              styles.workspacesListSection,
              styles.workspacesListInvitesSection
            )
      }
    >
      <Spacer left="medium" right="medium" top="small" bottom="small">
        <Text fontWeight="bold">Pending Invitations</Text>
      </Spacer>
      {invites.map((invite, index) => {
        const { workspace } = invite;

        return (
          <Spacer
            top="small"
            bottom="small"
            left="medium"
            right="small"
            key={index}
          >
            <Layout gap="small" alignment="center">
              {showLogos && (
                <Layout.Section width="auto">
                  <WorkspaceLogo size={5} workspace={workspace} />
                </Layout.Section>
              )}

              <Layout.Section>
                <Text hasEllipsis fontWeight="bold">
                  {workspace.name}
                </Text>
                <Spacer></Spacer>
              </Layout.Section>
              <Layout.Section width="auto">
                <Tooltip
                  content={
                    isDeletionPending
                      ? 'This account will be deleted. Undo to accept invitation'
                      : null
                  }
                >
                  <Button
                    isDisabled={isDeletionPending}
                    onClick={() =>
                      acceptInvite(
                        invite.token,
                        invite.organization_id,
                        workspace.name
                      )
                    }
                  >
                    Join
                  </Button>
                </Tooltip>
              </Layout.Section>
              <Layout.Section width="auto">
                <Container height={4}>
                  <IconButton
                    altText="Decline"
                    icon={<SvgClose />}
                    onClick={() =>
                      declinePendingWorkspaceInvite({ inviteId: invite.id })
                    }
                  />
                </Container>
              </Layout.Section>
            </Layout>
          </Spacer>
        );
      })}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default PendingInvites;
