import React from 'react';

import { Arrange, Container, Icon, Text } from '@loomhq/lens';
import { SvgEditions } from '@loomhq/lens/icons/editions';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { WORKSPACE_PLAN_BUSINESS } from '@loomhq/shared-utilities/constants/workspacePlans';
import { UPGRADE_TYPES } from '@loomhq/shared-utilities/constants/workspaceUpgradeRequests';
import { UpgradeButton } from '@js/common/upgrade';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { CONTENT_LIMIT_BANNER_CLICKED } from '@js/constants/events';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useStorageIncentiveEligibility } from '@js/hooks/useStorageIncentiveEligibility';
import {
  useGetMemberVideoLimits,
  useGetSelectedWorkspace,
} from '@js/hooks/workspace';
import { getUpgradeType } from '@js/utilities/upgrades';

import { useBannerVisibility } from '../useBannerVisibility';

type MemberVideoLimitBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export const MemberVideoLimitBanner = ({
  reportBannerVisibility,
}: MemberVideoLimitBannerProps): JSX.Element | null => {
  const memberLimits = useGetMemberVideoLimits();
  const selectedWorkspace = useGetSelectedWorkspace();
  const pureBusinessTrial = useOnBusinessTrial();
  const upgradeType = getUpgradeType({
    selectedWorkspace,
    minPlanForFeature: WORKSPACE_PLAN_BUSINESS,
    pureTrial: pureBusinessTrial,
  });

  const hasStorageIncentive = useStorageIncentiveEligibility();

  const showBanner = !hasStorageIncentive && memberLimits.exceededLimit;

  useBannerVisibility(
    Boolean(showBanner),
    reportBannerVisibility,
    <MemberVideoLimitBanner reportBannerVisibility={reportBannerVisibility} />
  );

  const textId = 'upgrade-reason';

  return showBanner ? (
    <FtuxWrapper name={UserPropertyEnum.MEMBER_VIDEO_LIMIT_BANNER}>
      <Container paddingX="medium" paddingTop="medium">
        <Container
          width="100%"
          backgroundColor="upgrade"
          marginBottom="medium"
          paddingTop="medium"
          paddingBottom="medium"
          paddingLeft="large"
          paddingRight="large"
          radius="medium"
        >
          <Arrange justifyContent="space-between">
            <Arrange gap="small" justifyContent="center">
              <Icon icon={<SvgEditions />} />
              <Container>
                <Text fontWeight="bold" isInline>
                  You’ve reached your limit of {memberLimits.limit} videos in
                  this Workspace.{' '}
                </Text>
                <Text isInline id={textId}>
                  {upgradeType === UPGRADE_TYPES.ROLE
                    ? 'Request a role upgrade for unlimited videos.'
                    : 'Upgrade your plan for unlimited videos with no restriction on recording time.'}
                </Text>
              </Container>
            </Arrange>
            <UpgradeButton
              analyticsEvent={CONTENT_LIMIT_BANNER_CLICKED}
              ariaLabelledBy={textId}
              defaultRoleText="Request role upgrade"
              buttonVariant="neutral"
              hideIcon
              hideTooltip
            />
          </Arrange>
        </Container>
      </Container>
    </FtuxWrapper>
  ) : null;
};
