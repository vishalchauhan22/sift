import {
  AUTOJOIN_BANNER_DISMISSED,
  AUTOJOIN_DISMISSAL_TIME,
  AUTOJOIN_TOOLTIP_DISMISSED,
  JOIN_SUGGESTED_WORKSPACE_BANNER_DISMISSED,
  JOIN_SUGGESTED_WORKSPACE_DISMISSAL_TIME,
  JOIN_SUGGESTED_WORKSPACE_TOOLTIP_DISMISSED,
  JOIN_SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER_DISMISSED,
  SEEN_SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER,
} from '@js/constants/localStorage';

import { useStoredStateForUser } from './utils';

export const useAutojoinTooltipState = (): any => {
  return useStoredStateForUser(AUTOJOIN_TOOLTIP_DISMISSED);
};

export const useAutojoinBannerState = (): any => {
  return useStoredStateForUser(AUTOJOIN_BANNER_DISMISSED);
};

export const useSuggestedWorkspaceTooltipState = (): any => {
  return useStoredStateForUser(JOIN_SUGGESTED_WORKSPACE_TOOLTIP_DISMISSED);
};

export const useSuggestedWorkspaceBannerState = (): any => {
  return useStoredStateForUser(JOIN_SUGGESTED_WORKSPACE_BANNER_DISMISSED);
};

export const useSuggestedWorkspaceTimedDismissalState = (): any => {
  return useStoredStateForUser(JOIN_SUGGESTED_WORKSPACE_DISMISSAL_TIME);
};

export const useAutojoinTimedDismissalState = (): any => {
  return useStoredStateForUser(AUTOJOIN_DISMISSAL_TIME);
};

export const useSuggestedWorkspaceWorkspaceSwitcherDismissalState = (): any => {
  return useStoredStateForUser(
    JOIN_SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER_DISMISSED
  );
};
export const useSeenNewSuggestedWorkspaceWorkspaceSwitcher = (): any => {
  return useStoredStateForUser(SEEN_SUGGESTED_WORKSPACE_WORKSPACE_SWITCHER);
};
