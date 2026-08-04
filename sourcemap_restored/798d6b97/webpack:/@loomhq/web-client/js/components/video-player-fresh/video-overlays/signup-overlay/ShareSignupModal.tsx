import { SilentErrorBoundary } from '@js/common/error-management';
import {
  usePlayingStatus,
  useUserContext,
  useUserInitiatedPlaybackActions,
  useVideoContext,
} from '@js/common/video-player';
import { useFetchNudges } from '@js/hooks/useFetchNudges';
import React from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';
import { Feature } from '@loomhq/shared-utilities/constants/product';

const LazySharePauseSignupModal = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "PauseSignupModal" */ './SharePauseSignupModal'
  ).then(module => ({ default: module.SignupModal }))
);

export const LazyShareSignupOverlay: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <SilentErrorBoundary feature={Feature.Signup} name="Share Signup Overlay">
      <React.Suspense fallback={null}>
        <SignupOverlay />
      </React.Suspense>
    </SilentErrorBoundary>
  );
};

export const SignupOverlay: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const { video } = useVideoContext();
  const { commentsEnabled } = video;
  const { nudges } = useFetchNudges();
  const { status } = usePlayingStatus(video.id);
  const hasEnded = status === 'ended';
  const { status: userInitiatedStatus } = useUserInitiatedPlaybackActions(
    video.id
  );

  const shouldSeeAiEovn =
    hasEnded && nudges && nudges.length && !video.isOwner && commentsEnabled;

  const { isLoggedUser } = useUserContext();
  const isPaused = userInitiatedStatus === 'pause';
  const hasLoomBranding = video?.hasLoomBranding;

  const isSalesforceTrackedVideo = video.salesforceEngagementTracking;
  const isVideoEmailGated =
    video.emailGateVideoType !== EmailGatingSetting.None;

  const isSalesTargetedVideo = isSalesforceTrackedVideo || isVideoEmailGated;

  const isEndedOrPaused = hasEnded || isPaused;
  // Show share page signup modal if:
  // 1. user is not logged in
  // 2. viewing on loom branded player

  if (shouldSeeAiEovn) {
    return null;
  }

  const showSignupOverlay = !isLoggedUser && video.loomBrandedPlayer;

  if (
    !isEndedOrPaused ||
    !isOpen ||
    !showSignupOverlay ||
    isSalesTargetedVideo
  ) {
    return null;
  }

  if (hasEnded) {
    return null;
  }

  if (!hasLoomBranding) {
    return null;
  }

  return <LazySharePauseSignupModal setIsOpen={setIsOpen} />;
};
