import { ModalTypeEnum } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ASGSource } from '@js/common/onboarding';
import {
  HARD_GATED_VIDEO_IDS_LOCALSTORAGE_KEY,
  useHardGateMobileViews,
} from '@js/hooks/useHardGateMobileViews';
import { Gates } from '@js/pages/share/common/constants/gates';
import React, { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { subscribeToPlayer, setPlayer, removePlayer, Player } from '../api';
import {
  UiEvents,
  BlinkEvents,
  ResolutionVariant,
  SystemEvents,
} from '../api/player';
import { useIsDefaultSpeed, useVideoContext, VideoPlatform } from '../context';

import { parseResolutionToQuality } from '../utils';
import { useFullScreenToggleAgent } from '@js/pages/share/page-init-wrapper/share-video-wrapper/useFullScreenToggleAgent';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import {
  Language,
  LANGUAGE_NAME,
  MOST_POPULAR_LANGUAGES,
} from '@loomhq/shared-utilities';
import { useTranscript } from '../../transcripts/useTranscript';
import {
  availableLanguagesReturnType,
  captionsStore,
  getAvailableLanguages,
  isLanguageValid,
  CaptionsStyle,
  STYLIZED_CAPTIONS,
  DEFAULT_CAPTIONS,
} from './captionsStore';
import { useViewportContext } from '../viewportContext';
import { useHasAccessToTranslatedCaptions } from '../components/play-bar/settings-menu/useHasAccessToTranslatedCaptions';

const videoIdAttribute = 'data-loom-video-id';

declare global {
  interface Window {
    WebKitPlaybackTargetAvailabilityEvent: boolean;
  }

  interface HTMLVideoElement {
    webkitShowPlaybackTargetPicker: () => void;
  }
}

/**
 * Sets the video elemnt associated to
 * videoId to active.
 * Only the active video player is controlled
 * by hot keys.
 * @param id videoId
 */
function setThisToActive(id: string) {
  (
    [
      ...document.querySelectorAll(`video[${videoIdAttribute}]`),
    ] as HTMLVideoElement[]
  ).forEach(video => {
    const videoId = video.getAttribute(videoIdAttribute);

    if (videoId === id) {
      return video.setAttribute('data-active', 'true');
    }

    video.pause();
    video.removeAttribute('data-active');
  });
}

/**
 * This hooks registers a new player by videoId
 * It is an hard dependency for the whole system to work,
 * none of the hooks work if a player is not set first.
 * @param videoId
 * @returns Video reference for react
 */
export function useNewPlayer(
  videoId: string
): React.RefObject<HTMLVideoElement> {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useLayoutEffect(() => {
    const player = ref.current as HTMLVideoElement;

    setPlayer(videoId, player);
    player.setAttribute(videoIdAttribute, videoId);

    return () => {
      removePlayer(videoId);
    };
  }, [ref, videoId]);

  return ref;
}

export function usePlayer(id: string): Player | null {
  const [player, setVideoPlayer] = React.useState<Player | null>(null);

  React.useEffect(() => {
    subscribeToPlayer(id, setVideoPlayer);
  }, [id]);

  return player;
}

export const useSetPlayerTime = ({
  videoId,
  startPlaying = true,
  scrollToTopOnPlay = true,
}: {
  videoId: string;
  startPlaying?: boolean;
  scrollToTopOnPlay?: boolean;
}): ((time: number) => void) => {
  const player = usePlayer(videoId);
  const { duration: maximumDuration } = useCurrentTime(videoId);

  return React.useCallback(
    (time: number | null | undefined) => {
      if (!player) {
        return;
      }

      if (typeof time !== 'number' || time < 0) {
        return;
      }

      if (maximumDuration && time > maximumDuration) {
        return;
      }

      player.currentTime = time;
      if (startPlaying) {
        player.play();

        if (scrollToTopOnPlay) {
          window.scroll(0, 0);
        }
      }
    },
    [player, startPlaying, scrollToTopOnPlay, maximumDuration]
  );
};

export function usePlayerFromContext(): Player | null {
  const { video } = useVideoContext();

  return usePlayer(video.id);
}

export function useCurrentTime(id: string): {
  duration: number;
  currentTime: number;
} {
  const player = usePlayer(id) as Player;
  const [duration, setDuration] = React.useState(player?.duration || 0);
  const [currentTime, setCurrentTime] = React.useState(
    player?.currentTime || 0
  );

  React.useEffect(() => {
    if (!player) {
      return;
    }

    function onUpdate() {
      setCurrentTime(
        player.timeOffset ? player.currentTimeWithOffset : player.currentTime
      );
      setDuration(player.duration);
    }

    player.on([SystemEvents.time, SystemEvents.duration], onUpdate);

    return () =>
      player.off([SystemEvents.time, SystemEvents.duration], onUpdate);
  }, [player]);

  return {
    duration,
    currentTime,
  };
}

export function usePlayingStatus(id: string): {
  status: 'ended' | 'paused' | 'playing' | undefined;
  onPlay: () => void;
} {
  const player = usePlayer(id);
  const [status, setStatus] = React.useState<Player['status'] | undefined>(
    player?.status || 'paused'
  );

  const onPlay = () => {
    setThisToActive(id);
    player?.togglePlay();
  };

  React.useEffect(() => {
    if (!player) {
      return;
    }

    function onChange() {
      setStatus(player?.status);
    }

    player.on([SystemEvents.time], onChange);

    return () => player.off([SystemEvents.time], onChange);
  }, [player]);

  return { status, onPlay };
}

export function useOnPlayCallback(id: string): () => void {
  const player = usePlayer(id);

  const { fullScreenToggleAgent } = useFullScreenToggleAgent();
  const { isExpMwebCommenting } = useExpMwebCommenting();
  const autoFullScreenToggledOnSwitchToLandscape =
    isExpMwebCommenting && fullScreenToggleAgent === 'auto';

  const onPlay = () => {
    setThisToActive(id);
    player?.play();
    if (autoFullScreenToggledOnSwitchToLandscape) {
      player?.toggleFullscreen();
    }
  };

  return onPlay;
}

export function useOnEndHardGateTrigger(
  videoId: string,
  videoOwnerName?: string
): void {
  const { status } = usePlayingStatus(videoId);
  const shouldHardGateMobileViews = useHardGateMobileViews();
  const [hardGatedVideoViews, setHardGatedVideoViews] = useLocalStorageState(
    HARD_GATED_VIDEO_IDS_LOCALSTORAGE_KEY
  );
  const [hasTriggeredHardGate, setHasTriggeredHardGate] = React.useState(false);
  const { openModal } = useModals();

  React.useEffect(() => {
    if (
      shouldHardGateMobileViews &&
      !hasTriggeredHardGate &&
      status === 'ended'
    ) {
      setHasTriggeredHardGate(true);
      const newGatedViews = {
        ...(hardGatedVideoViews || {}),
        [videoId]: true,
      };
      setHardGatedVideoViews(newGatedViews);

      openModal({
        modalType: ModalTypeEnum.HARD_GATE_VIEWS_MODAL,
        options: {
          videoOwnerName,
          source: ASGSource.SignedOutHardGatingViews,
          signupParams: {
            signup_source: ASGSource.SignedOutHardGatingViews,
          },
          gate: Gates.HARD_GATE_VIEWS,
        },
      });
    }
  }, [
    hardGatedVideoViews,
    hasTriggeredHardGate,
    openModal,
    setHardGatedVideoViews,
    setHasTriggeredHardGate,
    shouldHardGateMobileViews,
    status,
    videoId,
    videoOwnerName,
  ]);
}

export function useUpdateVideoPlatform(
  videoId: string,
  platform: VideoPlatform
): void {
  const player = usePlayer(videoId);
  const { setVideoPlatform } = useVideoContext();

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onPlatformUpdate = () => {
      setVideoPlatform(platform);
    };

    player.on([SystemEvents.ready], onPlatformUpdate);

    return () => {
      player.off([SystemEvents.ready], onPlatformUpdate);
    };
  }, [platform, player, setVideoPlatform]);
}

