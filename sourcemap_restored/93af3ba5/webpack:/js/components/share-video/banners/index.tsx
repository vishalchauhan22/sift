import { LoggedInOnly, useCurrentUserSelector } from '@js/common/current-user';
import { MobileDownloadBannerAsync as MobileDownloadBanner } from '@js/common/mobile-download-banner/async';
import { useVideoContext } from '@js/common/video-player';
import { WebPermissionsBannerAsync as WebPermissionsBanner } from '@js/common/web-permissions-banner/async';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { useShouldShowTrigger } from '@js/hooks/triggers';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';
import {
  useCheckIfSdkSharedUser,
  useGetMemberVideoLimits,
} from '@js/hooks/workspace';
import { MemberVideoThresholdBannerAsync as MemberVideoThresholdBanner } from '@js/pages/share/member-video-threshold-banner/async';
import React from 'react';

import { useTheaterMode } from '@js/common/theater-mode';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container } from '@loomhq/lens';
import { PERMISSION_GRANTED } from '@loomhq/shared-utilities/constants/notifications';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { REQUEST_PUSH_PERMISSIONS } from '@loomhq/shared-utilities/constants/triggers';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import { PERMISSION_BANNER_SHARE_PAGE } from '@js/constants/banner-types';

const BannersWithoutFeatureWrapper = (): JSX.Element => {
  const shouldRequestPushPermissions = useShouldShowTrigger(
    REQUEST_PUSH_PERMISSIONS
  );
  const hasRecordedFirstVideo = useCurrentUserSelector(
    user => user.checklist?.first_video_recording,
    false
  );
  const { featureLoadedRef } = useFeatureWrapper();
  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  const {
    video: { id: videoId },
  } = useVideoContext();
  const isVideoOwner = useCurrentUserIsOwner({ videoId });

  const browserSupport = 'Notification' in window;

  const memberVideoLimit = useGetMemberVideoLimits();

  const isSdkSharedUser = useCheckIfSdkSharedUser();

  const showMemberVideoThresholdBanner = memberVideoLimit.nearLimit;

  const showWebPermissions =
    isVideoOwner &&
    shouldRequestPushPermissions &&
    hasRecordedFirstVideo &&
    !isSdkSharedUser &&
    browserSupport &&
    Notification.permission !== PERMISSION_GRANTED;

  const showMobileBanner =
    hasRecordedFirstVideo &&
    browserSupport &&
    Notification.permission === PERMISSION_GRANTED;

  const { isInTheaterMode } = useTheaterMode();
  const marginTop = isInTheaterMode ? { small: 'large' } : undefined;

  return (
    <LoggedInOnly>
      <Container marginTop={marginTop} refHandler={refHandler}>
        {showMemberVideoThresholdBanner && (
          <FtuxWrapper name={UserPropertyEnum.MEMBER_VIDEO_THRESHOLD_BANNER}>
            <MemberVideoThresholdBanner memberVideoLimit={memberVideoLimit} />
          </FtuxWrapper>
        )}

        {showWebPermissions && (
          <WebPermissionsBanner bannerLocation={PERMISSION_BANNER_SHARE_PAGE} />
        )}

        {showMobileBanner ? <MobileDownloadBanner onSharePage /> : null}
      </Container>
    </LoggedInOnly>
  );
};

export const Banners = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.Banners}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <BannersWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};
