import create, { SetState, UseBoundStore, StoreApi } from 'zustand';

import { VideoVisibility } from '@loomhq/shared-utilities/constants/visibility';

import { VideoNudge } from '@js/globalTypes.generated';

import { EnabledFeatures } from './featureFlags';
import { PlaybarTypes } from './types';

import type {
  DisplayTimeOverride,
  VideoContext,
  VideoContextActions,
  VideoPlatform,
  Video,
} from './types';

type PartialVideoOwner = Partial<Video['owner']>;
type PartialVideoProcessingInformation = Partial<
  Video['processingInformation']
>;
type PartialVideoThumbnails = Partial<Video['thumbnails']>;
type PartialVideoVideoProperties = Partial<Video['videoProperties']>;

export type PartialVideo = Partial<Video> & {
  owner?: PartialVideoOwner;
  processingInformation?: PartialVideoProcessingInformation;
  thumbnails?: PartialVideoThumbnails;
  videoProperties?: PartialVideoVideoProperties;
};

export const createStore =
  (initialState: Omit<VideoContext, keyof VideoContextActions>) =>
  (): UseBoundStore<VideoContext, StoreApi<VideoContext>> =>
    create<VideoContext>(set => ({
      ...initialState,

      ...reactionsSlice(set),
      ...commentsSlice(set),
      ...videoSlice(set),
      ...customizationSlice(set),

      toggleLogged: (isLoggedUser: boolean) =>
        set((state: VideoContext) => ({
          userContext: { ...state.userContext, isLoggedUser },
        })),
      setShowLoomConnect: (showLoomConnect: boolean) =>
        set((state: VideoContext) => ({
          userContext: { ...state.userContext, showLoomConnect },
        })),
      setRequestedSlackPermissionLayer: (
        requestedSlackPermissionLayer: boolean
      ) =>
        set((state: VideoContext) => ({
          userContext: { ...state.userContext, requestedSlackPermissionLayer },
        })),
      setEnabledFeatures: (enabledFeatures: EnabledFeatures) =>
        set((state: VideoContext) => ({
          userContext: {
            ...state.userContext,
            enabledFeatures: {
              ...state.userContext.enabledFeatures,
              ...enabledFeatures,
            },
          },
        })),
      setIsSdkSupported: (isSdkSupported: boolean) =>
        set((state: VideoContext) => ({
          userContext: { ...state.userContext, isSdkSupported },
        })),
      setIsRecordReplyEnabled: (isRecordReplyEnabled: boolean) =>
        set((state: VideoContext) => ({
          userContext: { ...state.userContext, isRecordReplyEnabled },
        })),
    }));

function reactionsSlice(set: SetState<VideoContext>) {
  return {
    addReaction: (reaction: VideoContext['reactions'][number]) =>
      set((state: VideoContext) => ({
        reactions: [...state.reactions, reaction],
      })),
    addReactions: (reactions: VideoContext['reactions']) =>
      set((state: VideoContext) => ({
        reactions: [...state.reactions, ...reactions],
      })),
    deleteReaction: (modelId: string) =>
      set((state: VideoContext) => ({
        reactions: state.reactions.filter(
          reaction => reaction.modelId !== modelId
        ),
      })),
    setReactions: (reactions: VideoContext['reactions']) =>
      set(() => ({ reactions })),
    toggleReactions: (reactionsEnabled: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, reactionsEnabled },
      })),
  };
}

function commentsSlice(set: SetState<VideoContext>) {
  return {
    addComment: (comment: VideoContext['comments'][number]) =>
      set((state: VideoContext) => ({
        comments: [...state.comments, comment],
      })),
    addComments: (comments: VideoContext['comments']) =>
      set((state: VideoContext) => ({
        comments: [...state.comments, ...comments],
      })),
    setComments: (comments: VideoContext['comments']) =>
      set(() => ({ comments })),
    toggleComments: (commentsEnabled: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, commentsEnabled },
      })),
  };
}

