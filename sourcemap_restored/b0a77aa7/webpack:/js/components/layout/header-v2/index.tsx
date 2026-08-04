import {
  SMALL_DESKTOP_MAX_WIDTH,
  SMALL_TABLET_MIN_WIDTH,
} from '@js/constants/breakpoints';

import cn from 'classnames';
import { AtlassianManaged } from '@js/common/atlassian-workspace';
import {
  LoggedInOnly,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { AtlassianHeaderButton } from '@js/common/header/atlassian-header-button';
import { HelpBubble } from '@js/common/help-bubble';
import { MediaQuery, useIsSidebarCollapsedOrStacked } from '@js/common/layout';
import { useWideMediaGrid } from '@js/common/media-grid';
import { useShouldHideLeftNav } from '@js/common/useShouldHideLeftNav';
import { HeaderUpgradeButton } from '@js/components/HeaderUpgradeButton';
import { MemoizedContactSalesButton } from '@js/components/contact-sales-button';
import SearchBar from '@js/components/destination-search/search-bar';
import { DownloadProgressAsync as DownloadProgress } from '@js/components/download-progress/async';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { OwnerInfoAsync as OwnerInfo } from '@js/common/owner-info/async';
import { ProfileBubb } from '@js/components/profile-bubble';
import UpgradePrompt from '@js/components/profile-bubble/upgrade-prompt';

import { useShouldSeeNavHeaderContactSalesCta } from '@js/hooks/contactSales';
import { useIncentivesPage } from '@js/hooks/experiments/useIncentivesPage';
import { useOnDismissFtux } from '@js/hooks/ftux';
import { useIsAtlassianManagedWorkspace } from '@js/hooks/useIsAtlassianManagedWorkspace';
import { useExpVizCohesionShareTitle } from '@js/hooks/experiments/useExpVizCohesionShareTitle';

import { useStorageIncentiveEligibility } from '@js/hooks/useStorageIncentiveEligibility';
import { useStoreHeightInCssVariable } from '@js/hooks/useStoreHeightInCssVariable';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import debounce from 'lodash/debounce';

import { useTitleBar } from '@js/pages/share/common';
import { RichTitleBar } from '@js/pages/share/common/title-bar';
import { useUpgradeBanner } from '@js/pages/share/upgrade-banner/useUpgradeBanner';
import React, { useEffect, useRef, useState } from 'react';

import { hasParam } from '@js/utilities/url';

import {
  Arrange,
  Button,
  Container,
  IconButton,
  Logo,
  Spacer,
  Split,
  SplitSection,
  useMedia,
} from '@loomhq/lens';
import { SvgMenu } from '@loomhq/lens/icons/menu';
import { ORG_ROLE_ADMIN } from '@loomhq/shared-utilities/constants/organizationRoles';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { useNavigationMenuToggle } from '@js/common/navigation/use-navigation-menu-toggle';
import HeaderPortalDestination from '@js/components/layout/header/portal-destination';
import { useNavigationStore } from '@js/components/layout/navigation/navigation-store';

import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import { SharePageOnboardingWelcomeFtux } from './SharePageOnboardingWelcomeFtux';
import { AnonymousHeader } from './anonymous-header';
import styles from './styles.module.less';

type HeaderV2Props = {
  setNavBarIsOpenMobile: (toggleValue?: boolean) => void;
  isShareVideo: boolean;
};

type SharePageHeaderProps = {
  showVideoLimitsInHeader: boolean;
  isCollapsed: boolean;
  showVideoTitleAboveVideo?: boolean;
  isMobile: boolean;
  setNavBarIsOpenMobile: (toggleValue?: boolean) => void;
};

type HeaderBarProps = {
  showVideoLimitsInHeader: boolean;
  isMobile: boolean;
  setNavBarIsOpenMobile: (toggleValue?: boolean) => void;
  showVideoTitleAboveVideo?: boolean;
  isShareVideo?: boolean;
};

type TitleAreaProps = {
  showOwnerInfoTop: boolean;
  isExpVizCohesionShareTitle?: boolean;
};

const TitleArea = ({
  showOwnerInfoTop,
  isExpVizCohesionShareTitle,
}: TitleAreaProps) => {
  return (
    <>
      {/* If undefined or true, then don't show title */}
      {isExpVizCohesionShareTitle === false ? (
        <li
          className={cn(styles.creatorTitleBar, showOwnerInfoTop && `pl:large`)}
        >
          <Arrange
            gap="2px"
            autoFlow="row"
            justifyContent="stretch"
            width="100%"
          >
            <RichTitleBar />
            {showOwnerInfoTop ? <OwnerInfo /> : null}
          </Arrange>
        </li>
      ) : (
        // TODO for Manda: Remove once experiment is over because we should not have an empty li element
        <li className="width:full shrink:1" />
      )}
    </>
  );
};

const ProfileBubbleArea = () => {
  return (
    <Split gap="medium" wrap="nowrap">
      <SplitSection>
        <ProfileBubb />
      </SplitSection>
    </Split>
  );
};

const LogoArea = ({
  isExpVizCohesionShareTitle,
}: {
  isExpVizCohesionShareTitle?: boolean;
}) => {
  if (isExpVizCohesionShareTitle === true) {
    return <Logo brand="apptile" maxWidth={12} />;
  } else if (isExpVizCohesionShareTitle === false) {
    return <Logo brand="apptile" variant="symbol" maxWidth={5.5} />;
  }
  null;
};

const HeaderBar = ({
  showVideoLimitsInHeader,
  isMobile,
  setNavBarIsOpenMobile,
  showVideoTitleAboveVideo = false,
  isShareVideo = false,
}: HeaderBarProps): JSX.Element => {
  const onDismissFtux = useOnDismissFtux();
  const { isInEditMode: isTitleInEditMode } = useTitleBar();

  const selectedWorkspace = useGetSelectedWorkspace();
  const shouldShowIncentives = useIncentivesPage();
  const showOwnerInfoTop = showVideoTitleAboveVideo && !isTitleInEditMode;

  const { toggleSidebar } = useNavigationStore();
  const { setUserClickedNavToggle } = useNavigationMenuToggle();

  const hideSideNav = useShouldHideLeftNav();

  useWideMediaGrid();

  const { show: showingUpgradeBanner } = useUpgradeBanner();

  const [displayContactSalesCta] = useShouldSeeNavHeaderContactSalesCta();
  const shouldSeeContactSalesCtaInHeader =
    displayContactSalesCta &&
    (isMobile && isShareVideo ? false : true) &&
    selectedWorkspace?.memberRole === ORG_ROLE_ADMIN;

  const onToggleClick = () => {
    setUserClickedNavToggle();
    onDismissFtux(UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX);

    toggleSidebar();
  };
  const isUserLoggedIn = useIsCurrentUserLoggedIn();
  const showWelcomeFtux = hasParam('show_welcome_toast') && isUserLoggedIn;

  const isAtlassianManagedWorkspace = useIsAtlassianManagedWorkspace();
  const { isExpVizCohesionShareTitle } = useExpVizCohesionShareTitle();

  return (
    <>
      <DownloadProgress />
      <Container
        paddingY={isExpVizCohesionShareTitle === true ? 'xsmall' : '10px'}
      >
        <Button
          variant="primary"
          htmlTag="a"
          href="#mainContent"
          // eslint-disable-next-line jsx-a11y/tabindex-no-positive
          tabIndex={1}
          className={cn(styles.skipNavigation)}
        >
          Skip to content
        </Button>
        <ul
          className={cn(
            styles.headerBar,
            showVideoTitleAboveVideo && `flex pr:large`
          )}
        >
          <li className={cn(styles.headerBarItem)}>
            <div className={cn(styles.mobileMenu, 'mr:auto')}>
              <Spacer right="small">
                <IconButton
                  altText="Toggle library navigation"
                  icon={<SvgMenu />}
                  onClick={() => setNavBarIsOpenMobile(true)}
                />
              </Spacer>
            </div>
          </li>
          {showVideoTitleAboveVideo ? (
            <>
              {hideSideNav ? (
                <>
                  <li className="shrink:0">
                    <Spacer left="medium" right="12px">
                      <IconButton
                        altText="Main nav"
                        icon={<SvgMenu />}
                        className={cn({
                          [styles.highlight]: showWelcomeFtux,
                        })}
                        onClick={() => onToggleClick()}
                      />
                    </Spacer>
                  </li>
                  {showWelcomeFtux && (
                    <FtuxWrapper
                      name={UserPropertyEnum.SHARE_PAGE_ONBOARDING_WELCOME_FTUX}
                    >
                      <SharePageOnboardingWelcomeFtux />
                    </FtuxWrapper>
                  )}
                  <li className="shrink:0">
                    <a href="/">
                      <LogoArea
                        isExpVizCohesionShareTitle={isExpVizCohesionShareTitle}
                      />
                    </a>
                  </li>
                </>
              ) : null}
              <TitleArea
                showOwnerInfoTop={showOwnerInfoTop}
                isExpVizCohesionShareTitle={isExpVizCohesionShareTitle}
              />
            </>
          ) : (
            <li
              className={cn(
                styles.searchBar,
                styles.headerBarItem,
                'py:small md:py:medium'
              )}
            >
              <SearchBar />
            </li>
          )}

          <li
            className={cn(
              styles.headerBarItem,
              'py:medium items:center flex',
              hideSideNav && 'pr:medium'
            )}
          >
            <HeaderPortalDestination />
          </li>
          {showVideoLimitsInHeader && !isMobile && !hideSideNav ? (
            showVideoTitleAboveVideo ? (
              <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MAX_WIDTH}px)`}>
                <li
                  className={cn(
                    styles.headerBarItem,
                    'shrink:0',
                    shouldShowIncentives && 'pl:medium'
                  )}
                >
                  <UpgradePrompt
                    minimal
                    shouldShowIncentives={shouldShowIncentives}
                  />
                </li>
              </MediaQuery>
            ) : (
              <li
                className={cn(
                  styles.headerBarItem,
                  'shrink:0',
                  shouldShowIncentives && 'pl:medium'
                )}
              >
                <UpgradePrompt
                  minimal
                  shouldShowIncentives={shouldShowIncentives}
                />
              </li>
            )
          ) : null}
          {!hideSideNav && (
            <MediaQuery query={`(min-width: ${SMALL_TABLET_MIN_WIDTH}px)`}>
              <AtlassianManaged
                LoomUI={
                  shouldSeeContactSalesCtaInHeader || !showingUpgradeBanner ? (
                    <li className={cn(styles.headerBarItem, 'pl:medium')}>
                      {shouldSeeContactSalesCtaInHeader ? (
                        <MemoizedContactSalesButton />
                      ) : !showingUpgradeBanner ? (
                        <HeaderUpgradeButton />
                      ) : null}
                    </li>
                  ) : null
                }
                AtlassianUI={
                  isAtlassianManagedWorkspace ? (
                    <li className={cn(styles.headerBarItem, 'pl:medium')}>
                      <AtlassianHeaderButton />
                    </li>
                  ) : null
                }
              />
            </MediaQuery>
          )}
          {showVideoTitleAboveVideo ? (
            <li className={styles.headerBarItem}>
              <ProfileBubbleArea />
            </li>
          ) : null}
        </ul>
      </Container>
    </>
  );
};

const useIsScrolledBelowHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isStacked: isSidebarBelowVideo } = useIsSidebarCollapsedOrStacked();
  // if sidebar is to the right, get videoAndMetadataWrapper scrolling state
  // if sidebar is stacked, get main scrolling state
  const videoContainer = document.getElementById('videoAndMetadataWrapper');

  const scrollContainer = isSidebarBelowVideo ? document : videoContainer;

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const scrollTop = isSidebarBelowVideo
        ? window.scrollY
        : videoContainer?.scrollTop;

      setIsScrolled(scrollTop !== 0);
    }, 20);

    scrollContainer?.addEventListener('scroll', scrollHandler);

    return () => {
      scrollContainer?.removeEventListener('scroll', scrollHandler);
    };
  });

  return isScrolled;
};

const SharePageHeader = ({
  showVideoTitleAboveVideo,
  isCollapsed,
  showVideoLimitsInHeader,
  isMobile,
  setNavBarIsOpenMobile,
}: SharePageHeaderProps): JSX.Element => {
  const isScrolledBelowHeader = useIsScrolledBelowHeader();

  const showBottomBoxShadow = !isMobile && isScrolledBelowHeader;

  return (
    <>
      <div
        className={cn(styles.headerDisplay, {
          [styles.withoutTitle]: !showVideoTitleAboveVideo,
          [styles.withBottomBoxShadow]: showBottomBoxShadow,
        })}
      >
        <div
          className={cn(
            showVideoTitleAboveVideo
              ? styles.headerTitleWidth
              : styles.headerWidth,
            isCollapsed ? styles.collapsedSidebar : styles.expandedSidebar
          )}
        >
          <HeaderBar
            showVideoLimitsInHeader={showVideoLimitsInHeader}
            isMobile={isMobile}
            isShareVideo={true}
            setNavBarIsOpenMobile={setNavBarIsOpenMobile}
            showVideoTitleAboveVideo={showVideoTitleAboveVideo}
          />
        </div>
      </div>
      {/* TODO(next author): Update these HRs into a border-top or bottom instead */}
      {isMobile ? (
        <hr role="presentation" className={styles.divider} />
      ) : (
        // eslint-disable-next-line @atlassian/a11y/seperator-no-presentation-role
        <hr
          className={cn(styles.divider, {
            [styles.light]: !isScrolledBelowHeader,
            [styles.transparent]: showBottomBoxShadow,
          })}
        />
      )}
    </>
  );
};

export const HeaderV2 = ({
  setNavBarIsOpenMobile,
  isShareVideo,
}: HeaderV2Props): JSX.Element => {
  const { isCollapsed } = useNavigationStore();
  const ref = useRef<HTMLHeadElement>(null);

  useStoreHeightInCssVariable(ref, '--header-height');

  // Website Storage Incentives
  const showVideoLimitsInHeader = useStorageIncentiveEligibility();
  const isMobile = useMedia(['(max-width: 767px)'], [true], false);
  const isOnLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  const showVideoTitleAboveVideo = isOnLargeTabletOrDesktop && isShareVideo;

  return (
    <LoggedInOnly
      orElse={() => (
        <AnonymousHeader setNavBarIsOpenMobile={setNavBarIsOpenMobile} />
      )}
    >
      <header
        className={cn(
          isCollapsed ? styles.header : styles.headerSideBarExpanded,
          isShareVideo ? styles.shareVideoHeader : styles.destinationHeader,
          'sticky top:0 bgc:background'
        )}
        ref={ref}
      >
        {isShareVideo ? (
          <SharePageHeader
            showVideoTitleAboveVideo={showVideoTitleAboveVideo}
            isCollapsed={isCollapsed}
            showVideoLimitsInHeader={showVideoLimitsInHeader}
            isMobile={isMobile}
            setNavBarIsOpenMobile={setNavBarIsOpenMobile}
          />
        ) : (
          <div>
            <HeaderBar
              showVideoLimitsInHeader={showVideoLimitsInHeader}
              isMobile={isMobile}
              setNavBarIsOpenMobile={setNavBarIsOpenMobile}
            />
          </div>
        )}
        {!showVideoTitleAboveVideo ? (
          <>
            <div id="profileBubble" className={styles.profileBubble}>
              <div
                className={
                  isCollapsed
                    ? styles.bubbleBorderCollapsed
                    : styles.bubbleBorderExpanded
                }
              />
              <div className="p:medium flex">
                <ProfileBubbleArea />
              </div>
            </div>
            <HelpBubble />
          </>
        ) : null}
      </header>
    </LoggedInOnly>
  );
};
