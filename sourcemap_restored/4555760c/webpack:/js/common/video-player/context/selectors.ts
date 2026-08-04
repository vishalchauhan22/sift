import { useVideoStore } from './provider';

import type {
  VideoContext,
  FeatureFlag,
  DisplayTimeOverride,
  UserContext,
  VideoPlatform,
  Reaction,
  PlaybarTypes,
} from './types';

export const videoIdSelector = (state: VideoContext): string => state.video.id;
export const userContextSelector = (state: VideoContext): UserContext =>
  state.userContext;
export const modelIdSelector = (state: VideoContext): string | undefined =>
  state.video.modelId;
export const isLoggedUserSelector = (
  state: VideoContext
): boolean | undefined => state.userContext.isLoggedUser;
export const commentsEnabledSelector = (state: VideoContext): boolean =>
  state.video.commentsEnabled;
export const reactionsEnabledSelector = (state: VideoContext): boolean =>
  state.video.reactionsEnabled;
export const customBrandingPrimaryColorSelector = (
  state: VideoContext
): string | undefined => state.video.customBrandingPrimaryColor;
export const hasLoomBrandingSelector = (
  state: VideoContext
): boolean | undefined => state.video.hasLoomBranding;
export const videoPlatformSelector = (
  state: VideoContext
): VideoPlatform | undefined => state.video.platform;
export const commentsCountSelector = (state: VideoContext): number => {
  const { comments } = state;
  let totalCommentCount = comments.length;

  comments.forEach(comment => {
    const replyCount = comment.hasMore || 0;

    totalCommentCount += replyCount;
  });

  return totalCommentCount;
};

export const sortedReactionsSelector = (state: VideoContext): Reaction[] =>
  state.reactions.sort((a, b) => a.time - b.time);

export const isOnWatchLaterListSelector = (
  state: VideoContext
): boolean | undefined => state.video.isOnWatchLaterList;

export const isFeatureEnabled = (
  state: VideoContext,
  feature: FeatureFlag
): boolean => {
  const { enabledFeatures } = state.userContext;

  if (!enabledFeatures) {
    return false;
  }

  const currentFeature = enabledFeatures[feature];

  return Boolean(currentFeature?.enabled);
};

export const getFeatureVariant = (
  state: VideoContext,
  feature: FeatureFlag
): string | undefined => {
  const { enabledFeatures } = state.userContext;

  if (!enabledFeatures) {
    return 'ineligible';
  }

  const currentFeature = enabledFeatures[feature];

  return currentFeature?.variant;
};

export const useIsEnabledFeaturesLoading = (): boolean => {
  return useVideoStore(state => {
    const { enabledFeatures } = state.userContext;

    return !enabledFeatures;
  });
};

export function useIsFeatureEnabled(feature: FeatureFlag): boolean {
  return useVideoStore(store => isFeatureEnabled(store, feature));
}

export function useFeatureVariant(feature: FeatureFlag): string | undefined {
  return useVideoStore(store => getFeatureVariant(store, feature));
}

export function useModelId(): string | undefined {
  return useVideoStore(modelIdSelector);
}

export function useIsLoggedUser(): boolean | undefined {
  return useVideoStore(isLoggedUserSelector);
}

export function useUserContext(): UserContext {
  return useVideoStore(userContextSelector);
}

export function useCommentsEnabled(): boolean {
  return useVideoStore(commentsEnabledSelector);
}

export function useReactionsEnabled(): boolean {
  return useVideoStore(reactionsEnabledSelector);
}

export function useCommentsCount(): number {
  return useVideoStore(commentsCountSelector);
}

export function useVideoId(): string {
  return useVideoStore(videoIdSelector);
}

export function useBrandingPrimaryColor(): string | undefined {
  return useVideoStore(customBrandingPrimaryColorSelector);
}

export function useHasLoomBranding(): boolean | undefined {
  return useVideoStore(hasLoomBrandingSelector);
}

export function useIsOnWatchLaterList(): boolean | undefined {
  return useVideoStore(isOnWatchLaterListSelector);
}

const hideOwnerSelector = (state: VideoContext) =>
  state.customization.hideOwner;
const hideShareSelector = (state: VideoContext) =>
  state.customization.hideShare;
const hideWatchOnLoomSelector = (state: VideoContext) =>
  state.customization.hideWatchOnLoom;