export function useOnPlayToggleCallback(videoId: string): () => void {
  const player = usePlayer(videoId);

  const onPlay = () => {
    setThisToActive(videoId);
    player?.togglePlay();
  };

  return onPlay;
}

export function useVolume(videoId: string): {
  volume: number;
  muted: boolean;
  onChangeVolume: (e: Event) => void;
  onToggleMuted: () => void;
} {
  const player = usePlayer(videoId) as Player;
  const [volume, setVolume] = React.useState(player?.volume || 1);
  const [muted, setMuted] = React.useState(player?.muted);

  const onToggleMuted = () => {
    player.toggleMute();
    setMuted(player.muted);
  };

  const onChangeVolume = (e: Event) => {
    player.volume = Number((e.target as HTMLInputElement).value);
  };

  React.useEffect(() => {
    if (!player) {
      return;
    }

    function onVolumeChange() {
      setVolume(player.volume);
      setMuted(player.muted);
    }

    player.on([SystemEvents.volume], onVolumeChange);

    return () => player.off([SystemEvents.volume], onVolumeChange);
  }, [player]);

  return { volume, muted, onChangeVolume, onToggleMuted };
}

const buildAutoLabel = (resolutionVariant: ResolutionVariant): string => {
  let selectedQuality = 'Auto';

  if (resolutionVariant.height !== -1) {
    if (resolutionVariant.width >= resolutionVariant.height) {
      selectedQuality = `Auto (${parseResolutionToQuality(
        resolutionVariant.height
      )})`;
    } else {
      selectedQuality = `Auto (${parseResolutionToQuality(
        resolutionVariant.width
      )})`;
    }
  }

  return selectedQuality;
};

