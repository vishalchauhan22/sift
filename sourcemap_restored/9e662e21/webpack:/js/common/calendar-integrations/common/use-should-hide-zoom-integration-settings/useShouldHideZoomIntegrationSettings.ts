import { useGetUserRoleForSelectedWorkspace } from '@js/hooks/workspace';

import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';

import { useMemberProperty } from '@js/hooks/memberProperties';

import { useIsRewatchZoomConsolidationEnabled } from '../useIsRewatchZoomConsolidationEnabled';
import {
  useGetUserHasCalendarConnectedQuery,
  GetUserHasCalendarConnectedQuery,
} from './GetUserHasCalendarConnected.generated';
import { ZoomIntegrationSettingType } from './types';

const selectHasCalendarsConnected = (
  data: GetUserHasCalendarConnectedQuery | undefined
) => {
  if (data?.me?.__typename === 'RegularUser' && data.me.calendars?.length > 0) {
    return true;
  }

  return false;
};

export const useShouldHideZoomIntegrationSettings = (
  settingType: ZoomIntegrationSettingType
): boolean => {
  const userRole = useGetUserRoleForSelectedWorkspace();
  const isUserWorkspaceAdmin = userRole === ORG_ROLE_ADMIN;

  const {
    loading: zoomUserSettingLoading,
    value: isZoomIntegrationEnabledForUser,
  } = useMemberProperty(MemberPropertyEnum.ZOOM_ALL_INGESTION, {
    skip: settingType !== ZoomIntegrationSettingType.Personal,
  });

  const {
    isRewatchZoomConsolidationEnabled,
    isRewatchZoomConsolidationLoading,
  } = useIsRewatchZoomConsolidationEnabled();

  const { data, loading } = useGetUserHasCalendarConnectedQuery({
    skip: zoomUserSettingLoading || !isRewatchZoomConsolidationEnabled,
  });

  const isLoading =
    loading || zoomUserSettingLoading || isRewatchZoomConsolidationLoading;

  // 1. Hide while loading
  if (isLoading) {
    return true;
  }

  const hasCalendarsConnected = selectHasCalendarsConnected(data);

  // 2. Show if not in FF
  if (!isRewatchZoomConsolidationEnabled) {
    return false;
  }

  // 3. Show if calendars not connected
  if (!hasCalendarsConnected) {
    return false;
  }

  // 4. Show if settingType = personal and zoom integration is enabled for user
  if (
    settingType === ZoomIntegrationSettingType.Personal &&
    isZoomIntegrationEnabledForUser
  ) {
    return false;
  }

  // 5. Show if settingType = workspace and user is workspace admin
  if (
    settingType === ZoomIntegrationSettingType.Workspace &&
    isUserWorkspaceAdmin
  ) {
    return false;
  }

  // 6. Hide in all other cases
  return true;
};
