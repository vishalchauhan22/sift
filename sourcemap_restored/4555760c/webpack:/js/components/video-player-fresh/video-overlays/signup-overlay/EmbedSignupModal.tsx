import {
  usePlayingStatus,
  useUserContext,
  useUserInitiatedPlaybackActions,
  useVideoContext,
  useViewportContext,
} from '@js/common/video-player';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import { useFetchNudges } from '@js/hooks/useFetchNudges';
import { useSearchParams } from '@js/hooks/useSearchParams';
import React, { useEffect, useState } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { SDK_RECORDER } from '@loomhq/shared-utilities/constants/recordingClients';
import { isInstalled } from '@js/utilities/extension';

const LazyEmbedPauseSignupModal = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "PauseSignupModal" */ './EmbedPauseSignupModal'
  ).then(module => ({ default: module.SignupModal }))
);

export const LazyEmbedSignupOverlay = (): JSX.Element => {
  return (
    <React.Suspense fallback={null}>
      <SignupOverlay />
    </React.Suspense>
  );
};

export const SignupOverlay: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [hasCheckedIfInstalled, setHasCheckedIfInstalled] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const { video } = useVideoContext();
  const { commentsEnabled } = video;
  const { status } = usePlayingStatus(video.id);
  const { status: userInitiatedStatus } = useUserInitiatedPlaybackActions(
    video.id
  );
  const { isLoggedUser } = useUserContext();
  const { nudges } = useFetchNudges({ skip: isLoggedUser });
  const hasEnded = status === 'ended';
  const isPaused = userInitiatedStatus === 'pause';
  const isVideoEmbedded = useIsVideoEmbedded();
  const searchParams = useSearchParams();
  const skipModal = searchParams.get('skip_embed_eovn') === 'true';

  const { width, height } = useViewportContext();
  const PLAYER_PROMPT_MIN_WIDTH = 600;
  const PLAYER_PROMPT_MIN_HEIGHT = 500;
  const shouldHidePromptAtMinDimensionsExperiment =
    isVideoEmbedded &&
    (width <= PLAYER_PROMPT_MIN_WIDTH || height <= PLAYER_PROMPT_MIN_HEIGHT);

  const isEndedOrPaused = hasEnded || isPaused;
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const isRecordSDKVideo =
    video.videoProperties?.recordingClient === SDK_RECORDER;

  const shouldSeeAiEovn =
    !isLoggedUser &&
    hasEnded &&
    nudges &&
    nudges.length &&
    !video.isOwner &&
    commentsEnabled;

  // Checks whether chrome extension has been installed
  // Async call, so don't show signup modal until we get response
  useEffect(() => {
    setHasCheckedIfInstalled(true);

    const checkInstallation = async () => {
      setInstalled(await new Promise(resolve => isInstalled(resolve)));
    };

    checkInstallation();
  }, []);

  // Show signup modal if:
  // 1. user is not logged in
  // 2. chrome extension is not installed
  // 3. viewing on loom branded player
  const showSignupOverlay =
    !installed && !isLoggedUser && video.loomBrandedPlayer;

  if (
    !isEndedOrPaused ||
    !isOpen ||
    !hasCheckedIfInstalled ||
    !showSignupOverlay ||
    shouldHidePromptAtMinDimensionsExperiment ||
    isRecordSDKVideo ||
    skipModal ||
    shouldSeeAiEovn
  ) {
    return null;
  }

  if (hasEnded) {
    return null;
  }

  if (isPaused && !isLoggedUser) {
    return <LazyEmbedPauseSignupModal setIsOpen={setIsOpen} />;
  }

  return null;
};
