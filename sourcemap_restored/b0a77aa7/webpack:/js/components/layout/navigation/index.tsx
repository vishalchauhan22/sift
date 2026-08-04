import { NAVIGATION_ITEM_CLICKED } from '@js/constants/events';

import { PREFER_NAV_COLLAPSED } from '@js/constants/localStorage';

import cn from 'classnames';

import {
  ErrorBoundary,
  SilentErrorBoundary,
} from '@js/common/error-management';
import * as logger from '@js/utilities/loggerx';
import { FollowsSection } from '@js/common/follows/follows-section';
import { useShouldHideLeftNav } from '@js/common/useShouldHideLeftNav';

import { PersistentRecordButtonAsync as PersistentRecordButton } from '@js/components/record-button/persistent-record-button-async';
import { useIncentivesPage } from '@js/hooks/experiments/useIncentivesPage';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { usePersistentRecordAllowed } from '@js/hooks/sdk';
import React, {
  Suspense,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { SuccessMarkers } from '@js/utilities/rum/constants';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { SuccessMarker } from '@js/utilities/rum/markers';

import {
  Arrange,
  Container,
  IconButton,
  Logo,
  Spacer,
  Tooltip,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgMenuHide } from '@loomhq/lens/icons/menu-hide';
import { SvgMenuShow } from '@loomhq/lens/icons/menu-show';

import { ORG_ROLE_VIEWER } from '@loomhq/shared-utilities/constants/organizationRoles';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import {
  useMatchMedia,
  useMatchMobileOnly,
  useMatchTabletOnly,
} from '@js/hooks/useMatchMedia';
import useOnClickOutside from '@js/hooks/useOnClickOutside';

import { useNavigationMenuToggle } from '@js/common/navigation/use-navigation-menu-toggle';
import * as analytics from '@js/utilities/analytics';
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

import { WorkspaceSelector } from '../header/workspace-selector';

import Divider from './divider';
import { useNavigationStore } from './navigation-store';
import {
  SettingsButtonWithFtux,
  MyLibraryButton,
  HomeButton,
  MeetingsButton,
  NotificationsButton,
  WatchLaterButton,
  HistoryButton,
  EarnFreeVideosButton,
  PlaygroundButton,
  AdminManagementButton,
} from './navigationItems';
import { CALLOUTS, SidebarCallout, useSidebarCallout } from './sidebar-callout';
import { Spaces } from './spaces';
import styles from './styles.module.less';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';

const RecordButton = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "RecordButton" */ '@js/components/record-button'
  ).then(module => ({ default: module.RecordButton }))
);

// Calculates width of logo for height to be 32px
const combinedLogoWidth = (32 * 100) / 30 / 8;

const PADDING_LEFT = '245px';

export const navBarAnimationDuration = 300;

