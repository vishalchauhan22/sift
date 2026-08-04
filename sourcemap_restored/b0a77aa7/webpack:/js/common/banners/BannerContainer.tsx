import React, { useState } from 'react';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { LegacyZoomIntegrationDisabledBannerAsync } from '@js/common/calendar-integrations/common';

import { UpgradeBanner } from '@js/pages/share/upgrade-banner';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { AtlassianMergeAccountBanner } from './atlassian-merge-account-banner';
import { DeletionPendingBanner } from './deletion-pending-banner';
import { GlobalBillingBannerAsync } from './global-billing-banner/async';
import { GlobalContentLimitBanner } from './global-content-limit-banner';
import { MemberVideoLimitBanner } from './member-video-limit-banner';
import { UsageBasedBanner } from './usage-based-banner';
import { WorkspaceContentLimitBanner } from './workspace-content-limit-banner';
import { IdentityMigrationBanner } from './identity-migration-banner';
// In order to not have duplicative banners stack, this component manages the banners by only showing the first eligible banner.
// The order of the banners is critical. Marketing/upgrade banners should be shown last.
export const BannerContainerWithoutFeatureWrapper = (): JSX.Element => {
  const [activeBanner, setActiveBanner] = useState<JSX.Element | null>(null);
  // Allows us to keep the logic of the show banners individually modularised but globally affect which module to show
  const reportBannerVisibility = (
    component: JSX.Element,
    shouldShow: boolean
  ) => {
    if (shouldShow && !activeBanner) {
      setActiveBanner(component);
    }
  };

  const { featureLoadedRef } = useFeatureWrapper();

  return (
    <div ref={featureLoadedRef}>
      {/* CRITICAL BANNERS: Must be shown involving account deletion or required upgrade */}
      {!activeBanner ? (
        <DeletionPendingBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? (
        <IdentityMigrationBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? (
        <GlobalBillingBannerAsync
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? (
        <WorkspaceContentLimitBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}

      {!activeBanner ? (
        <MemberVideoLimitBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? (
        <GlobalContentLimitBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? (
        <AtlassianMergeAccountBanner
          reportBannerVisibility={reportBannerVisibility}
        />
      ) : null}
      {!activeBanner ? <LegacyZoomIntegrationDisabledBannerAsync /> : null}
      {/* ELECTIVE BANNERS: Not mandatory to show and can yield to above */}
      {!activeBanner ? (
        <UsageBasedBanner reportBannerVisibility={reportBannerVisibility} />
      ) : null}
      {/* TODO: Below banner should be moved to the share page container */}
      {/* only shown on share page */}
      {!activeBanner ? <UpgradeBanner /> : null}
      {activeBanner ? activeBanner : null}
    </div>
  );
};

export const BannerContainer = (): JSX.Element => (
  <FeatureWrapper
    feature={Feature.Banners}
    errorType={ErrorBoundaryTypes.SILENT}
    additionalLoggingValues={{ version: 'layout component' }}
  >
    <BannerContainerWithoutFeatureWrapper />
  </FeatureWrapper>
);
