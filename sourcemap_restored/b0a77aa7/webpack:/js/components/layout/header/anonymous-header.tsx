import {
  ANON_NAV_LOGIN_PAGE_CLICKED,
  GET_LOOM_CTA_CLICK,
  MOBILE_DOWNLOAD_INVITATION_BTN_DISPLAYED,
} from '@js/constants/events';

import { ROOT_PAGE } from '@js/constants/routes';

import cn from 'classnames';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';

import { MobileDownloadInvitationButton } from '@js/common/mobile-download-invitation-button';
import SignupButton from '@js/common/signup-button';
import LoginButton from '@js/components/login-button';
import { useExpMobileDownloadInvitation } from '@js/hooks/experiments/useExpMobileDownloadInvitation';
import { useStoreHeightInCssVariable } from '@js/hooks/useStoreHeightInCssVariable';
import React, { useEffect, useRef, useState } from 'react';

import { isIOS, isAndroid, isMobile } from '@js/utilities/device';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Arrange, IconButton, Spacer, Container, Logo } from '@loomhq/lens';
import { SvgMenu } from '@loomhq/lens/icons/menu';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useMatchMobileOrSmallTablet } from '@js/hooks/useMatchMedia';

import * as analytics from '@js/utilities/analytics';

import HeaderPortalDestination from './portal-destination';
import styles from './styles.module.less';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

export const headerHeight = 64;

const menuIcon = <SvgMenu />;

const LoomLogo = ({
  shouldShowLoomBranding,
  brandLogoPath,
}: {
  brandLogoPath?: string;
  shouldShowLoomBranding: boolean;
}) => {
  // Only show customLogo her if showLoomBranding is off. Otherwise, we show the custom logo in the title bar of the video
  const showCustomLogo = brandLogoPath && !shouldShowLoomBranding;

  return (
    <a href={ROOT_PAGE} className="flex items:center">
      {showCustomLogo ? (
        <img
          src={brandLogoPath}
          className={styles.customBrandLogoAnonHeader}
          alt={'Home Button'}
        />
      ) : (
        <Logo
          brand="apptile"
          maxWidth={shouldShowLoomBranding ? 12 : 4}
          variant={shouldShowLoomBranding ? 'combined' : 'symbol'}
        />
      )}
      <p className="srOnly">Loom</p>
    </a>
  );
};

type AnonymousHeaderProps = {
  brandLogoPath?: string;
  setNavBarIsOpenMobile: () => void;
  shouldShowLoomBranding: boolean;
  showAnonNav?: boolean;
  videoId: string | null;
};

const AnonymousHeaderWithoutFeatureWrapper = ({
  brandLogoPath,
  setNavBarIsOpenMobile,
  shouldShowLoomBranding,
  showAnonNav,
  videoId,
}: AnonymousHeaderProps): JSX.Element => {
  const ref = useRef<HTMLHeadElement>(null);

  // Used for tracking the first time the Mobile Download Invitation btn was displayed (prevents multiple track calls)
  const [
    mobileDownloadInviteBtnWasDisplayed,
    setMobileDownloadInviteBtnWasDisplayed,
  ] = useState<boolean>(false);

  const isLoggedIn = useIsCurrentUserLoggedIn();

  useStoreHeightInCssVariable(ref, '--header-height');

  const isMobileOrSmallTablet = useMatchMobileOrSmallTablet();
  const { featureLoadedRef } = useFeatureWrapper(ref);

  const { isExpMobileDownloadInvitation } = useExpMobileDownloadInvitation();
  const showMobileDownloadInvitation =
    isExpMobileDownloadInvitation && isMobile;
  const shouldLogMobileDownloadInviteBtnDisplayed =
    videoId &&
    showMobileDownloadInvitation &&
    !mobileDownloadInviteBtnWasDisplayed;

  const { isExpMwebCommenting } = useExpMwebCommenting();

  useEffect(() => {
    if (shouldLogMobileDownloadInviteBtnDisplayed) {
      analytics.track(MOBILE_DOWNLOAD_INVITATION_BTN_DISPLAYED, {
        isIOS,
        isAndroid,
        ...withIdentifiers(
          MOBILE_DOWNLOAD_INVITATION_BTN_DISPLAYED,
          AnalyticsEntityId.video(videoId, 'videoId')
        ),
      });
      setMobileDownloadInviteBtnWasDisplayed(true);
    }
  }, [shouldLogMobileDownloadInviteBtnDisplayed, videoId]);

  return (
    <div ref={featureLoadedRef}>
      <header
        className={cn(
          styles.header,
          !isLoggedIn && styles.anonHeader,
          isExpMwebCommenting && styles.stickyHeader
        )}
        ref={featureLoadedRef}
      >
        {/* Only show the toggle anonNav button if an anonNav exists, i.e. <768px AND showAnonNav */}
        {isMobileOrSmallTablet && showAnonNav ? (
          <Spacer right="medium" className={styles.hamburgerMenu}>
            <IconButton
              altText="Toggle library navigation"
              icon={menuIcon}
              onClick={setNavBarIsOpenMobile}
            />
          </Spacer>
        ) : null}
        {!isLoggedIn && !isMobileOrSmallTablet ? (
          <Container marginRight={'auto'}>
            <LoomLogo
              shouldShowLoomBranding={shouldShowLoomBranding}
              brandLogoPath={brandLogoPath}
            />
          </Container>
        ) : null}

        <div className="md:hidden">
          <HeaderPortalDestination />
        </div>
        <Spacer right="medium" />
        <Arrange justifyContent="space-between" gap="medium">
          <LoginButton
            size="medium"
            redirect={window.location.href}
            forceSignupLink
            tracking={{
              eventName: ANON_NAV_LOGIN_PAGE_CLICKED,
              properties: {
                source: 'layout-header',
              },
            }}
            addBorder={!isLoggedIn}
          />
          {shouldShowLoomBranding ? (
            showMobileDownloadInvitation ? (
              <MobileDownloadInvitationButton size="medium" videoId={videoId} />
            ) : (
              <SignupButton
                size="medium"
                forceSignupLink
                tracking={{
                  eventName: GET_LOOM_CTA_CLICK,
                  properties: {
                    source: 'layout-header',
                  },
                }}
              />
            )
          ) : null}
        </Arrange>
      </header>
    </div>
  );
};

export const AnonymousHeader = ({
  brandLogoPath,
  setNavBarIsOpenMobile,
  shouldShowLoomBranding,
  showAnonNav,
  videoId,
}: AnonymousHeaderProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.AnonymousHeader}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <AnonymousHeaderWithoutFeatureWrapper
        brandLogoPath={brandLogoPath}
        setNavBarIsOpenMobile={setNavBarIsOpenMobile}
        shouldShowLoomBranding={shouldShowLoomBranding}
        showAnonNav={showAnonNav}
        videoId={videoId}
      />
    </FeatureWrapper>
  );
};