const buildAvailableQuality = (quality: ResolutionVariant) => {
  let label;

  // When id = -1 we are in auto mode
  if (quality.id === -1) {
    label = buildAutoLabel(quality);
  } else if (quality.width >= quality.height) {
    label = parseResolutionToQuality(quality.height);
  } else {
    label = parseResolutionToQuality(quality.width);
  }

  return {
    id: quality.id,
    label,
  };
};

const buildAvailableQualitiesArray = (
  availableQualities: Map<number, ResolutionVariant>
): {
  id: number;
  label: string | null;
}[] => {
  // one available quality with null width or null height
  // indicates that the one track provided by AVServer did
  // not come with a resolution descriptor
  const firstQuality = availableQualities.entries()?.next()?.value?.[1];

  if (
    availableQualities.size === 1 &&
    (firstQuality?.height === null || firstQuality?.width === null)
  ) {
    return [];
  }

  return Array.from(availableQualities, ([, quality]) => {
    return buildAvailableQuality(quality);
  });
};

export const internalsForTesting = {
  buildAutoLabel,
  buildAvailableQualitiesArray,
  parseResolutionToQuality,
};

export const useStylizedCaptionsEnabled = (): {
  captionsStyle: typeof STYLIZED_CAPTIONS | typeof DEFAULT_CAPTIONS;
  stylizedCaptionsEnabled: boolean;
} => {
  const { video } = useVideoContext();
  const creatorSetStylizedCaptions = Boolean(video?.stylizedCaptions);

  const { captionsStyleSelection } = captionsStore(state => state);

  const captionsStyle = creatorSetStylizedCaptions
    ? captionsStyleSelection || STYLIZED_CAPTIONS
    : DEFAULT_CAPTIONS;

  const stylizedCaptionsEnabled = captionsStyle === STYLIZED_CAPTIONS;

  return { captionsStyle, stylizedCaptionsEnabled };
};

export function useCaptionsSelector(): {
  availableStyles: {
    id: CaptionsStyle;
    label: string | null;
  }[];
  currentCaptionsStyle: string;
  shouldDisplayCaptionsSelector: boolean;
} {
  const { video } = useVideoContext();

  const { captionsUrl, isCaptionsTranslationInProgress } = useTranscript();

  const shouldDisplayCaptionsSelector = Boolean(
    (isCaptionsTranslationInProgress || captionsUrl) && video?.stylizedCaptions
  );

  const availableStyles: {
    id: CaptionsStyle;
    label: string | null;
  }[] = [
    { id: DEFAULT_CAPTIONS, label: 'Default' },
    { id: STYLIZED_CAPTIONS, label: 'Stylized' },
  ];

  const { captionsStyle: currentCaptionsStyle } = useStylizedCaptionsEnabled();

  return {
    availableStyles,
    currentCaptionsStyle,
    shouldDisplayCaptionsSelector,
  };
}

