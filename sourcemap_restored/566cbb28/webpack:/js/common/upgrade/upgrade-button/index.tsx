// TODO:
// - eliminate need for spread operator
// - props are sus: convert importing parent files to check
// - extract <Button> as const so it can be reused within tooltip
// - yeet default export
// - eliminate flicker with wrong content from conditional loading
import cn from 'classnames';

import React from 'react';

import { Button, Text, Tooltip } from '@loomhq/lens';
import { SvgLock } from '@loomhq/lens/icons/lock';
import { SvgEditions } from '@loomhq/lens/icons/editions';
import {
  ORG_ROLE_CREATOR,
  WorkspaceRole,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import {
  WORKSPACE_PLAN_BUSINESS,
  WorkspacePlan,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { UPGRADE_TYPES } from '@loomhq/shared-utilities/constants/workspaceUpgradeRequests';
import { usePaywallRequest } from '@js/actions/request-upgrade';
import { useGetUpgradeWorkspaceRequestStatusQuery } from '@js/common/GetUpgradeWorkspaceRequestStatus.generated';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import { getTooltipMessage, getUpgradeType } from '@js/utilities/upgrades';

import styles from './styles.module.css';

interface Props {
  analyticsEvent?: string;
  ariaLabel?: string; // required to support screenreader text
  ariaLabelledBy?: string; // required to support screenreader text
  defaultButtonText?: string | null;
  defaultRoleText?: string | null;
  hideIcon?: boolean;
  minPlanForFeature?: WorkspacePlan;
  minRoleForFeature?: WorkspaceRole;
  hideTooltip?: boolean;
  // FIXME: (next author) - these should align with the lens props
  buttonVariant?: string;
  customStyle?: string;
  size?: React.ComponentProps<typeof Button>['size'];
}

export const UpgradeButton = ({
  analyticsEvent,
  ariaLabel = '',
  ariaLabelledBy = '',
  defaultButtonText = null,
  defaultRoleText = null,
  hideIcon = false,
  minPlanForFeature = WORKSPACE_PLAN_BUSINESS,
  minRoleForFeature = ORG_ROLE_CREATOR,
  // prototyping with UpgradeComponentFeature in order to remove minPlanForFeature, see enum for more info
  hideTooltip = false,
  buttonVariant = 'upgrade',
  customStyle = undefined,
  ...buttonProps
}: Props): JSX.Element | null => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const hideViewerRole = Boolean(selectedWorkspace?.isViewerRoleHidden);
  const pureBusinessTrial = useOnBusinessTrial();
  const paywallRequest = usePaywallRequest();

  const upgradeType = getUpgradeType({
    selectedWorkspace,
    minPlanForFeature,
    pureTrial: pureBusinessTrial,
  });

  const { data, called } = useGetUpgradeWorkspaceRequestStatusQuery({
    fetchPolicy: 'no-cache',
  });

  const requestStatus =
    data?.getUpgradeWorkspaceRequestStatus?.__typename ===
    'GetUpgradeWorkspaceRequestStatusPayload'
      ? data.getUpgradeWorkspaceRequestStatus.status
      : null;

  if (!called) {
    return null;
  }

  const icon =
    !hideIcon &&
    (upgradeType === UPGRADE_TYPES.ROLE ? <SvgLock /> : <SvgEditions />);
  const text =
    upgradeType === UPGRADE_TYPES.ROLE
      ? defaultRoleText || 'Upgrade role'
      : defaultButtonText || 'Upgrade plan';
  const className = cn(
    !hideIcon && styles.iconPadding,
    customStyle && customStyle
  );

  const onClick = () => {
    const paywall =
      minPlanForFeature === 'enterprise' ? 'enterprise' : 'business';

    analyticsEvent
      ? paywallRequest(paywall, { analyticEvent: analyticsEvent })
      : paywallRequest(paywall);
  };

  // Ensure we use aria labels tp sufficiently explain what the button does.
  // [1] Use aria-labelled by when another component (such as a Text element) explains the upgrade reason.
  // Example:
  // <UpgradeButton aria-labelledby="unique-id-for-component" />
  // Elsewhere in the code you would have:
  // <Text id="unique-id-for-component" size="body-sm">Upgrade to get unlimited access to videos</Text>
  //
  // [2] Use aria-label when another component can't explain and button text is not sufficient:
  // Example:
  // <UpgradeButton aria-label="unlimited videos" />
  // will read aria-label="Upgrade <plan
  // | role> for unlimited videos"
  const fullAriaLabel = `${text} for ${ariaLabel}`;

  if (hideTooltip) {
    return (
      <Button
        aria-label={ariaLabel ? fullAriaLabel : undefined}
        aria-labelledby={ariaLabelledBy ?? undefined}
        type="button"
        variant={buttonVariant as any}
        icon={icon}
        onClick={onClick}
        {...buttonProps}
        className={className}
      >
        {text}
      </Button>
    );
  }

  const tooltipMessage = getTooltipMessage({
    selectedWorkspace,
    minPlanForFeature,
    minRoleForFeature,
    requestStatus,
    hideViewerRole: Boolean(hideViewerRole),
    pureTrial: pureBusinessTrial,
  });

  return (
    <Tooltip
      keepOpen
      placement="bottomCenter"
      maxWidth={35}
      content={<Text size="body-sm">{tooltipMessage}</Text>}
    >
      <Button
        aria-label={fullAriaLabel}
        type="button"
        variant={buttonVariant as any}
        icon={icon}
        onClick={onClick}
        {...buttonProps}
        className={className}
      >
        {text}
      </Button>
    </Tooltip>
  );
};
