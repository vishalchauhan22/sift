import React from 'react';

import { Container, Link, Text, TextButton } from '@loomhq/lens';
import { CONTENT_LIMIT_BANNER } from '@loomhq/shared-utilities/constants/scopes';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { LoggedInOnly, useCurrentUserSelector } from '@js/common/current-user';
import { StarterUpgradeModalButton } from '@js/components/StarterUpgradeModalButton';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';

import Scopes from '@js/components/scopes';
import { CONTENT_LIMIT_BANNER_CLICKED } from '@js/constants/events';

import { PLANS_AND_BILLING } from '@js/constants/routes';
import { useWorkspaceCounts } from '@js/hooks/useCounts';
import { useExperimentStarterUpgradeEligibility } from '@js/hooks/useExperimentStarterUpgradeEligibility';
import { useWorkspaceLimit } from '@js/hooks/useWorkspaceLimit';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import { track } from '@js/utilities/analytics';

import { useBannerVisibility } from '../useBannerVisibility';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
type WorkspaceContentLimitBannerProps = {
  reportBannerVisibility: (component: JSX.Element, isVisible: boolean) => void;
};

export const WorkspaceContentLimitBanner = ({
  reportBannerVisibility,
}: WorkspaceContentLimitBannerProps): JSX.Element | null => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const limits = useWorkspaceLimit();
  const counts = useWorkspaceCounts();
  const isExpermentStarterUpgradeModalEligible =
    useExperimentStarterUpgradeEligibility();

  const hasRecorded = useCurrentUserSelector(
    user => user.checklist?.first_video_recording,
    false
  );

  const showBanner =
    hasRecorded &&
    counts &&
    limits &&
    (counts.videos?.total_workspace_videos || 0) +
      (counts.screenshots?.total_workspace_screenshots || 0) >=
      limits?.TOTAL_ASSETS;

  useBannerVisibility(
    showBanner,
    reportBannerVisibility,
    <WorkspaceContentLimitBanner
      reportBannerVisibility={reportBannerVisibility}
    />
  );

  return showBanner ? (
    <FtuxWrapper name={UserPropertyEnum.WORKSPACE_CONTENT_LIMIT_BANNER}>
      <Scopes names={[CONTENT_LIMIT_BANNER]}>
        <Container paddingX="medium" paddingTop="medium">
          <Container
            marginBottom="medium"
            width="100%"
            backgroundColor="offWhite"
            padding="medium"
            radius="medium"
          >
            <Text alignment="center">
              <Text fontWeight="bold" isInline>
                You’ve reached your limit of {limits?.TOTAL_ASSETS} free videos
                and screenshots.{' '}
              </Text>
              <Text isInline>
                {isExpermentStarterUpgradeModalEligible ? (
                  <StarterUpgradeModalButton>
                    {({ showModal }) => (
                      <TextButton type="button" onClick={showModal}>
                        Upgrade your plan
                      </TextButton>
                    )}
                  </StarterUpgradeModalButton>
                ) : (
                  <ControlUpgradeYourPlanLink
                    workspaceId={selectedWorkspace.id}
                    totalVideos={counts?.videos?.total_workspace_videos || 0}
                    totalScreenshots={
                      counts?.screenshots?.total_workspace_screenshots || 0
                    }
                  />
                )}{' '}
                for unlimited content with no restriction on recording time.
              </Text>
            </Text>
          </Container>
        </Container>
      </Scopes>
    </FtuxWrapper>
  ) : null;
};

const ControlUpgradeYourPlanLink = ({
  workspaceId,
  totalVideos,
  totalScreenshots,
}) => {
  return (
    <LoggedInOnly>
      {loggedInUser => (
        <Link
          href={PLANS_AND_BILLING}
          variant="subtle"
          onClick={() =>
            track(
              CONTENT_LIMIT_BANNER_CLICKED,
              {
                totalVideos,
                totalScreenshots,
                ...withIdentifiers(
                  CONTENT_LIMIT_BANNER_CLICKED,
                  AnalyticsEntityId.workspace(
                    workspaceId,
                    'string',
                    'workspaceId'
                  ),
                  AnalyticsEntityId.user(loggedInUser.id, 'userId')
                ),
              },
              () => (window.location.href = PLANS_AND_BILLING)
            )
          }
        >
          Upgrade your plan
        </Link>
      )}
    </LoggedInOnly>
  );
};
