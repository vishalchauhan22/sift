import { isProduction } from '@js/constants/environment';
import {
  INVITE_MEMBERS_WORKSPACE_SELECTOR_BUTTON_CLICKED,
  INVITE_TEAMMATES_CLICKED,
} from '@js/constants/events';
import FocusTrap from 'focus-trap-react';

import cn from 'classnames';
import { useCurrentUserSelector } from '@js/common/current-user';
import {
  CREATE_NEW_WORKSPACE_MODAL,
  TEAM_INVITE_MODAL,
  WORKSPACE_CONFIGURATION_MODAL,
  WORKSPACE_SELECTOR_MODAL,
} from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import { useGetSuggestedWorkspaceForSidebarBannerQuery } from '@js/components/layout/navigation/GetSuggestedWorkspaceForSidebarBanner.generated';
import Scopes from '@js/components/scopes';
import WorkspaceLogo from '@js/components/workspace-logo';
import { useHasSomeScopes } from '@js/hooks/useHasScopes';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import React, { useCallback, useState } from 'react';

import {
  Arrange,
  Button,
  Container,
  Spacer,
  Text,
  TextButton,
  Tooltip,
} from '@loomhq/lens';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';
import { SvgZapOutline } from '@loomhq/lens/icons/zap-outline';
import { APP_SOURCE_MAP } from '@loomhq/shared-utilities/constants/analytics';
import { ANY } from '@loomhq/shared-utilities/constants/analyticsInviteTypes';
import { WORKSPACE_SELECTOR } from '@loomhq/shared-utilities/constants/analyticsSources';
import { INVITE_STEP_COMPLETE } from '@loomhq/shared-utilities/constants/events';
import {
  INVITE_ADMIN_ACTION,
  INVITE_CREATOR_ACTION,
  INVITE_CREATOR_LITE_ACTION,
  INVITE_VIEWER_ACTION,
  SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER,
} from '@loomhq/shared-utilities/constants/scopes';
import useClickOutside from '@js/hooks/useClickOutside';
import * as analytics from '@js/utilities/analytics';
import { useSeenNewSuggestedWorkspaceWorkspaceSwitcher } from '@js/utilities/localStorage/suggestedWorkspace';

import { DropdownHeader } from '../../navigation/dropdown-header';
import { WorkspaceList } from './WorkspaceList';
import PendingInvites from './pendingInvites';
import styles from './styles.module.less';
import { SuggestedWorkspace } from './suggested-workspace';

