import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { ADMIN_PAGE } from '@js/constants/routes';

type ProfileMenuContextType = {
  isProfileMenuOpen?: boolean;
  setIsProfileMenuOpen?: (
    isProfileMenuOpen: boolean,
    currentTargetClassName: string,
    applyInsightsStyle?: boolean
  ) => void;
  lastTargetClassName?: string;
  applyInsightsStyle?: boolean;
  hideInsightsPanel?: boolean;
  setHideInsightsPanel?: (value: boolean) => void;
};

const ProfileMenuContext = createContext<ProfileMenuContextType>({});

ProfileMenuContext.displayName = 'ProfileMenuContext';

export const ProfileMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [applyInsightsStyle, setApplyInsightsStyle] = useState(false);
  const [lastTargetClassName, setLastTargetClassName] = useState('');

  /* Hide the insights panel for administrative pages
   * such as admin
   */

  /* We store the page values in a useRef to persist
   * the values and to avoid re-renders */
  const pagesWithoutInsightsPanelRef = useRef([ADMIN_PAGE]);

  // NOTE: We have to check the window location directly because of how /admin is routed using a basepath of /admin. useLocation won't pick up the full, correct path.
  const pathname = window.location.pathname;

  // Set the initial state value based on the path above
  const [hideInsightsPanel, setHideInsightsPanel] = useState(
    pagesWithoutInsightsPanelRef.current.some(url => pathname === url)
  );

  useEffect(() => {
    const pathMatches = pagesWithoutInsightsPanelRef.current.some(url =>
      pathname.startsWith(url)
    );

    setHideInsightsPanel(pathMatches);
  }, [pathname]);

  const toggleProfileMenu = (
    openProfileMenu: boolean,
    currentTargetClassName: string,
    insightsStyle = false
  ) => {
    /** Do not update state if the event target that closes the menu is the same one that is trying to reopen it
     * This condition arises because when a target that can open the profile menu(eg: ProfileBubble); if you click on
     * it again with the intention of closing the menu; 2 click event end up being registered
     * 1. (onClickOutside on profile menu) 2. onOpen(on the target that can open the menu)
     * the clickOutside handler gets called before the onOpen handler.
     * This leads to the onOpen handler reopening the profile menu
     *
     */

    if (openProfileMenu && !isProfileMenuOpen && lastTargetClassName) {
      if (lastTargetClassName === currentTargetClassName) {
        setLastTargetClassName('');

        return;
      }
    }

    setIsProfileMenuOpen(openProfileMenu);
    setLastTargetClassName(currentTargetClassName);
    setApplyInsightsStyle(insightsStyle);
  };

  return (
    <ProfileMenuContext.Provider
      value={{
        isProfileMenuOpen,
        setIsProfileMenuOpen: toggleProfileMenu,
        lastTargetClassName,
        applyInsightsStyle,
        hideInsightsPanel,
        setHideInsightsPanel,
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
};

export const useProfileMenu = (): ProfileMenuContextType => {
  const {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    applyInsightsStyle,
    hideInsightsPanel,
    setHideInsightsPanel,
  } = useContext<ProfileMenuContextType>(ProfileMenuContext);

  return {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    applyInsightsStyle,
    hideInsightsPanel,
    setHideInsightsPanel,
  };
};
// eslint-disable-next-line import/no-default-export
export default ProfileMenuContext;