function videoSlice(set: SetState<VideoContext>) {
  return {
    setBrandColor: (customBrandingPrimaryColor: string) =>
      set((state: VideoContext) => ({
        video: { ...state.video, customBrandingPrimaryColor },
      })),
    setChapters: (chapters?: string) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          chapters,
        },
      })),
    setDuration: (duration: number) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          videoProperties: { ...state.video.videoProperties, duration },
        },
      })),
    setIsTrimReady: (isTrimReady: boolean) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          isTrimReady,
        },
      })),
    setNudges: (nudges: VideoNudge[]) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          nudges,
        },
      })),
    setRecordingVersion: (recordingVersion: string) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          videoProperties: {
            ...state.video.videoProperties,
            recordingVersion,
          },
        },
      })),
    setVideo: (video: PartialVideo) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          ...video,
          owner: {
            ...state.video.owner,
            ...video.owner,
            avatar: {
              ...state.video.owner.avatar,
              ...video.owner?.avatar,
            },
          },
          processingInformation: {
            ...state.video.processingInformation,
            ...video.processingInformation,
          },
          thumbnails: {
            ...state.video.thumbnails,
            ...video.thumbnails,
          },
          videoProperties: {
            ...state.video.videoProperties,
            ...video.videoProperties,
          },
          id: state.video.id,
          modelId: video.id ?? state.video.modelId,
        },
      })),
    setVideoPlatform: (platform: VideoPlatform) =>
      set((state: VideoContext) => ({ video: { ...state.video, platform } })),
    setVideoProperties: (videoProperties: Partial<Video['videoProperties']>) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          videoProperties: {
            ...state.video.videoProperties,
            ...videoProperties,
          },
        },
      })),
    setVisibility: (newVisibility: VideoVisibility) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          visibility: newVisibility,
        },
      })),
    setWaveformGeneration: (waveformGeneration: string, waveformUrl?: string) =>
      set((state: VideoContext) => ({
        video: {
          ...state.video,
          waveformGeneration,
          waveformUrl,
        },
      })),
    toggleIsComplete: (enabled: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, uploadComplete: enabled },
      })),
    toggleIsMouseActive: (isActive: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, isMouseActive: isActive },
      })),
    toggleIsOnWatchLaterList: (isOnWatchLaterList: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, isOnWatchLaterList },
      })),
    toggleIsOwner: (enabled: boolean) =>
      set((state: VideoContext) => ({
        video: { ...state.video, isOwner: enabled },
      })),
  };
}

function customizationSlice(set: SetState<VideoContext>) {
  return {
    setHideOwner: (hideOwner: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideOwner },
      })),
    setHideShare: (hideShare: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideShare },
      })),
    setHideTitle: (hideTitle: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideTitle },
      })),
    setHideWatchOnLoom: (hideWatchOnLoom: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideWatchOnLoom },
      })),
    setHideSpeedSelector: (hideSpeedSelector: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideSpeedSelector },
      })),
    setWhiteLabelPlayer: (whiteLabelPlayer: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, whiteLabelPlayer },
      })),
    setShowPoweredByLoom: (showPoweredByLoom: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, showPoweredByLoom },
      })),
    setShowLoomWatermark: (showLoomWatermark: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, showLoomWatermark },
      })),
    setEnforcedPlaybar: (enforcedPlaybar?: PlaybarTypes) =>
      set((state: VideoContext) => ({
        customization: {
          ...state.customization,
          enforcedPlaybar,
        },
      })),
    setHideTopbar: (hideTopBar: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideTopBar },
      })),
    setDisplayTimeOverride: (override?: DisplayTimeOverride) =>
      set((state: VideoContext) => ({
        customization: {
          ...state.customization,
          displayTimeOverride: override,
        },
      })),
    setShowPauseOverlay: (showPauseOverlay: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, showPauseOverlay },
      })),
    setHideBackgroundPreview: (hideBackgroundPreview: boolean) =>
      set((state: VideoContext) => ({
        customization: { ...state.customization, hideBackgroundPreview },
      })),
  };
}
