// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgCheckCircleFill } from '@loomhq/lens/icons/check-circle-fill';
import { SvgSalesforce } from '@loomhq/lens/icons/salesforce';
import { useVideoContext } from '@js/common/video-player';
import { SALESFORCE_TRACKING_LINK_CLICKED } from '@js/constants/localStorage';
import {
  TAB_LIST,
  useOpenRightPanelAndSwitchToTab,
} from '@js/pages/share/common';
import { useGetIntegrationActiveStatusQuery } from '@js/pages/share/video-settings/common/video-settings-tabs/GetIntegrationActive.generated';

import { setLocalStorageKey } from '@js/utilities/localStorage';

const CursorPointerDiv = styled.div`
  cursor: pointer;
`;

export const SalesforceEngagementTrackingIndicator = (): JSX.Element | null => {
  const {
    video: {
      currentUserCanEdit,
      salesforceEngagementTracking: isSalesforceEngagementTrackingOn,
    },
  } = useVideoContext();
  const switchToTab = useOpenRightPanelAndSwitchToTab();

  const { loading, data } = useGetIntegrationActiveStatusQuery({
    variables: { integrationType: 'SFDC' },
  });

  let isSalesforceIntegrationConnected = false;

  if (
    data?.getIntegrationActive?.__typename === 'GetIntegrationActivePayload'
  ) {
    isSalesforceIntegrationConnected = data.getIntegrationActive.isActive;
  }

  if (
    loading ||
    !isSalesforceIntegrationConnected ||
    !isSalesforceEngagementTrackingOn ||
    !currentUserCanEdit
  ) {
    return null;
  }

  return (
    /* eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions */
    <CursorPointerDiv
      onClick={() => {
        switchToTab(TAB_LIST.Settings);
        setLocalStorageKey(SALESFORCE_TRACKING_LINK_CLICKED, true);
      }}
    >
      <Arrange gap="xsmall">
        <Icon icon={<SvgSalesforce />} />
        <Text color="bodyDimmed">Salesforce tracking</Text>
        <Icon color="success" size={2} icon={<SvgCheckCircleFill />} />
      </Arrange>
    </CursorPointerDiv>
  );
};