export const getOrganisedLanguageList = (
  availableLanguages: availableLanguagesReturnType,
  originalLanguageKey: Language | null
): availableLanguagesReturnType => {
  let mostPopularLanguagesArray: { id: Language; label: string }[] =
    MOST_POPULAR_LANGUAGES.map(id => ({ id, label: LANGUAGE_NAME[id] || '' }));

  // remove the original language if it exist among the popular languages
  if (
    originalLanguageKey !== null &&
    originalLanguageKey !== Language.UNKNOWN
  ) {
    mostPopularLanguagesArray = mostPopularLanguagesArray.filter(
      language => language.id !== originalLanguageKey
    );
  }

  mostPopularLanguagesArray.sort((a, b) => a.label.localeCompare(b.label));

  const languagesToFilter = new Set(
    mostPopularLanguagesArray.map(language => language.id)
  );

  if (
    originalLanguageKey !== null &&
    originalLanguageKey !== Language.UNKNOWN
  ) {
    languagesToFilter.add(originalLanguageKey);
  }

  // remove the popular languages from the available lists, prevents duplicated values
  const mapWithoutPopularLanguages = availableLanguages.filter(
    language => !languagesToFilter.has(language.id)
  );

  if (
    originalLanguageKey !== null &&
    originalLanguageKey !== Language.UNKNOWN
  ) {
    return [
      {
        id: originalLanguageKey,
        label: `${LANGUAGE_NAME[originalLanguageKey]} (default)`,
      },
      ...mostPopularLanguagesArray,
      ...mapWithoutPopularLanguages,
    ];
  }

  return [...mostPopularLanguagesArray, ...mapWithoutPopularLanguages];
};

export function useCaptionsLanguageSelector(): {
  availableLanguages: {
    id: Language;
    label: string;
  }[];
  organisedLanguageList: {
    id: Language;
    label: string;
  }[];
  handleCaptionsLanguageChange: (newLanguageKey: Language) => void;
  captionsLanguageSelection: string;
  originalLanguage: string | undefined;
  originalLanguageKey: Language | null;
  hasCaptionsLanguageChanged: boolean;
} {
  const { language: originalLanguageKey } = useTranscript();

  const availableLanguages = getAvailableLanguages();

  const {
    captionsLanguageSelection,
    hasCaptionsLanguageChanged,
    setCaptionsLanguageSelection,
  } = captionsStore(state => state);

  // Safely get original language display name
  const originalLanguage = React.useMemo(() => {
    if (
      originalLanguageKey === null ||
      originalLanguageKey === Language.UNKNOWN
    ) {
      return '';
    }
    return LANGUAGE_NAME[originalLanguageKey] || '';
  }, [originalLanguageKey]);

  const organisedLanguageList = React.useMemo(() => {
    return getOrganisedLanguageList(availableLanguages, originalLanguageKey);
  }, [availableLanguages, originalLanguageKey]);

  const handleCaptionsLanguageChange = React.useCallback(
    (newLanguageKey: Language) => {
      const isValidLanguage = isLanguageValid(newLanguageKey);

      if (!isValidLanguage) {
        return;
      }

      setCaptionsLanguageSelection(newLanguageKey);
    },
    [setCaptionsLanguageSelection]
  );

  return {
    originalLanguage,
    originalLanguageKey,
    availableLanguages,
    organisedLanguageList,
    handleCaptionsLanguageChange,
    captionsLanguageSelection,
    hasCaptionsLanguageChanged,
  };
}

export function useQualitySelector(videoId: string): {
  availableQualities: {
    id: number;
    label: string | null;
  }[];
  handleVideoQualityChange: (newQualityId: number) => void;
  currentQualityId: number | null;
  shouldDisplayQualitySelector: boolean;
} {
  const player = usePlayer(videoId) as Player;
  const [currentQualityId, setCurrentQualityId] = React.useState<number | null>(
    null
  );
  const [availableQualities, setAvailableQualities] = React.useState(
    new Map<number, ResolutionVariant>()
  );

  // Because the currentQualityId and availableQualities are constructed
  // based on two independent events, we need to check that both are not empty
  // to display the quality selector
  const shouldDisplayQualitySelector =
    currentQualityId !== null &&
    buildAvailableQualitiesArray(availableQualities).length !== 0;

  // Listener for available resolutions
  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onResolutionVariantOptionsAvailable = () => {
      const availableQualities = new Map();
      const availableResolutions =
        player?.resolutionVariantOptions.reverse() ?? [];

      availableResolutions.forEach((resolution: ResolutionVariant) => {
        availableQualities.set(resolution.id, {
          id: resolution.id,
          width: resolution.width,
          height: resolution.height,
        });
      });

      setAvailableQualities(availableQualities);
    };

    player.on(
      [SystemEvents.resolutionVariantOptionsAvailable],
      onResolutionVariantOptionsAvailable
    );

    return () =>
      player.off(
        [SystemEvents.resolutionVariantOptionsAvailable],
        onResolutionVariantOptionsAvailable
      );
  }, [player]);

  // Listener for the current resolution
  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onResolutionVariantChanged = () => {
      setCurrentQualityId(player.selectedResolutionVariant?.id);
    };

    player.on(
      [SystemEvents.resolutionVariantChanged],
      onResolutionVariantChanged
    );

    return () =>
      player.off(
        [SystemEvents.resolutionVariantChanged],
        onResolutionVariantChanged
      );
  }, [player]);

  const handleVideoQualityChange = (newQualityId: number) => {
    player.selectResolutionVariantById(newQualityId);

    // Triggering a UiEvent so the loom repo can access the quality and log the event
    // for analytics purposes
    if (currentQualityId !== null) {
      player.videoQualityChanged(
        buildAvailableQuality(
          availableQualities.get(currentQualityId) as ResolutionVariant
        )?.label ?? ''
      );
    }
  };

  return {
    availableQualities: buildAvailableQualitiesArray(availableQualities),
    handleVideoQualityChange,
    currentQualityId,
    shouldDisplayQualitySelector,
  };
}

