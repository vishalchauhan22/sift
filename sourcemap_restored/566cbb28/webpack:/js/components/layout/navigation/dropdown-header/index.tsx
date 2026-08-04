import { STORAGE_INCENTIVE_INVITE_TEAMMATES_CTA_CLICKED } from '@js/constants/events';

import classNames from 'classnames';
import { TEAM_INVITE_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import Scopes from '@js/components/scopes';
import WorkspaceLogo from '@js/components/workspace-logo';
import { useIncentivesPage } from '@js/hooks/experiments/useIncentivesPage';
import { useHasSomeScopes } from '@js/hooks/useHasScopes';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import { useStorageIncentiveEligibility } from '@js/hooks/useStorageIncentiveEligibility';
import React from 'react';
import { Arrow, useLayer } from 'react-laag';

import {
  Arrange,
  Container,
  Icon,
  Spacer,
  Text,
  TextButton,
  Tooltip,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgPresent } from '@loomhq/lens/icons/present';
import { SvgSparkle } from '@loomhq/lens/icons/sparkle';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';
import {
  INVITE_ADMIN_ACTION,
  INVITE_CREATOR_ACTION,
  INVITE_CREATOR_LITE_ACTION,
  INVITE_VIEWER_ACTION,
} from '@loomhq/shared-utilities/constants/scopes';
import { useMatchMobileOnly } from '@js/hooks/useMatchMedia';
import * as analytics from '@js/utilities/analytics';
import { useStorageIncentivesFTUXButtonState } from '@js/utilities/localStorage/ftux';

import styles from './styles.module.css';
import { FormattedWorkspaceMembership } from '@js/common/workspace-memberships/use-get-workspace-memberships';

const INVITE_TEAMMATES_DROPDOWN_HEADER = 'Invite Teammates Dropdown Header';

const inviteScopes = [
  INVITE_VIEWER_ACTION,
  INVITE_CREATOR_ACTION,
  INVITE_CREATOR_LITE_ACTION,
  INVITE_ADMIN_ACTION,
];

const inviteButtonContent = {
  'invite-teammates': {
    title: 'Invite teammates',
    icon: <SvgUsersAdd />,
    theme: 'themePrimary',
  },
  'storage-incentives': {
    title: 'Earn free videos',
    icon: <SvgPresent />,
    theme: 'themeTealDark',
  },
  'storage-incentives-after-ftux': {
    title: 'Invite teammates',
    icon: <SvgPresent />,
    theme: 'themeTealDark',
  },
};

type Workspace = Pick<
  FormattedWorkspaceMembership,
  'workspaceLogoPath' | 'id' | 'name' | 'members'
>;

type DropdownHeaderProps = {
  toggleDropdown: () => void;
  selectedWorkspace: Workspace;
  isCompact: boolean;
  showInviteToolTip: boolean;
  setShowInviteToolTip: (show: boolean) => void;
  showSuggestedWorkspaceText: boolean;
};

export function DropdownHeader({
  toggleDropdown,
  selectedWorkspace,
  isCompact,
  showInviteToolTip,
  setShowInviteToolTip,
  showSuggestedWorkspaceText,
}: DropdownHeaderProps): JSX.Element {
  const { openModal } = useModals();
  const isMobile = useMatchMobileOnly();
  const shouldShowIncentives = useIncentivesPage();
  const hasInviteScope = useHasSomeScopes(inviteScopes);
  const buttonId = 'workspaceDropdownHeader';

  const { name, members } = selectedWorkspace;
  const memberText =
    members === 1 ? '1 member' : `${members.toLocaleString('en-US')} members`; // toLocaleString adds commas for large numbers

  const { showInviteButton } = useInvitationCapabilities();

  const suggestedWorkspaceText = (
    <Arrange gap="xsmall">
      <Text color="blurple" size="body-sm" fontWeight="bold" isInline>
        New Workspace to join
      </Text>
      <Icon size={2} color="blurple" icon={<SvgSparkle />} />
    </Arrange>
  );

  const description = showSuggestedWorkspaceText
    ? suggestedWorkspaceText
    : memberText;

  const showStorageIncentives = useStorageIncentiveEligibility();

  const [
    hasDismissedStorageIncentivesFtuxButton,
    dismissedStorageIncentivesFtuxButton,
  ] = useStorageIncentivesFTUXButtonState();

  let content;

  if (showStorageIncentives && !hasDismissedStorageIncentivesFtuxButton) {
    content = inviteButtonContent['storage-incentives'];
  } else if (showStorageIncentives) {
    content = inviteButtonContent['storage-incentives-after-ftux'];
  } else {
    content = inviteButtonContent['invite-teammates'];
  }

  if (shouldShowIncentives || shouldShowIncentives === undefined) {
    content = inviteButtonContent['invite-teammates'];
  }

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: !isMobile && showInviteToolTip,
    placement: 'right-start',
    triggerOffset: 24,
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
    toggleDropdown();
  };

  return (
    <div className="relative">
      <Tooltip isInline={false} content={isCompact ? 'Switch Workspace' : null}>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          className={classNames(
            styles.workspaceButton,
            (!showInviteButton || !hasInviteScope) && styles.roundBottom
          )}
          onClick={onClick}
        >
          <div className={styles.workspaceContentCompact}>
            <Arrange height={6} justifyContent="center">
              <WorkspaceLogo workspace={selectedWorkspace} />
            </Arrange>
          </div>
          <div className={styles.workspaceContentNormal}>
            <Arrange columns={['1fr', '1.5rem']} width="100%">
              <span className="width:full">
                <Text
                  alignment="left"
                  fontWeight="bold"
                  className={styles.workspaceName}
                  hasEllipsis
                >
                  {name}
                </Text>
                <Text alignment="left" color="bodyDimmed" size="body-sm">
                  {description}
                </Text>
              </span>
              <Icon icon={<SvgChevronDown />} />
            </Arrange>
          </div>
        </button>
      </Tooltip>
      {showInviteButton && (
        <Scopes names={inviteScopes} some={true}>
          <Tooltip
            content={isCompact ? content.title : null}
            placement={isCompact ? 'rightCenter' : 'bottomCenter'}
            isInline={false}
          >
            <button
              id="navigationInviteTeammatesButton"
              data-testid="navigation-invite-teammates-button"
              onClick={() => {
                openModal({ modalType: TEAM_INVITE_MODAL });
                dismissedStorageIncentivesFtuxButton();

                analytics.track(
                  STORAGE_INCENTIVE_INVITE_TEAMMATES_CTA_CLICKED,
                  {
                    source: INVITE_TEAMMATES_DROPDOWN_HEADER,
                    path: window.location.pathname,
                    content: content.title,
                  }
                );
              }}
              className={classNames(
                styles.inviteButton,
                isCompact && styles.isCompact,
                styles[content.theme]
              )}
              {...triggerProps}
            >
              <span className={styles.inviteButtonContent}>
                <span className={styles.inviteIcon}>
                  <Icon color="currentColor" icon={content.icon} />
                </span>
                <Spacer right="small" />
                <div className="flex  flexDirection:column items:selfStart">
                  <Text
                    color="currentColor"
                    size="body-sm"
                    fontWeight="bold"
                    className={styles.inviteButtonLabel}
                  >
                    {content.title}
                  </Text>
                  {content.subhead && (
                    <Text
                      color="grey8"
                      size="body-sm"
                      className={styles.inviteButtonLabel}
                    >
                      {content.subhead}
                    </Text>
                  )}
                </div>
              </span>
            </button>
          </Tooltip>
        </Scopes>
      )}

      {!isMobile &&
        showInviteToolTip &&
        renderLayer(
          <div
            className={classNames(styles.banner, 'theme-dark')}
            {...layerProps}
          >
            <Container
              backgroundColor="grey7"
              padding="medium"
              radius="medium"
              width="12rem"
            >
              <span className={styles.bannerArrow} />
              <Text color="body" fontWeight="bold">
                Click here to invite your teammates at any time.
              </Text>
              <Spacer top="small" />
              <TextButton
                onClick={() => setShowInviteToolTip(false)}
                size="small"
                offsetSide="left"
              >
                Dismiss
              </TextButton>
            </Container>
            {/* @ts-expect-error FIXME: react-laag makes every possible prop as required, we should likely update this lib */}
            <Arrow
              {...arrowProps}
              backgroundColor="var(--lns-color-grey7)"
              roundness={1}
            />
          </div>
        )}
    </div>
  );
}
