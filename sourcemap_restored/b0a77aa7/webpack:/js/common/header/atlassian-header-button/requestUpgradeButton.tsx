import { HEADER_REQUEST_ROLE_BUTTON_CLICKED } from '@js/constants/events';

import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { useGetUpgradeWorkspaceRequestStatusQuery } from '@js/common/GetUpgradeWorkspaceRequestStatus.generated';
import React from 'react';

import { Button, Loader } from '@loomhq/lens';
import { SvgCheck } from '@loomhq/lens/icons/check';

export const RequestUpgradeButton = ({
  source = RequestPlanUpgradeLocations.HEADER,
}: {
  source?: RequestPlanUpgradeLocations;
}): React.ReactElement => {
  const paywallRequest = usePaywallRequest();

  const { data, loading: requestStatusFetching } =
    useGetUpgradeWorkspaceRequestStatusQuery({
      fetchPolicy: 'no-cache',
    });

  const requestStatus =
    data?.getUpgradeWorkspaceRequestStatus?.__typename ===
    'GetUpgradeWorkspaceRequestStatusPayload'
      ? data.getUpgradeWorkspaceRequestStatus.status
      : null;

  const buttonClickHandler = () => {
    paywallRequest('business', {
      analyticEvent: HEADER_REQUEST_ROLE_BUTTON_CLICKED,
      source,
    });
  };

  return requestStatusFetching ? (
    <Loader />
  ) : (
    <Button
      variant="primary"
      size="small"
      onClick={buttonClickHandler}
      icon={requestStatus ? <SvgCheck /> : undefined}
      isDisabled={Boolean(requestStatus)}
    >
      {requestStatus ? 'Request sent' : 'Upgrade'}
    </Button>
  );
};