// show settings selector if either quality or captions selector is shown
export function useSettingsSelector(videoId: string): {
  shouldDisplaySettingsSelector: boolean;
} {
  const { shouldDisplayQualitySelector } = useQualitySelector(videoId);
  const { shouldDisplayCaptionsSelector } = useCaptionsSelector();
  const hasTranslatedCaptionsAccess = useHasAccessToTranslatedCaptions();
  const shouldDisplaySettingsSelector = Boolean(
    shouldDisplayQualitySelector ||
      shouldDisplayCaptionsSelector ||
      hasTranslatedCaptionsAccess
  );

  return { shouldDisplaySettingsSelector };
}

export function usePlaybackRate(videoId: string): {
  rates: number[];
  rate: number;
  ratePreview: number | undefined;
  onChange: (newRate?: number) => void;
  updateRatePreview: (newRate?: number) => void;
  resetRatePreview: () => void;
} {
  const player = usePlayer(videoId) as Player;
  const [rate, setRate] = React.useState(player?.playbackRate || 1);
  const [ratePreview, setRatePreview] = React.useState<number | undefined>();

  const onChange = (newRate?: number) => {
    if (!player) {
      // TODO(claudio): need a better overall strategy
      // to have components work standalone?
      newRate && setRate(newRate);

      return;
    }

    if (newRate) {
      player.playbackRate = newRate;
    } else {
      player.toggleRate();
    }

    player.rateChangeClicked();
  };

  const updateRatePreview = (newRate?: number) => {
    setRatePreview(newRate);
  };

  const resetRatePreview = () => {
    setRatePreview(undefined);
  };

  React.useEffect(() => {
    if (!player) {
      return;
    }

    function onRateChange() {
      if (Player.rates().includes(player.playbackRate)) {
        setRate(player.playbackRate);
      }
    }

    player.on([SystemEvents.speed], onRateChange);

    return () => player.off([SystemEvents.speed], onRateChange);
  }, [player]);

  return {
    rates: Player.rates() || [],
    rate,
    ratePreview,
    onChange,
    updateRatePreview,
    resetRatePreview,
  };
}

export function useProgressBar(
  videoId: string,
  rounded = false
): {
  progress: number;
  setPosition: (position: number) => void;
  duration: number;
  currentTime: number;
} {
  const player = usePlayer(videoId) as Player;
  const { currentTime, duration } = useCurrentTime(videoId);
  let progress = (100 * currentTime) / duration || 0;

  if (rounded) {
    progress = Math.round(progress);
  }

  const setPosition = (position: number) => {
    const time = (position * duration) / 100;

    if (!player) {
      return;
    }

    player.currentTime = time;
  };

  return { progress, setPosition, duration, currentTime };
}

export function useSmoothProgressBar(videoId: string): {
  progress: number;
  duration: number;
} {
  const { currentTime, duration } = useSmoothTime(videoId);
  const progress = (100 * currentTime) / duration || 0;

  return { progress, duration };
}

