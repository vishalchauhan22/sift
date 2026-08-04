import { MANAGE_MEMBERS } from '@js/constants/routes';

import { SelectedWorkspaceType } from '@js/hooks/workspace';
import React from 'react';

import { Link } from '@loomhq/lens';
import { membershipUtils } from '@loomhq/shared-utilities';
import {
  ALL_ORG_ROLES,
  ORG_ROLE_ADMIN,
  ORG_ROLE_CREATOR,
  ORG_ROLE_CREATOR_LITE,
} from '@loomhq/shared-utilities/constants/organizationRoles';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_DISPLAY_NAME_MAP,
  WORKSPACE_PLAN_HIERARCHY,
  WORKSPACE_PLAN_INDEFINITE_ARTICLE_MAP,
  WORKSPACE_PLAN_STARTER_FREE,
} from '@loomhq/shared-utilities/constants/workspacePlans';
import { UPGRADE_TYPES } from '@loomhq/shared-utilities/constants/workspaceUpgradeRequests';
const { getRoleDisplayName } = membershipUtils;

// todo: integrate for the remaining upgrade components
// ticket: https://linear.app/loom-com/issue/COL-2933/integrate-upgradecomponentfeature-across-all-upgrade-components
export enum UpgradeComponentFeature {
  DEFAULT,
  RECORD_VIDEO,
  UPLOAD_VIDEO,
  ADD_CALL_TO_ACTION,
  ADD_THUMBNAIL,
  VIEW_TRANSCRIPT,
  ENGAGEMENT_INSIGHTS,
  DOWNLOAD,
  DOWNLOAD_CAPTIONS,
}

export const UPGRADE_FEATURE_DEFAULT_TITLE = {
  [UpgradeComponentFeature.DEFAULT]: 'Upgrade required',
  [UpgradeComponentFeature.RECORD_VIDEO]: 'Record Video',
  [UpgradeComponentFeature.UPLOAD_VIDEO]: 'Upload Video',
  [UpgradeComponentFeature.ADD_CALL_TO_ACTION]: 'Add a call-to-action',
  [UpgradeComponentFeature.ADD_THUMBNAIL]: 'Add a custom thumbnail',
  [UpgradeComponentFeature.VIEW_TRANSCRIPT]: 'View a transcript of your Loom',
  [UpgradeComponentFeature.ENGAGEMENT_INSIGHTS]: 'Engagement Insights',
  [UpgradeComponentFeature.DOWNLOAD]: 'Download Video',
  [UpgradeComponentFeature.DOWNLOAD_CAPTIONS]: 'Download Captions',
};

export const getPersistantUpgradeType = (
  workspace: SelectedWorkspaceType,
  pureTrial = false
): 'plan' | 'role' | undefined => {
  const isTrialing = pureTrial;
  const isNonAdminStarterFree =
    workspace?.memberRole !== ORG_ROLE_ADMIN &&
    workspace?.type === WORKSPACE_PLAN_STARTER_FREE;
  const isNonAdminBusinessTrial =
    isTrialing &&
    workspace?.memberRole !== ORG_ROLE_ADMIN &&
    workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const isCreatorLiteInBusiness =
    workspace?.memberRole === ORG_ROLE_CREATOR_LITE &&
    workspace?.type === WORKSPACE_PLAN_BUSINESS;

  if (isNonAdminStarterFree || isNonAdminBusinessTrial) {
    return 'plan';
  }

  if (isCreatorLiteInBusiness) {
    return 'role';
  }
};

export const getUpgradeType = ({
  selectedWorkspace,
  minPlanForFeature,
  pureTrial = false,
}: {
  selectedWorkspace: { type: string };
  minPlanForFeature: keyof typeof WORKSPACE_PLAN_HIERARCHY;
  pureTrial?: boolean;
}): 'plan' | 'role' => {
  if (selectedWorkspace?.type == WORKSPACE_PLAN_STARTER_FREE) {
    return UPGRADE_TYPES.PLAN;
  }

  if (pureTrial) {
    return UPGRADE_TYPES.PLAN;
  }

  return WORKSPACE_PLAN_HIERARCHY[minPlanForFeature] >
    WORKSPACE_PLAN_HIERARCHY[selectedWorkspace.type]
    ? UPGRADE_TYPES.PLAN
    : UPGRADE_TYPES.ROLE;
};

export const getTooltipMessage = ({
  selectedWorkspace,
  minPlanForFeature = WORKSPACE_PLAN_BUSINESS,
  minRoleForFeature = ORG_ROLE_CREATOR,
  requestStatus = null,
  hideViewerRole = false,
  pureTrial = false,
  isLegacyMigrationActive = false,
}: {
  selectedWorkspace: any;
  minPlanForFeature?: keyof typeof WORKSPACE_PLAN_HIERARCHY;
  minRoleForFeature: (typeof ALL_ORG_ROLES)[number];
  requestStatus: unknown;
  hideViewerRole?: boolean;
  pureTrial?: boolean;
  isLegacyMigrationActive?: boolean;
}): JSX.Element => {
  if (isLegacyMigrationActive) {
    return (
      <>
        Upgrading plan is temporarily unavailable while we integrate your
        account with Atlassian. This should only take a few minutes.
      </>
    );
  }
  if (requestStatus !== null) {
    return (
      <>
        We let your admin(s) know of your upgrade request. To see a full list of
        admin(s), visit the{' '}
        <Link href={MANAGE_MEMBERS} variant="neutral">
          Workspace members
        </Link>{' '}
        page.
      </>
    );
  }

  const planName = WORKSPACE_PLAN_DISPLAY_NAME_MAP[minPlanForFeature];
  const planArticle = WORKSPACE_PLAN_INDEFINITE_ARTICLE_MAP[minPlanForFeature];
  const isAdmin = selectedWorkspace?.memberRole === ORG_ROLE_ADMIN;

  const upgradeType = getUpgradeType({
    selectedWorkspace,
    minPlanForFeature,
    pureTrial,
  });

  if (upgradeType === UPGRADE_TYPES.ROLE) {
    const memberRole = selectedWorkspace?.memberRole;
    const currentRoleLabel = getRoleDisplayName(memberRole, {
      hideViewer: hideViewerRole,
    });
    const minRoleForFeatureLabel = getRoleDisplayName(minRoleForFeature, {
      hideViewer: hideViewerRole,
    });

    return (
      <>
        This feature is only available for the{' '}
        <strong>{minRoleForFeatureLabel}</strong> role. Click to request to your
        admin(s) to upgrade your role from <strong>{currentRoleLabel}</strong>{' '}
        to <strong>{minRoleForFeatureLabel}</strong>.
      </>
    );
  }

  return (
    <>
      This feature is only available with {planArticle}{' '}
      <strong>{planName} plan</strong> or above.{' '}
      {isAdmin ? (
        <>Click to upgrade.</>
      ) : (
        <>Send a request to your admin(s) to upgrade.</>
      )}
    </>
  );
};

export function useGetMinRoleForFeature(): (typeof ALL_ORG_ROLES)[number] {
  return ORG_ROLE_CREATOR;
}