type WorkspaceSelectorProps = {
  isCompact?: boolean;
  showInviteToolTip: boolean;
  setShowInviteToolTip: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkspaceSelector = ({
  isCompact = false,
  showInviteToolTip,
  setShowInviteToolTip,
}: WorkspaceSelectorProps): JSX.Element | null => {
  const { openModal } = useModals();
  const [open, setOpen] = useState(false);
  const isDeletionPending = useCurrentUserSelector(
    user => user.deletionPending,
    false
  );
  const { data: workspaces, selectedWorkspace } = useGetWorkspaceMemberships();

  const [organization] = workspaces ?? [];
  const closeWorkspaceSelector = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const ref = useClickOutside(closeWorkspaceSelector);
  const userRole = useCurrentUserSelector(user => user.role, undefined);
  const showCreateWorkspaceModal = userRole === 'admin'; // only allow loommates to access

  const displayWorkspaceConfigurator = userRole === 'admin';

  const { showInviteButton } = useInvitationCapabilities();

  const [suggestedWorkspaceTextDismissed, dismissNewSuggestedWorkspaceText] =
    useSeenNewSuggestedWorkspaceWorkspaceSwitcher();
  const hasInviteScope = useHasSomeScopes([
    INVITE_VIEWER_ACTION,
    INVITE_CREATOR_ACTION,
    INVITE_CREATOR_LITE_ACTION,
    INVITE_ADMIN_ACTION,
  ]);
  const hasSuggestedWorkspaceScope = useHasSomeScopes([
    SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER,
  ]);

  const { data: suggestedWorkspaceData } =
    useGetSuggestedWorkspaceForSidebarBannerQuery({
      fetchPolicy: 'cache-first',
    });
  let suggestedWorkspaceAvailable = false;

  // Workspace is only suggested if the data exists, the user is not already a current member, and the suggested workspace is not the current workspace
  if (suggestedWorkspaceData?.result?.__typename === 'JoinableWorkspace') {
    suggestedWorkspaceAvailable =
      suggestedWorkspaceData?.result &&
      !suggestedWorkspaceData.result?.isCurrentUserMember &&
      suggestedWorkspaceData.result?.id !== selectedWorkspace?.id;
  }

  const showSuggestedWorkspace =
    hasSuggestedWorkspaceScope && suggestedWorkspaceAvailable;

  const showSuggestedWorkspaceText =
    showSuggestedWorkspace && !suggestedWorkspaceTextDismissed;

  const toggleDropdown = () => {
    if (!open) {
      setOpen(true);
      dismissNewSuggestedWorkspaceText();
    } else {
      setOpen(false);
    }
  };

  if (!organization || !selectedWorkspace) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        styles.dropdownWrapper,
        hasInviteScope && styles.withInviteButton
      )}
    >
      <DropdownHeader
        toggleDropdown={toggleDropdown}
        selectedWorkspace={selectedWorkspace}
        isCompact={isCompact}
        showInviteToolTip={showInviteToolTip}
        setShowInviteToolTip={setShowInviteToolTip}
        showSuggestedWorkspaceText={showSuggestedWorkspaceText}
      />

      {open && (
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: true,
            allowOutsideClick: true,
            onDeactivate: () => setOpen(false),
            // FocusTrap crashes when prop `active` is true without having any tabbable children
            // Using `checkCanFocusTrap` and returning an empty resolve prevents it from crashing
            checkCanFocusTrap() {
              return Promise.resolve();
            },
          }}
        >
          <div className={styles.dropdownCard}>
            <div className={styles.currentWorkspaceSection}>
              <div className={styles.currentWorkspaceAvatarSection}>
                <WorkspaceLogo workspace={selectedWorkspace} size="large" />
              </div>
              <Spacer top="small">
                <Text size="body-lg" fontWeight="bold" hasEllipsis>
                  {selectedWorkspace.name}
                </Text>
                <Text color="bodyDimmed">
                  {selectedWorkspace.members.toLocaleString('en-US')}
                  {selectedWorkspace.members == 1 ? ' member' : ' members'}
                </Text>
              </Spacer>
            </div>

            {showSuggestedWorkspace ? (
              <SuggestedWorkspace
                suggestedWorkspaceData={suggestedWorkspaceData}
              />
            ) : null}

            <WorkspaceList selectedWorkspace={selectedWorkspace} />

            <PendingInvites />

            {showInviteButton ||
            workspaces?.length > 1 ||
            showCreateWorkspaceModal ||
            displayWorkspaceConfigurator ? (
              <Container padding="medium" borderSide="top">
                <Arrange gap="small" autoFlow="row" justifyContent="stretch">
                  {showInviteButton && (
                    <Scopes
                      names={[
                        INVITE_VIEWER_ACTION,
                        INVITE_CREATOR_ACTION,
                        INVITE_CREATOR_LITE_ACTION,
                        INVITE_ADMIN_ACTION,
                      ]}
                      some
                    >
                      <Button
                        hasFullWidth
                        variant="primary"
                        onClick={() => {
                          openModal({ modalType: TEAM_INVITE_MODAL });

                          analytics.track(
                            INVITE_MEMBERS_WORKSPACE_SELECTOR_BUTTON_CLICKED,
                            {
                              path: window.location.pathname,
                            }
                          );

                          analytics.track(INVITE_STEP_COMPLETE, {
                            step: INVITE_TEAMMATES_CLICKED,
                            device: APP_SOURCE_MAP.WEB,
                            source: WORKSPACE_SELECTOR,
                            inviteType: ANY,
                            path: window.location.pathname,
                          });
                        }}
                        icon={<SvgUsersAdd />}
                      >
                        Invite teammates
                      </Button>
                    </Scopes>
                  )}

                  {workspaces?.length > 1 && (
                    <div className="width:full">
                      <Button
                        hasFullWidth
                        onClick={() =>
                          openModal({ modalType: WORKSPACE_SELECTOR_MODAL })
                        }
                      >
                        Change default Workspace
                      </Button>
                    </div>
                  )}

                  {showCreateWorkspaceModal && (
                    <Tooltip
                      content={
                        isDeletionPending
                          ? 'This account will be deleted. Undo to create a Workspace'
                          : null
                      }
                    >
                      <TextButton
                        className="width:full flex justify:center grow:1"
                        isDisabled={isDeletionPending}
                        onClick={() =>
                          openModal({ modalType: CREATE_NEW_WORKSPACE_MODAL })
                        }
                      >
                        Create new Workspace
                      </TextButton>
                    </Tooltip>
                  )}

                  {displayWorkspaceConfigurator && !isProduction && (
                    <Container
                      backgroundColor="highlight"
                      radius="large"
                      padding="medium"
                    >
                      <Text fontWeight="bold">New tooling!</Text>
                      <Text isDimmed size="body-sm">
                        Create a new workspace with flexible configuration.
                      </Text>
                      <Spacer top="small" />
                      <TextButton
                        type="button"
                        icon={<SvgZapOutline />}
                        size="small"
                        onClick={() =>
                          openModal({
                            modalType: WORKSPACE_CONFIGURATION_MODAL,
                          })
                        }
                      >
                        Try it!
                      </TextButton>
                    </Container>
                  )}
                </Arrange>
              </Container>
            ) : null}
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