export function useSmoothTime(id: string): {
  duration: number;
  currentTime: number;
} {
  const player = usePlayer(id) as Player;
  const [duration, setDuration] = React.useState(player?.duration || 0);
  const [currentTime, setCurrentTime] = React.useState(
    player?.currentTime || 0
  );

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onTimeUpdate = () => {
      setCurrentTime(
        player.timeOffset ? player.currentTimeWithOffset : player.currentTime
      );
    };

    function onDuration() {
      setDuration(player.duration);
    }

    player.on([SystemEvents.smoothTime], onTimeUpdate);
    player.on([SystemEvents.duration], onDuration);

    return () => {
      player.off([SystemEvents.smoothTime], onTimeUpdate);
      player.off([SystemEvents.duration], onDuration);
    };
  }, [player]);

  return { duration, currentTime };
}

export function useFullScreenToggle(videoId: string): {
  onClick: () => void;
  isEnabled: boolean;
  isFullScreen: boolean;
} {
  const player = usePlayer(videoId) as Player;

  const [isFullScreen, setFullscreen] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const { setFullScreenToggleAgent } = useFullScreenToggleAgent();

  const onClick = React.useCallback(() => {
    if (isFullScreen) {
      setFullScreenToggleAgent('none');
    } else {
      setFullScreenToggleAgent('user');
    }
    player.toggleFullscreen();
  }, [player, isFullScreen, setFullScreenToggleAgent]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const fullscreenElement = player.getFullscreenElement();
    const onFullScreen = () => {
      const isFullScreen =
        // @ts-expect-error webkit prefix
        Boolean(document.fullscreenElement || document.webkitIsFullScreen);

      setFullscreen(isFullScreen);
    };

    setIsEnabled(player.isFullScreenEnabled());

    fullscreenElement.addEventListener('fullscreenchange', onFullScreen);
    fullscreenElement.addEventListener('webkitfullscreenchange', onFullScreen);

    return () => {
      fullscreenElement.removeEventListener('fullscreenchange', onFullScreen);
      fullscreenElement.removeEventListener(
        'webkitfullscreenchange',
        onFullScreen
      );
    };
  }, [player]);

  return { onClick, isEnabled, isFullScreen };
}

export function useInitialTimeLoaded(videoId: string): boolean {
  const player = usePlayer(videoId);
  const [initialTimeLoaded, setInitialTimeLoaded] = useState(false);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onSetInitialTimeLoaded = () => {
      if (player.currentTime > 0) {
        setInitialTimeLoaded(true);
      }
    };

    player.on([SystemEvents.initialTimeLoaded], onSetInitialTimeLoaded);

    return () => {
      player.off([SystemEvents.initialTimeLoaded], onSetInitialTimeLoaded);
    };
  }, [player]);

  return initialTimeLoaded;
}

export function usePlayerHasStarted(videoId: string): boolean {
  const player = usePlayer(videoId) as Player;
  const [hasStarted, setHasStarted] = React.useState(player?.started);

  React.useEffect(() => {
    const onStart = () => setHasStarted(true);

    if (hasStarted || !player) {
      return;
    }

    if (player.started) {
      return onStart();
    }

    player.on([SystemEvents.started], onStart, true);

    return () => player.off([SystemEvents.started], onStart);
  }, [player, hasStarted]);

  return hasStarted;
}

export function usePlayerIsWaiting(videoId: string): boolean {
  const player = usePlayer(videoId);
  const [isWaiting, setIsWaiting] = React.useState(player?.isWaiting);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const checkWaiting = () => {
      setIsWaiting(true);
    };

    const checkPlaying = () => {
      setIsWaiting(false);
    };

    player.mediaOn(['canplay', 'playing', 'stalled', 'ended'], checkPlaying);
    player.mediaOn(['waiting'], checkWaiting);

    return () => {
      player.mediaOff(['canplay', 'playing', 'stalled', 'ended'], checkPlaying);
      player.mediaOff(['waiting'], checkWaiting);
    };
  }, [player]);

  return Boolean(isWaiting);
}

const BUFFERING_EVENT_LIST = [
  'waiting',
  'playing',
  'canplay',
  'canplaythrough',
  'seeking',
  'seeked',
  'loadstart',
  'loadedmetadata',
  'loadeddata',
];

export function usePlayerIsBuffering(videoId: string): boolean {
  const player = usePlayer(videoId);
  const [isBuffering, setIsBuffering] = React.useState(true);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const checkBuffering = () => {
      if (player.isBuffering) {
        setIsBuffering(true);
      } else {
        setIsBuffering(false);
      }
    };

    player.mediaOn(BUFFERING_EVENT_LIST, checkBuffering);

    return () => {
      player.mediaOff(BUFFERING_EVENT_LIST, checkBuffering);
    };
  }, [player]);

  return Boolean(isBuffering);
}