const getDisplayMode = (isCollapsed: boolean, isCompact: boolean) => {
  if (isCollapsed) {
    return 'COLLAPSED';
  } else if (isCompact) {
    return 'COMPACT';
  }
  return 'LARGE';
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const getNavbarZIndex = (
  isCollapsed: boolean,
  hideSideNav: boolean,
  isMobile: boolean
) => {
  if (!isCollapsed && isMobile) {
    // there is a div container that has a z-index of 5
    // in order for this component to take priority over
    // we need to have one higher
    return 6;
  }

  if (hideSideNav) {
    return 103;
  }
  return 4;
};

type NavigationProps = {
  readonly navBarIsOpenMobile: boolean;
};

function NavigationWithoutFeatureWrapper({
  navBarIsOpenMobile,
}: NavigationProps): JSX.Element {
  const isCompact = useMatchMedia('(max-height: 799px)');
  const isMobile = useMatchMobileOnly();
  const isTablet = useMatchTabletOnly();
  const { isCollapsed, isDrawerOpen, toggleDrawer, toggleSidebar } =
    useNavigationStore();
  const navRef = useRef(null);
  const sidebarCallout = useSidebarCallout();
  const { featureLoadedRef } = useFeatureWrapper(navRef);

  const isChecklistShown =
    sidebarCallout === CALLOUTS.GET_STARTED_CHECKLIST_CALLOUT;

  const { selectedWorkspace: workspace } = useGetWorkspaceMemberships();
  const hideSideNav = useShouldHideLeftNav();

  const onClickOutside = useCallback(() => {
    if ((!isCollapsed && isTablet) || (!isCollapsed && hideSideNav)) {
      toggleSidebar(true, { updatePreference: false });
    }
  }, [toggleSidebar, isCollapsed, isTablet, hideSideNav]);

  const shouldShowIncentives = useIncentivesPage();

  const showPlayground = useFeatureFlagValue(
    FEATURE_GATES.LOOM_PLAYGROUND,
    ControlType.STATSIG_FEATURE_GATE
  );

  useEffect(
    () => {
      const preferNavCollapsed = getLocalStorageKey(PREFER_NAV_COLLAPSED);

      if (!hideSideNav) {
        if (preferNavCollapsed === null) {
          // set the key initially
          setLocalStorageKey(PREFER_NAV_COLLAPSED, isCollapsed);
        } else if (preferNavCollapsed === false) {
          // if a user doesn't prefer the side nav to be collapsed then we toggle the sidebar
          toggleSidebar(false);
        }
      } else if (hideSideNav) {
        // if a user falls into the hideSideNav condition (which means at the very least they are on the share page)
        // and if the side nav is not collapsed, then collapse the side nav
        toggleSidebar(true);
      }
    }, // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hideSideNav]
  );

  useOnClickOutside(navRef, onClickOutside);

  const [animateLogo, setAnimateLogo] = useState(false);

  const handleOnClick = () => {
    setLocalStorageKey(PREFER_NAV_COLLAPSED, !isCollapsed);
    toggleSidebar();
    // animate collapsedNavLogo smaller when Show / Hide navigation is clicked
    setAnimateLogo(true);
  };

  const displayMode = getDisplayMode(isCollapsed, isCompact);

  const persistentRecordAllowed = usePersistentRecordAllowed();

  // checking if memberRole exists first because the value is initially undefined before being set and
  // it will cause the button to flash if the user's role is viewer
  const isNotViewer = Boolean(
    workspace?.memberRole && workspace.memberRole !== ORG_ROLE_VIEWER
  );

  const zIndex = getNavbarZIndex(isCollapsed, hideSideNav, isMobile);

  const { userClickedNavToggle } = useNavigationMenuToggle();

  // Controls whether or not we show the invite tooltip used in the invite-callout
  // and dropdown-header components, which are respectively children of the
  // sidebar-callout and workspace-selector components
  const [showInviteToolTip, setShowInviteToolTip] = useState(false);

  const collapsedStatusForMenuButton = isCollapsed && !hideSideNav;
  const isMobileCollapsedNav = isMobile && !navBarIsOpenMobile;

  return (
    <div
      ref={featureLoadedRef}
      style={{ zIndex }}
      data-navigation-state={isCollapsed ? 'collapsed' : 'expanded'}
      className={cn(
        styles.nav,
        styles.hasNoOverlay,
        collapsedStatusForMenuButton && styles.isCollapsed,
        isDrawerOpen && styles.isOpenMobile,
        hideSideNav && isCollapsed && styles.collapseSideNav,
        hideSideNav &&
          !isCollapsed &&
          !userClickedNavToggle &&
          styles.hideSideNav
      )}
    >
      <Container
        paddingX="small"
        paddingTop="medium"
        height="100%"
        className="flex flexDirection:column"
      >
        {isMobile && (
          <Spacer bottom="medium">
            <IconButton
              className="ml:small"
              altText="Close navigation"
              icon={<SvgClose />}
              onClick={() => toggleDrawer()}
            />
          </Spacer>
        )}

        <Container
          height={5}
          width={collapsedStatusForMenuButton ? 5 : combinedLogoWidth}
          marginBottom="medium"
          marginLeft="small"
        >
          {collapsedStatusForMenuButton && (
            <span
              className={cn(
                animateLogo
                  ? styles.collapsedNavLogoAnimate
                  : styles.collapsedNavLogo
              )}
            >
              <Logo brand="apptile" maxWidth={4.95125} variant="symbol" />
            </span>
          )}

          {(!isCollapsed || hideSideNav) && (
            <a
              href="/"
              onClick={() => {
                analytics.track(NAVIGATION_ITEM_CLICKED, {
                  primary_nav_item: 'loom_logo',
                });
              }}
              aria-label="Loom home"
            >
              <Logo brand="apptile" maxWidth={12.75} />
            </a>
          )}
        </Container>
        {!hideSideNav && (
          <div className={styles.toggleButton}>
            <Tooltip
              isInline={false}
              content={`${isCollapsed ? 'Show' : 'Hide'} navigation`}
              placement="rightCenter"
              // Without this tab index, this element appears twice in tab navigation
              tabIndex={-1}
            >
              <IconButton
                altText={`${isCollapsed ? 'Show' : 'Hide'} navigation`}
                icon={isCollapsed ? <SvgMenuShow /> : <SvgMenuHide />}
                onClick={() => handleOnClick()}
              />
            </Tooltip>
          </div>
        )}

        <div className={styles.workspaceSelectorSection}>
          <ErrorBoundary
            feature={Feature.Navigation}
            onError={error => {
              logger.error(
                error,
                {
                  message: 'Error loading Workspace Selector',
                  workspaceId: workspace?.id,
                },
                {
                  feature: Feature.Navigation,
                }
              );
            }}
          >
            <WorkspaceSelector
              isCompact={isCollapsed}
              showInviteToolTip={showInviteToolTip}
              setShowInviteToolTip={setShowInviteToolTip}
            />
          </ErrorBoundary>
        </div>
        <nav className={cn(styles.menuList, 'py:large')} aria-label="side">
          <Arrange autoFlow="row" gap="2px" columns={['1fr']}>
            <Arrange
              autoFlow="row"
              gap="2px"
              columns={['1fr']}
              id="intercom-destination-menu"
              htmlTag="ul"
            >
              <li>
                <HomeButton
                  isCollapsed={collapsedStatusForMenuButton}
                  isMobileCollapsedNav={isMobileCollapsedNav}
                />
              </li>

              <SuccessMarker name={SuccessMarkers.Navigation} />

              <li>
                <MyLibraryButton
                  isCollapsed={collapsedStatusForMenuButton}
                  isMobileCollapsedNav={isMobileCollapsedNav}
                />
              </li>

              <li>
                <MeetingsButton
                  isMobileCollapsedNav={isMobileCollapsedNav}
                  isCollapsed={collapsedStatusForMenuButton}
                  isNotViewer={isNotViewer}
                />
              </li>

              <li>
                <NotificationsButton
                  isCollapsed={collapsedStatusForMenuButton}
                  isMobileCollapsedNav={isMobileCollapsedNav}
                />
              </li>

              <li>
                <WatchLaterButton
                  isCollapsed={collapsedStatusForMenuButton}
                  isMobileCollapsedNav={isMobileCollapsedNav}
                />
              </li>

              <li>
                <HistoryButton
                  isCollapsed={collapsedStatusForMenuButton}
                  isMobileCollapsedNav={isMobileCollapsedNav}
                />
              </li>

              {showPlayground ? (
                <li>
                  <PlaygroundButton
                    isCollapsed={collapsedStatusForMenuButton}
                    isMobileCollapsedNav={isMobileCollapsedNav}
                  />
                </li>
              ) : null}
            </Arrange>

            <EarnFreeVideosButton
              isCollapsed={collapsedStatusForMenuButton}
              isMobileCollapsedNav={isMobileCollapsedNav}
              shouldShowIncentives={Boolean(shouldShowIncentives)}
            />

            <AdminManagementButton
              isCollapsed={collapsedStatusForMenuButton}
              isMobileCollapsedNav={isMobileCollapsedNav}
            />

            <SettingsButtonWithFtux
              isCollapsed={collapsedStatusForMenuButton}
            />

            <Divider />
            <Spaces
              isCollapsed={collapsedStatusForMenuButton}
              isMobile={isMobile}
              navBarIsOpenMobile={navBarIsOpenMobile}
            />

            <Divider />
            <FollowsSection
              isCollapsed={collapsedStatusForMenuButton}
              isMobile={isMobile}
              navBarIsOpenMobile={navBarIsOpenMobile}
            />
          </Arrange>
        </nav>

        <div
          style={{
            paddingLeft:
              hideSideNav && isCollapsed && isChecklistShown
                ? PADDING_LEFT
                : '0px',
          }}
          className="flex flexDirection:column grow:1 justify:flexEnd"
        >
          {isNotViewer && persistentRecordAllowed && !isChecklistShown ? (
            <>
              <SidebarCallout
                displayMode={displayMode}
                setShowInviteToolTip={setShowInviteToolTip}
              />
              <Container
                position="relative"
                left="calc(-1 * var(--lns-space-small))"
                paddingTop="small"
                paddingBottom={1.5}
              >
                <SilentErrorBoundary
                  feature={Feature.ExtensionRecorder}
                  name="Navigation Persistent Record Button"
                >
                  <Suspense fallback={null}>
                    <RecordButton>
                      <PersistentRecordButton
                        isCollapsed={isCollapsed}
                        hideSideNav={hideSideNav}
                      />
                    </RecordButton>
                  </Suspense>
                </SilentErrorBoundary>
              </Container>
            </>
          ) : (
            <SidebarCallout
              displayMode={displayMode}
              setShowInviteToolTip={setShowInviteToolTip}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export const Navigation = (props: NavigationProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.Navigation}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <NavigationWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
