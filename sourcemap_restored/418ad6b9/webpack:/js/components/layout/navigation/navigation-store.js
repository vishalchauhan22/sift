/* eslint-disable @loomhq/loom/no-js-extension */
// eslint-disable-next-line unused-imports/no-unused-vars
import {
  DESKTOP_MIN_WIDTH,
  LARGE_TABLET_MAX_WIDTH as MOBILE_MAX_WIDTH,
} from '@js/constants/breakpoints';

import create from 'zustand';
import { persist } from 'zustand/middleware';

const mobileQuery = matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
const desktopQuery = matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);

const firstInitialState = getFirstInitialStateFromLegacy();

/** @type { UseBoundStore } */
export const useNavigationStore = create(
  persist(
    (set, get) => ({
      isDrawerOpen: false,
      preferCollapsed: firstInitialState.preferCollapsed,
      isCollapsed: firstInitialState.isCollapsed,
      toggleDrawer(isDrawerOpen = !get().isDrawerOpen) {
        return set({
          isDrawerOpen,
          isCollapsed: false,
        });
      },
      toggleSidebar(
        isCollapsed = !get().isCollapsed,
        { updatePreference = true } = {}
      ) {
        if (updatePreference) {
          return set({
            isCollapsed,
            preferCollapsed: isCollapsed,
          });
        }

        return set({
          isCollapsed,
        });
      },
    }),
    {
      name: 'navigation-sidebar-state',
      partialize: state => ({
        preferCollapsed: state.preferCollapsed,
        isCollapsed: state.isCollapsed,
      }),
    }
  )
);

onChange(mobileQuery, ({ matches }) => {
  const state = useNavigationStore.getState();

  if (matches) {
    useNavigationStore.setState({ isCollapsed: false });
  } else if (state.isDrawerOpen) {
    useNavigationStore.setState({
      isDrawerOpen: false,
      isCollapsed: state.preferCollapsed,
    });
  }
});

onChange(desktopQuery, ({ matches }) => {
  const { preferCollapsed } = useNavigationStore.getState();

  useNavigationStore.setState({
    isCollapsed: !matches || (preferCollapsed ?? false),
  });
});

function getFirstInitialStateFromLegacy() {
  const legacyDefaultCollapsed = getUserPreferenceFromLegacyState();

  return {
    preferCollapsed: legacyDefaultCollapsed,
    isCollapsed: mobileQuery.matches
      ? false
      : (legacyDefaultCollapsed ?? !desktopQuery.matches),
  };
}

function getUserPreferenceFromLegacyState() {
  // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
  // eslint-disable-next-line no-restricted-properties
  const value = localStorage?.getItem('navBar');

  if (!value?.includes(',')) {
    return true; // default collapsed state to true if there is no existing legacy state
  }

  const defaultCollapsed = value.split(',')[2];

  if (defaultCollapsed === 'true') {
    return true;
  }

  if (defaultCollapsed === 'false') {
    return false;
  }
}

function onChange(mqList, callback) {
  if (mqList.addEventListener) {
    mqList.addEventListener('change', callback);
  } else {
    mqList.addListener?.(callback);
  }
}