const airplayEvent = 'webkitplaybacktargetavailabilitychanged';

export function useAirPlay(videoId: string): {
  onClick: () => void;
  isEnabled: boolean;
} {
  const player = usePlayer(videoId) as Player;
  const [isEnabled, setEnabled] = React.useState(false);
  const onClick = () => player.media.webkitShowPlaybackTargetPicker();

  React.useEffect(() => {
    if (!player || !window.WebKitPlaybackTargetAvailabilityEvent) {
      return;
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const checkAvailable = (e: any) => setEnabled(e.availability);

    player.mediaOn([airplayEvent], checkAvailable);

    return () => player.mediaOff([airplayEvent], checkAvailable);
  }, [player]);

  return { onClick, isEnabled };
}

export function usePictureInPicture(videoId: string): {
  onClick: () => void | undefined;
  isEnabled: boolean;
} {
  const player = usePlayer(videoId);
  const isEnabled = document.pictureInPictureEnabled;
  const onClick = React.useCallback(
    () => player?.togglePictureInPicture(),
    [player]
  );

  return { onClick, isEnabled };
}

export function usePipActive(videoId: string): boolean | undefined {
  const player = usePlayer(videoId);
  const [pipActive, setPipActive] = useState(player?.pipActive);

  const handlePipChange = () => {
    if (pipActive !== player?.pipActive) {
      setPipActive(player?.pipActive);
    }
  };

  React.useEffect(() => {
    player?.on([SystemEvents.pipActiveChange], handlePipChange);

    return () => player?.off([SystemEvents.pipActiveChange], handlePipChange);
  });

  return pipActive;
}

export function useFlipVideo(videoId: string): boolean | undefined {
  const pipActive = usePipActive(videoId);

  const { video } = useVideoContext();

  return video.flipVideo && !pipActive;
}

export function useMakeClip(videoId: string, clip: [number, number]): void {
  const player = usePlayer(videoId);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const [start, end] = clip;
    const forceClipPlay = () => {
      const hasStarted = player.currentTime > 0;
      const isOutOfBounds =
        player.currentTime < start || player.currentTime > end;

      if (hasStarted && isOutOfBounds) {
        player.pause();
        player.currentTime = start;
      }
    };

    player.setClipDuration(clip);

    player.mediaOn(['canplay'], function onCanPlay() {
      if (player.currentTime !== start) {
        player.currentTime = start;
      }

      player.mediaOff(['canplay'], onCanPlay);
    });

    player.on([SystemEvents.time], forceClipPlay);

    return () => {
      player.off([SystemEvents.time], forceClipPlay);
    };
  }, [player, clip]);
}

export function useUserInitiatedPlaybackActions(videoId: string): {
  status: BlinkEvents | undefined;
} {
  const player = usePlayer(videoId) as Player;
  const [status, setStatus] = React.useState<BlinkEvents>();

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onPlay = () => setStatus(BlinkEvents.play);
    const onPause = () => setStatus(BlinkEvents.pause);
    const onStepForward = () => setStatus(BlinkEvents.stepForward);
    const onStepBackward = () => setStatus(BlinkEvents.stepBackward);
    const onMute = () => setStatus(BlinkEvents.mute);
    const onUnmute1 = () => setStatus(BlinkEvents.unmute1);
    const onUnmute2 = () => setStatus(BlinkEvents.unmute2);
    const onSpeedUpdate = () => setStatus(BlinkEvents.speedUpdate);

    player.on([SystemEvents.userPause], onPause);
    player.on([SystemEvents.userPlay], onPlay);
    player.on([SystemEvents.userStepBackward], onStepBackward);
    player.on([SystemEvents.userStepForward], onStepForward);
    player.on([SystemEvents.userMute], onMute);
    player.on([SystemEvents.userUnmute1], onUnmute1);
    player.on([SystemEvents.userUnmute2], onUnmute2);
    player.on([UiEvents.rateChangeClicked], onSpeedUpdate);

    return () => {
      player.off([SystemEvents.userPause], onPause);
      player.off([SystemEvents.userPlay], onPlay);
      player.off([SystemEvents.userStepBackward], onStepBackward);
      player.off([SystemEvents.userStepForward], onStepForward);
      player.off([SystemEvents.userMute], onMute);
      player.off([SystemEvents.userUnmute1], onUnmute1);
      player.off([SystemEvents.userUnmute2], onUnmute2);
      player.off([UiEvents.rateChangeClicked], onSpeedUpdate);
    };
  }, [player]);

  return { status };
}

