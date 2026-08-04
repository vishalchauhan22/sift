import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import React from 'react';

import { ROLLOUT_LIMIT_BUSINESS_CREATOR_LITE } from '@loomhq/shared-utilities/constants/featureFlag';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import { WORKSPACE_PLAN_BUSINESS } from '@loomhq/shared-utilities/constants/workspacePlans';

import { useGetSelectedWorkspace } from '../hooks/workspace-basic';
import { CreatorLiteLimitSessionBanner } from './CreatorLiteLimitSessionBanner';

export const CreatorLiteLimitSessionBannerWrapper = (): JSX.Element | null => {
  const workspace = useGetSelectedWorkspace() as any;

  const isTargeted = useFeatureFlagValue(ROLLOUT_LIMIT_BUSINESS_CREATOR_LITE);
  const isBusiness = workspace?.type === WORKSPACE_PLAN_BUSINESS;
  const numberOfCreatorLites: number =
    workspace?.counts?.users?.total_active_creator_lites ?? 0;
  const isAtOrExceededCreatorLiteLimit =
    numberOfCreatorLites >= workspace?.limits?.['CREATOR_LITE_MEMBER_LIMIT'];
  const isAdminOfWorkspace = workspace?.memberRole === ORG_ROLE_ADMIN;

  if (
    workspace &&
    isBusiness &&
    isAdminOfWorkspace &&
    Boolean(isTargeted) &&
    isAtOrExceededCreatorLiteLimit
  ) {
    return <CreatorLiteLimitSessionBanner />;
  }

  return null;
};
