import { devToolsEnabled } from '@js/constants/devtools';
import { SHOW_JOIN_NEW_WORKSPACE_BANNER } from '@js/constants/localStorage';

import classNames from 'classnames';

import { BannerContainer } from '@js/common/banners';
import { ConfirmationToast } from '@js/common/confirmation-toast';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { applyColorTheme } from '@js/common/themes';
import { useShouldHideLeftNav } from '@js/common/useShouldHideLeftNav';

import { useDevTools } from '@js/components/devtools/devtools-store';
import ErrorBar from '@js/components/error-bar';

import DndProvider from '@js/components/loom-dnd-provider';

import { ProfileMenuProvider } from '@js/contexts/ProfileMenuContext';
import { useMatchMobileOrSmallTablet } from '@js/hooks/useMatchMedia';
import { useStoreHeightInCssVariable } from '@js/hooks/useStoreHeightInCssVariable';
import React, {
  useState,
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import {
  getLocalStorageKey,
  clearLocalStorageKey,
} from '@js/utilities/localStorage';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { SuccessMarkers } from '@js/utilities/rum/constants';

import { SuccessMarker } from '@js/utilities/rum/markers';

import { Backdrop, Toast, Text } from '@loomhq/lens';

import { AnonymousHeader } from './header/anonymous-header';
import HeaderPortalProvider from './header/portal-provider';
import { HeaderV2 } from './header-v2';
import { Navigation } from './navigation';
import { useNavigationStore } from './navigation/navigation-store';

import './index.css';

const DevToolsModal = reactLazyRetry(
  () =>
    import(/* webpackChunkName: "DevToolsModal" */ '../devtools/DevToolsModal')
);

const AnonymousNavigation = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "AnonymousNavigation" */ './anonymous-navigation'
  ).then(module => ({ default: module.AnonymousNavigation }))
);

type LayoutProps = {
  anonymousMainContentHasFullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  forceAnonNav?: boolean;
  isShareVideo?: boolean;
  mainContentHasFullWidth?: boolean;
  useAnonymousNavigation?: boolean;
  videoId?: string | null;
  header?: React.ReactNode | null;
};

export const Layout = ({
  anonymousMainContentHasFullWidth = false,
  children,
  className = undefined,
  forceAnonNav = false,
  isShareVideo = false,
  mainContentHasFullWidth = false,
  useAnonymousNavigation = false,
  videoId = null,
  header,
}: LayoutProps): JSX.Element | null => {
  const { shouldShowLoomBranding, brandLogoPath } = useCustomBranding({
    videoId,
  });

  const bannerRef = useRef<HTMLDivElement>(null);

  const isMobileOrSmallTablet = useMatchMobileOrSmallTablet();

  const navState = useNavigationStore();

  const showDevToolsModal = useDevTools(state => state.showDevToolsModal);
  const navBarIsOpenMobile = navState.isDrawerOpen;

  const navBarState = {
    isCollapsed: navState.isCollapsed,
  };

  const isLoggedIn = useIsCurrentUserLoggedIn();

  const setNavBarIsOpenMobile: (toggleValue?: boolean) => void = useCallback(
    (newValue = false) => {
      navState.toggleDrawer(newValue);
    },
    [navState]
  );

  const readyToLoad = isLoggedIn !== undefined;

  const showAnonNav =
    (!isLoggedIn && shouldShowLoomBranding && isMobileOrSmallTablet) ||
    forceAnonNav;

  const hideSideNav = useShouldHideLeftNav();

  const [isJoinNewWorkspaceBannerOpen, setIsJoinNewWorkspaceBannerOpen] =
    useState(false);
  const [workspaceName, setWorkspaceName] = useState(null);

  const bannerValue = getLocalStorageKey(SHOW_JOIN_NEW_WORKSPACE_BANNER);

  useStoreHeightInCssVariable(bannerRef, '--banner-height');

  // Start visual refresh QA

  applyColorTheme();

  // End visual refresh QA

  useEffect(() => {
    if (!bannerValue) {
      return;
    }

    setIsJoinNewWorkspaceBannerOpen(true);
    setWorkspaceName(bannerValue);
    clearLocalStorageKey(SHOW_JOIN_NEW_WORKSPACE_BANNER);
  }, [bannerValue]);

  if (!readyToLoad) {
    return null;
  }

  return (
    <>
      <DndProvider>
        <HeaderPortalProvider>
          <ProfileMenuProvider>
            {useAnonymousNavigation ? (
              <>
                <Suspense fallback={null}>
                  {/* TODO(WAP): Use LoggedOutOnly component when ready */}
                  {showAnonNav ? (
                    <AnonymousNavigation
                      navBarIsOpenMobile={navBarIsOpenMobile}
                      setNavBarIsOpenMobile={setNavBarIsOpenMobile}
                    />
                  ) : (
                    <SuccessMarker name={SuccessMarkers.Navigation} />
                  )}
                </Suspense>

                <div>
                  <ErrorBar />

                  <AnonymousHeader
                    brandLogoPath={brandLogoPath}
                    setNavBarIsOpenMobile={setNavBarIsOpenMobile}
                    shouldShowLoomBranding={shouldShowLoomBranding}
                    showAnonNav={showAnonNav}
                    videoId={videoId}
                  />

                  <div
                    className={classNames('mainContentSection', {
                      hasFullWidth: !anonymousMainContentHasFullWidth,
                      anonUser: !isLoggedIn,
                    })}
                  >
                    {children}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Navigation
                  navBarIsOpenMobile={navBarIsOpenMobile}
                  isShareVideo={isShareVideo}
                />
                <div
                  className={
                    hideSideNav === false
                      ? classNames('mainContent', className, {
                          navBarIsCollapsed: navBarState.isCollapsed,
                        })
                      : undefined
                  }
                >
                  <div
                    className={
                      hideSideNav && !navBarState.isCollapsed
                        ? classNames('navOverlay')
                        : undefined
                    }
                  />

                  <div id="topBanner" ref={bannerRef}>
                    <ErrorBar />
                    {/* PLACE ALL GLOBAL BANNERS IN THE BANNERCONTAINER. */}
                    <BannerContainer />
                  </div>
                  <>
                    {header || (
                      <HeaderV2
                        setNavBarIsOpenMobile={setNavBarIsOpenMobile}
                        isShareVideo={isShareVideo}
                      />
                    )}
                    <div
                      data-testid="main-content-section-loggedin"
                      className={classNames('mainContentSection', {
                        hasFullWidth: mainContentHasFullWidth,
                      })}
                      id="mainContent"
                    >
                      {children}
                    </div>

                    <Toast
                      isOpen={isJoinNewWorkspaceBannerOpen}
                      onCloseClick={() =>
                        setIsJoinNewWorkspaceBannerOpen(false)
                      }
                      duration="long"
                    >
                      <Text>
                        You joined {workspaceName}! Start recording Looms for
                        your team 🎉
                      </Text>
                    </Toast>
                    <ConfirmationToast />
                  </>
                </div>
              </>
            )}
          </ProfileMenuProvider>
        </HeaderPortalProvider>
      </DndProvider>
      <Backdrop
        isOpen={navBarIsOpenMobile}
        zIndex={5}
        onClick={() => setNavBarIsOpenMobile(false)}
      />
      {devToolsEnabled && showDevToolsModal ? (
        <Suspense fallback={null}>
          <DevToolsModal />
        </Suspense>
      ) : null}
    </>
  );
};