export function useBufferedParts(videoId: string): {
  left: number;
  width: number;
}[] {
  const player = usePlayer(videoId);
  const [buffered, setBuffered] = React.useState<
    { left: number; width: number }[]
  >([]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onProgress = () => {
      const { bufferedParts } = player;
      const bufferedSegments: { left: number; width: number }[] = [];

      bufferedParts.forEach(([start, end]) => {
        const left = (start / player.duration) * 100;
        const width = ((end - start) / player.duration) * 100;

        bufferedSegments.push({ left, width });
      });

      setBuffered(bufferedSegments);
    };

    onProgress();
    player.mediaOn(['progress'], onProgress);

    return () => player.mediaOff(['progress'], onProgress);
  }, [player]);

  return buffered;
}

export function useToggleCaptions(videoId: string): {
  onToggle: () => void;
  captionsActive: boolean;
} {
  const player = usePlayer(videoId) as Player;
  const [captionsActive, setCaptionsActive] = React.useState(
    Boolean(player?.closedCaptions)
  );

  const onToggle = React.useCallback(() => {
    if (!player) {
      setCaptionsActive(active => !active);

      return;
    }

    player.toggleClosedCaptions();
  }, [player]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const onClosedCaptions = () => {
      setCaptionsActive(player.closedCaptions);
    };

    player.on([SystemEvents.closedCaptions], onClosedCaptions);

    return () => player.off([SystemEvents.closedCaptions], onClosedCaptions);
  }, [player]);

  return { onToggle, captionsActive };
}

export const useIsInitialPause = (): boolean => {
  const { video } = useVideoContext();
  const hasStarted = usePlayerHasStarted(video.id);
  const { status } = usePlayingStatus(video.id);
  const [isInitialPause, setIsInitialPause] = useState(true);

  const isPaused = hasStarted && status === 'paused';

  React.useEffect(() => {
    // This is a hacky approach to ensure videoData and title are hidden at the same moment
    // videoData is not shown on pause, but the embed player is paused for a few ms after pressing play
    if (isInitialPause && isPaused === false) {
      setIsInitialPause(false);
    }
  }, [isInitialPause, isPaused]);

  return isInitialPause;
};

export const useHandleDefaultSpeedRateParam = (videoId: string): void => {
  const isDefaultSpeed = useIsDefaultSpeed();
  const { rate, onChange: onPlaybackRateChange } = usePlaybackRate(videoId);

  React.useEffect(() => {
    if (isDefaultSpeed && rate !== 1) {
      onPlaybackRateChange(1);
    }
  }, [isDefaultSpeed, onPlaybackRateChange, rate]);
};

// Set the video context's duration to the duration that is determined at runtime by the player.
// In theory this should be the same as the duration that is set in the video context's video properties,
// but in practice it isn't always the case, due to bugs during either recording or processing.
export const useSyncVideoContextDuration = (): void => {
  const { setDuration } = useVideoContext();
  const player = usePlayerFromContext();

  React.useEffect(() => {
    if (!player) {
      return;
    }

    function onDurationChange() {
      if (player === undefined || player === null) {
        return;
      }

      if (!Number.isFinite(player.duration) || player.duration === 2 ** 32) {
        // This is a special behavior of shaka-player because not all
        // browser support infinity. See
        // https://github.com/shaka-project/shaka-player/issues/1052
        return;
      }

      setDuration(player.duration);
    }

    player.mediaOn(['durationchange'], onDurationChange);

    return () => player.mediaOff(['durationchange'], onDurationChange);
  }, [player, setDuration]);
};

export const useShowCollapsedSettings = (
  videoId: string
): {
  showCollapsedSettings: boolean;
  showSmallheightSettings: boolean;
} => {
  const { width, height } = useViewportContext();
  const { isEnabled: airPlayIsEnabled } = useAirPlay(videoId);
  const collapsedSettingsBreakpointWidth = airPlayIsEnabled ? 650 : 600;
  const collapsedSettingsBreakpointHeight = 420;

  return {
    showCollapsedSettings: width < collapsedSettingsBreakpointWidth,
    showSmallheightSettings: height < collapsedSettingsBreakpointHeight,
  };
};
