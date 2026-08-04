// First-Time User Experience (FTUX)
import {
  STORAGE_INCENTIVES_FTUX_BUTTON_DISMISSED,
  STORAGE_INCENTIVES_INVITE_MODAL_BANNER_DISMISSED,
  STORAGE_INCENTIVE_FTUX_INVITE_SENT,
  STORAGE_INCENTIVE_FTUX_VISITED_TRACK_TAB,
  MOVE_FOLDER_INTO_SPACE_BANNER_MINIMIZED,
} from '@js/constants/localStorage';

import { useStoredStateForUser } from './utils';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useStorageIncentivesFTUXButtonState = (): [
  boolean,
  (val?: boolean) => void,
] => {
  return useStoredStateForUser(STORAGE_INCENTIVES_FTUX_BUTTON_DISMISSED);
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useStorageIncentiveFTUXInviteSent = (): [
  boolean,
  (val?: boolean) => void,
] => {
  return useStoredStateForUser(STORAGE_INCENTIVE_FTUX_INVITE_SENT);
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useStroageIncentiveFTUXVisitedTrackTab = (): [
  boolean,
  (val?: boolean) => void,
] => {
  return useStoredStateForUser(STORAGE_INCENTIVE_FTUX_VISITED_TRACK_TAB);
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useStorageIncentiveFTUXInviteModalBannerDismissed = (): [
  boolean,
  (val?: boolean) => void,
] => {
  return useStoredStateForUser(
    STORAGE_INCENTIVES_INVITE_MODAL_BANNER_DISMISSED
  );
};

export const useMoveFolderIntoSpaceBannerMinimizedLocalStorageState = (): [
  boolean,
  (val?: boolean) => void,
] => {
  return useStoredStateForUser(MOVE_FOLDER_INTO_SPACE_BANNER_MINIMIZED);
};
