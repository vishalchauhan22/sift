import {
  HEADER_REQUEST_ROLE_BUTTON_CLICKED,
  HEADER_REQUEST_ROLE_BUTTON_SEEN,
} from '@js/constants/events';

import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { useGetUpgradeWorkspaceRequestStatusQuery } from '@js/common/GetUpgradeWorkspaceRequestStatus.generated';
import { useMount } from '@js/hooks/useMount';
import { useSearchParams } from '@js/hooks/useSearchParams';
import { useGetRoleAndPlan } from '@js/hooks/workspace';
import React from 'react';

import { Button } from '@loomhq/lens';
import { SvgCheck } from '@loomhq/lens/icons/check';

import * as analytics from '../../utilities/analytics';

interface NonAdminPersistentUpgradeButtonProps {
  source?: RequestPlanUpgradeLocations;
  onUpgradeClick?: () => void;
}

export const NonAdminPersistentUpgradeButton = ({
  source,
  onUpgradeClick,
}: NonAdminPersistentUpgradeButtonProps): JSX.Element | null => {
  const paywallRequest = usePaywallRequest();

  const params = useSearchParams();
  const requestUpgrade = params.get('requestUpgrade');

  const { data, loading: requestStatusFetching } =
    useGetUpgradeWorkspaceRequestStatusQuery({
      fetchPolicy: 'no-cache',
    });

  const requestStatus =
    data?.getUpgradeWorkspaceRequestStatus?.__typename ===
    'GetUpgradeWorkspaceRequestStatusPayload'
      ? data.getUpgradeWorkspaceRequestStatus.status
      : null;

  const { userRole, workspacePlan } = useGetRoleAndPlan();

  const buttonClickHandler = () => {
    paywallRequest('business', {
      analyticEvent: HEADER_REQUEST_ROLE_BUTTON_CLICKED,
      source,
    });
    onUpgradeClick?.();
  };

  useMount(() => {
    analytics.track(HEADER_REQUEST_ROLE_BUTTON_SEEN, {
      request_sent: Boolean(requestStatus),
      user_role: userRole,
      workspace_plan: workspacePlan,
    });
    // Make sure to only log once

    if (requestUpgrade === 'true') {
      params.delete('requestUpgrade');
      window.history.replaceState(null, '', '?' + params + location.hash);

      buttonClickHandler();
    }
  });

  return !requestStatusFetching ? (
    <Button
      variant="primary"
      isDisabled={Boolean(requestStatus)}
      size="small"
      icon={requestStatus ? <SvgCheck /> : undefined}
      onClick={buttonClickHandler}
    >
      {requestStatus ? 'Request sent' : 'Upgrade'}
    </Button>
  ) : null;
};
