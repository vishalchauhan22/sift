// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import {
  Arrange,
  Switch,
  Icon,
  Container,
  Text,
  Spacer,
  Link,
} from '@loomhq/lens';
import { SvgAlertTriangle } from '@loomhq/lens/icons/alert-triangle';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';
import { SvgSalesforce } from '@loomhq/lens/icons/salesforce';

import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';

import { VideoSettingWithIcon } from '../video-setting';
import { useGetIntegrationActiveStatusQuery } from './GetIntegrationActive.generated';

let disabledSubtext =
  'Contact an admin to enable Salesforce for your workspace';
const defaultSubtext =
  'Track your views and engagement metrics directly in Salesforce';

const SettingsListStyleOverride = styled.span`
  & div + div {
    border-top: 0;
  }
`;

type SalesforceTrackingProps = {
  isFromDefaultSettings: boolean;
  options: any;
  toggleProp: (propName: string) => void;
  handleRelatedSettingsEditClick?: () => void;
};

const RelatedSettingsForSalesforce = ({
  emailGateSetting,
  handleRelatedSettingsEditClick,
}) => {
  let headerText: string;
  let icon: JSX.Element;

  if (emailGateSetting === EmailGatingSetting.None) {
    headerText = 'Anonymous viewers are not asked for an email.';
    icon = <Icon icon={<SvgAlertTriangle />} />;
  } else if (emailGateSetting === EmailGatingSetting.Soft) {
    headerText = 'Anonymous viewers are asked for their email.';
    icon = <Icon icon={<SvgCheckCircle />} color="success" />;
  } else {
    headerText =
      'Anonymous viewers are required to provide their email. (recommended)';
    icon = <Icon icon={<SvgCheckCircle />} color="success" />;
  }

  return (
    <SettingsListStyleOverride>
      <Container
        backgroundColor="backgroundSecondary"
        padding={2.5}
        radius="large"
        htmlTag="section"
      >
        <Text fontWeight="bold">Related settings for Salesforce</Text>
        <Spacer top={2} />
        <Arrange alignItems="start" gap={1}>
          {icon}
          <Arrange autoFlow="row" gap={1}>
            <Text>{headerText}</Text>
            <Text isDimmed>
              {
                "Anonymous viewers that don't provide their email are not trackable in Salesforce."
              }
            </Text>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link onClick={handleRelatedSettingsEditClick}>Edit setting</Link>
          </Arrange>
        </Arrange>
      </Container>
    </SettingsListStyleOverride>
  );
};

export const SalesforceTrackingSettings = ({
  isFromDefaultSettings,
  options,
  toggleProp,
  handleRelatedSettingsEditClick,
}: SalesforceTrackingProps): JSX.Element | null => {
  const { loading, data } = useGetIntegrationActiveStatusQuery({
    variables: { integrationType: 'SFDC' },
  });

  if (loading) {
    return null;
  }

  let isActive = false;

  if (
    data?.getIntegrationActive?.__typename === 'GetIntegrationActivePayload'
  ) {
    isActive = data.getIntegrationActive.isActive;
  } else {
    disabledSubtext = 'Salesforce integration status currently unavailable';
  }

  const shouldShowRelatedSettingsForSalesforce =
    !isFromDefaultSettings &&
    isActive &&
    options['salesforce_engagement_tracking'];

  return (
    <>
      <VideoSettingWithIcon
        key={'salesforce_engagement_tracking'}
        settingName={'Salesforce tracking'}
        subtext={isActive ? defaultSubtext : disabledSubtext}
        Icon={<Icon icon={<SvgSalesforce />} size={5} />}
      >
        <Switch
          isActive={options['salesforce_engagement_tracking']}
          onChange={() => {
            toggleProp('salesforce_engagement_tracking');
          }}
          isDisabled={!isActive}
          ariaLabel={'Engagement tracking'}
        />
      </VideoSettingWithIcon>

      {shouldShowRelatedSettingsForSalesforce ? (
        <RelatedSettingsForSalesforce
          emailGateSetting={options['email_gate_video_type']}
          handleRelatedSettingsEditClick={handleRelatedSettingsEditClick}
        />
      ) : null}
    </>
  );
};
