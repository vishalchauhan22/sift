import { usePaywallRequest } from '@js/actions/request-upgrade';
import classNames from 'classnames';
import { useGetUpgradeWorkspaceRequestStatusQuery } from '@js/common/GetUpgradeWorkspaceRequestStatus.generated';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import React from 'react';

import { incrementMetric } from '@js/utilities/metrics';

import {
  UpgradeComponentFeature,
  UPGRADE_FEATURE_DEFAULT_TITLE,
  useGetMinRoleForFeature,
  getTooltipMessage,
} from '@js/utilities/upgrades';

import { Distribute, Icon, Spacer, Text, Tooltip } from '@loomhq/lens';
import { SvgEditions } from '@loomhq/lens/icons/editions';

import { useExperimentStarterUpgradeEligibility } from '../../hooks/useExperimentStarterUpgradeEligibility';
import { StarterUpgradeModalButton } from '../StarterUpgradeModalButton';

interface Props {
  analyticsEvent?: any;
  children: any;
  placement?: React.ComponentProps<typeof Tooltip>['placement'];
  title?: string;
  feature?: UpgradeComponentFeature;
  inActivitySidebar?: boolean;
}

const UpgradeTooltip = ({
  analyticsEvent = null,
  children,
  placement = 'bottomCenter',
  title,
  feature = UpgradeComponentFeature.DEFAULT, // possible prototype that might replace minPlanForFeature/minRoleForFeature
  inActivitySidebar = false,
}: Props): JSX.Element | null => {
  const paywallRequest = usePaywallRequest();
  const selectedWorkspace = useGetSelectedWorkspace();
  const hideViewerRole = Boolean(selectedWorkspace?.isViewerRoleHidden);
  const pureBusinessTrial = useOnBusinessTrial();
  const isExpermentStarterUpgradeModalEligible =
    useExperimentStarterUpgradeEligibility();

  const { data, called } = useGetUpgradeWorkspaceRequestStatusQuery({
    fetchPolicy: 'no-cache',
  });

  const requestStatus =
    data?.getUpgradeWorkspaceRequestStatus?.__typename ===
    'GetUpgradeWorkspaceRequestStatusPayload'
      ? data.getUpgradeWorkspaceRequestStatus.status
      : null;

  const tooltipTitle = title || UPGRADE_FEATURE_DEFAULT_TITLE[feature];
  const minRoleForFeature = useGetMinRoleForFeature();

  if (!called) {
    return null;
  }

  return (
    <Tooltip
      placement={placement}
      maxWidth={46}
      isInline={false}
      keepOpen
      triggerOffset={inActivitySidebar ? 11 : undefined}
      content={
        <div className={classNames('theme-dark')}>
          <Distribute isSpread>
            <Text size="body-sm" fontWeight="bold">
              {requestStatus ? 'Your request has been sent!' : tooltipTitle}
            </Text>
            <Distribute>
              <Icon color="upgrade" size={2} icon={<SvgEditions />} />
              <Spacer left={0.5} />
              <Text color="upgrade" fontWeight="bold" size="body-sm">
                Upgrade
              </Text>
            </Distribute>
          </Distribute>
          <Spacer bottom={1} />
          <Text size="body-sm">
            {getTooltipMessage({
              selectedWorkspace,
              minRoleForFeature,
              requestStatus,
              hideViewerRole,
              pureTrial: pureBusinessTrial,
            })}
          </Text>
        </div>
      }
    >
      {isExpermentStarterUpgradeModalEligible ? (
        <StarterUpgradeModalButton>
          {() => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
            <div
              className="disabledButtonWrapper pointer"
              onClick={() =>
                paywallRequest('business', {
                  analyticEvent: analyticsEvent,
                })
              }
              role="button"
              tabIndex={-1}
            >
              {children}
            </div>
          )}
        </StarterUpgradeModalButton>
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
        <div
          className="disabledButtonWrapper pointer"
          onClick={() => {
            incrementMetric('billing.paywall.tooltip.click', {
              feature: String(UpgradeComponentFeature[feature]).toLowerCase(),
            });

            paywallRequest('business', {
              analyticEvent: analyticsEvent,
            });
          }}
          role="button"
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </Tooltip>
  );
};

// eslint-disable-next-line import/no-default-export
export default UpgradeTooltip;
