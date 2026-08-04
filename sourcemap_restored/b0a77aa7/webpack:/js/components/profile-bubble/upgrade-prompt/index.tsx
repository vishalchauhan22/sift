import {
  HEADER_UPGRADE_TEXT_CLICKED,
  NAVIGATION_ITEM_CLICKED,
  SHARE_PAGE_VIDEO_LIMIT_INCENTIVES_BUTTON_CLICKED,
} from '@js/constants/events';

import { INCENTIVES_PAGE } from '@js/constants/routes';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import {
  useGetMemberVideoLimits,
  useGetSelectedWorkspace,
  useGetUserRoleForSelectedWorkspace,
} from '@js/hooks/workspace';
import React from 'react';

import { getUpgradeType } from '@js/utilities/upgrades';

import {
  Arrange,
  Spacer,
  Text,
  TextButton,
  Tooltip,
  unit,
  Link,
} from '@loomhq/lens';
import {
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR_LITE,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_DISPLAY_NAME_MAP,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { UPGRADE_TYPES } from '@loomhq/shared-utilities/constants/workspaceUpgradeRequests';
import { getRoleDisplayName } from '@loomhq/shared-utilities/utilities/membershipsUtils';

import { RequestPlanUpgradeLocations } from '../../../constants/requestPlanUpgradeLocations';
import * as analytics from '../../../utilities/analytics';
import styles from './styles.module.css';

const ProgressBar = ({
  videosRecorded,
  videoLimit,
  progressColor = 'var(--lns-color-blurpleDark)',
  backgroundColor = 'var(--lns-color-grey4)',
}) => {
  const percent = (videosRecorded / videoLimit) * 100;

  return (
    <meter
      min={0}
      max={100}
      value={percent}
      className={styles.progressBar}
      style={
        {
          '--progress-bar-inner-color': progressColor,
          '--progress-bar-bar-color': backgroundColor,
        } as any
      }
    />
  );
};

interface Props {
  videoPageView?: boolean;
  minimal?: boolean;
  shouldShowIncentives?: boolean;
  inUpgradeBanner?: boolean;
}

export const UpgradePrompt = ({
  videoPageView = false,
  minimal = false,
  shouldShowIncentives = false,
  inUpgradeBanner = false,
}: Props): JSX.Element | null => {
  const paywallRequest = usePaywallRequest();
  const workspace = useGetSelectedWorkspace();
  const pureBusinessTrial = useOnBusinessTrial();
  const memberVideoLimit = useGetMemberVideoLimits();
  const userRole = useGetUserRoleForSelectedWorkspace();

  const upgradeType = getUpgradeType({
    selectedWorkspace: workspace,
    minPlanForFeature: WORKSPACE_PLAN_BUSINESS,
    pureTrial: pureBusinessTrial,
  });

  const roleDisplayName = getRoleDisplayName(userRole ?? '', {
    hideViewer: false,
  });

  const upgradeCopy =
    upgradeType === UPGRADE_TYPES.ROLE
      ? 'Request role upgrade'
      : userRole === ORG_ROLE_ADMIN
        ? 'Upgrade plan'
        : 'Request plan upgrade';

  const upgradeOnClick = () => {
    analytics.track(NAVIGATION_ITEM_CLICKED, {
      primary_nav_item: 'avatar',
      secondary_nav_item: 'upgrade',
    });
    paywallRequest('business', {
      analyticEvent: HEADER_UPGRADE_TEXT_CLICKED,
      source: RequestPlanUpgradeLocations.PROFILE_DROPDOWN,
    });
  };

  const navigateToIncentivesPage = () => {
    analytics.track(SHARE_PAGE_VIDEO_LIMIT_INCENTIVES_BUTTON_CLICKED, {});
    window.location.href = INCENTIVES_PAGE;
  };

  const videoLimit = memberVideoLimit?.limit ?? 0;
  const videosRecorded = memberVideoLimit?.totalVideos ?? 0;

  if (!videoLimit) {
    return null;
  }

  if (inUpgradeBanner) {
    return shouldShowIncentives ? (
      <Tooltip
        content="Earn videos by inviting teammates"
        placement="bottomCenter"
        maxWidth={6.5 * unit}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={navigateToIncentivesPage}>
          {videosRecorded}/{videoLimit} videos.
        </Link>
      </Tooltip>
    ) : (
      <div>
        {videosRecorded}/{videoLimit} videos.
      </div>
    );
  }

  if (shouldShowIncentives && minimal) {
    return (
      <Tooltip
        content="Earn videos by inviting teammates"
        placement="bottomCenter"
        maxWidth={6.5 * unit}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
        <div
          className={styles.incentivesMinimalPromptContainer}
          onClick={navigateToIncentivesPage}
        >
          <div className={styles.navbarUpgradePromptSpacing}>
            <Arrange gap="xsmall">
              <div className="flex flexDirection:column">
                <Arrange gap="xsmall">
                  <Text color="bodyDimmed" alignment="center">
                    {videosRecorded}/{videoLimit} videos
                  </Text>
                </Arrange>
                <ProgressBar
                  videosRecorded={videosRecorded}
                  videoLimit={videoLimit}
                />
              </div>
            </Arrange>
          </div>
        </div>
      </Tooltip>
    );
  }

  if (minimal) {
    return (
      <div className={styles.minimalPromptContainer}>
        <div className={styles.navbarUpgradePromptSpacing}>
          <Arrange gap="xsmall">
            <div className="flex flexDirection:column">
              <Arrange gap="xsmall">
                <Text color="bodyDimmed" alignment="center">
                  {videosRecorded}/{videoLimit} videos
                </Text>
              </Arrange>
              <ProgressBar
                videosRecorded={videosRecorded}
                videoLimit={videoLimit}
              />
            </div>
          </Arrange>
        </div>
      </div>
    );
  }

  return videoPageView ? (
    <div className={styles.upgradePromptSpacing}>
      <Arrange gap="xsmall">
        <div className="flex flexDirection:column">
          <Text color="bodyDimmed">
            {videosRecorded}/{videoLimit} videos
          </Text>
          <ProgressBar
            videosRecorded={videosRecorded}
            videoLimit={videoLimit}
          />
        </div>
        <TextButton type="button" onClick={upgradeOnClick}>
          <Text color="primary">{upgradeCopy}</Text>
        </TextButton>
      </Arrange>
    </div>
  ) : (
    <Arrange gap="xsmall" columns="1fr" width="100%">
      <TextButton type="button" onClick={upgradeOnClick} offsetSide="left">
        <Text color="primary" fontWeight="bold">
          {upgradeCopy}
        </Text>
      </TextButton>
      <Spacer>
        <Text color="bodyDimmed">
          {workspace.type === WORKSPACE_PLAN_BUSINESS &&
          userRole === ORG_ROLE_CREATOR_LITE
            ? `Current role: ${roleDisplayName}`
            : `Current plan: ${
                WORKSPACE_PLAN_DISPLAY_NAME_MAP[workspace.type]
              }`}
        </Text>
        <Text color="bodyDimmed">
          {videosRecorded}/{videoLimit} videos
        </Text>
      </Spacer>
    </Arrange>
  );
};

// eslint-disable-next-line import/no-default-export
export default UpgradePrompt;