const hideTitleSelector = (state: VideoContext) =>
  state.customization.hideTitle;
const hideTopBarSelector = (state: VideoContext) =>
  state.customization.hideTopBar;
const hideSpeedSelectorSelector = (state: VideoContext) =>
  state.customization.hideSpeedSelector;
const whiteLabelPlayerSelector = (state: VideoContext) =>
  state.customization.whiteLabelPlayer;
const showPoweredByLoomSelector = (state: VideoContext) =>
  state.customization.showPoweredByLoom &&
  !state.customization.whiteLabelPlayer;
const showLoomWatermarkSelector = (state: VideoContext) =>
  state.customization.showLoomWatermark &&
  !state.customization.whiteLabelPlayer;
const enforcedPlaybarSelector = (state: VideoContext) =>
  state.customization.enforcedPlaybar;
const displayTimeOverride = (state: VideoContext) =>
  state.customization.displayTimeOverride;
const showPauseOverlaySelector = (state: VideoContext) => {
  return state.customization.showPauseOverlay;
};
const hideBackgroundPreviewSelector = (state: VideoContext) => {
  return state.customization.hideBackgroundPreview;
};
const isDefaultSpeedSelector = (state: VideoContext) =>
  state.customization.isDefaultSpeed;
const loopVideoSelector = (state: VideoContext) =>
  state.customization.loopVideo;
const muteVideoSelector = (state: VideoContext) =>
  state.customization.muteVideo;
const rawEmbedVideoSelector = (state: VideoContext) =>
  state.customization.rawEmbedVideo;
const minimalPlayerVideoSelector = (state: VideoContext) =>
  state.customization.minimalPlayer;
const disableClickInteractionsSelector = (state: VideoContext) =>
  state.customization.disableClickInteractions;

export function useHideOwner(): boolean | undefined {
  return useVideoStore(hideOwnerSelector);
}

export function useHideShare(): boolean | undefined {
  return useVideoStore(hideShareSelector);
}

export function useHideWatchOnLoom(): boolean | undefined {
  return useVideoStore(hideWatchOnLoomSelector);
}

export function useHideTitle(): boolean | undefined {
  return useVideoStore(hideTitleSelector);
}

export function useHideSpeedSelector(): boolean | undefined {
  return useVideoStore(hideSpeedSelectorSelector);
}

export function useWhiteLabelPlayer(): boolean | undefined {
  return useVideoStore(whiteLabelPlayerSelector);
}

export function useShowPoweredByLoom(): boolean | undefined {
  const isShowPoweredByLoom = useVideoStore(showPoweredByLoomSelector);

  return isShowPoweredByLoom;
}

export function useShowPauseOverlay(): boolean | undefined {
  return useVideoStore(showPauseOverlaySelector);
}

export function useHideBackgroundPreview(): boolean | undefined {
  return useVideoStore(hideBackgroundPreviewSelector);
}

export function useShowLoomWatermark(): boolean | undefined {
  return useVideoStore(showLoomWatermarkSelector);
}

export function useEnforcedPlaybar(): PlaybarTypes | undefined {
  return useVideoStore(enforcedPlaybarSelector);
}

export function useHideTopBar(): boolean | undefined {
  return useVideoStore(hideTopBarSelector);
}

export function useDisplayTimeOverride(): DisplayTimeOverride | undefined {
  return useVideoStore(displayTimeOverride);
}

export function useSortedReactions(): Reaction[] {
  return useVideoStore(sortedReactionsSelector);
}

export function useVideoPlatform(): VideoPlatform | undefined {
  return useVideoStore(videoPlatformSelector);
}

export function useIsDefaultSpeed(): boolean | undefined {
  return useVideoStore(isDefaultSpeedSelector);
}

export function useIsLoopVideo(): boolean | undefined {
  return useVideoStore(loopVideoSelector);
}

export function useIsMutedVideo(): boolean | undefined {
  return useVideoStore(muteVideoSelector);
}

export function useIsRawEmbedVideo(): boolean | undefined {
  return useVideoStore(rawEmbedVideoSelector);
}

export function useIsMinimalPlayer(): boolean | undefined {
  return useVideoStore(minimalPlayerVideoSelector);
}

export function useIsDisabledClickInteractions(): boolean | undefined {
  return useVideoStore(disableClickInteractionsSelector);
}
