import { VideoCardSpace } from '@js/components/video-card/types';

import { DOWNLOADABLE_BY_ENUM } from '@loomhq/shared-utilities/constants/video';

import { VideoVisibility } from '@loomhq/shared-utilities/constants/visibility';

import {
  VideoNudge,
  VideoPersonalizationType,
} from '@js/globalTypes.generated';

import { EnabledFeatures, FeatureFlag } from './featureFlags';
import { PartialVideo } from './store';

export enum PlaybarTypes {
  Embed = 'embed',
  Default = 'default',
}

export type PartCredentialType = {
  Policy: string;
  Signature: string;
  'Key-Pair-Id': string;
};

export type TrimRange = {
  from: number;
  to: number;
};

export type SuggestedPlaybackRateNone = 'none';

export type SuggestedPlaybackRates =
  | SuggestedPlaybackRateNone
  | 'x80'
  | 'x100'
  | 'x120'
  | 'x150'
  | 'x170'
  | 'x200'
  | 'x250';

type NamedViews = {
  firstName: string;
  lastName: string;
  avatar?: string;
};

export type VideoViews = {
  distinct?: number;
  named?: NamedViews[];
  total: number;
};

export type CroppedDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
  full_width: number;
  full_height: number;
  position_info: {
    scale: number;
    position: { x: number; y: number };
  };
};

export type Video = {
  activeVideoTranscriptId?: string;
  archived?: boolean;
  calendarMeetingGuid?: string;
  calendarMeetingId?: string;
  chapters?: string;
  commentsEnabled: boolean;
  commentsEmailEnabled?: boolean;
  complete?: boolean;
  createdAt: string;
  customBrandingPrimaryColor?: string;
  description?: string | null;
  downloadEnabled?: boolean;
  downloadable?: boolean;
  downloadableBy?: DOWNLOADABLE_BY_ENUM;
  emailGateVideoType?: string;
  flipThumbnail?: boolean;
  flipVideo?: boolean;
  hasLoomBranding?: boolean;
  id: string;
  isCommunityLoom?: boolean;
  isMainVideoOnPage?: boolean;
  isMouseActive?: boolean;
  isOnWatchLaterList?: boolean;
  isOwner?: boolean;
  isParentOfPersonalizedCopies?: boolean;
  personalizationType?: VideoPersonalizationType | null;
  loomBrandedPlayer: boolean;
  modelId?: string;
  nudges?: VideoNudge[];
  organizationId?: string;
  organizationName?: string;
  owner: {
    avatar: {
      large?: string;
      name?: string;
      thumb?: string;
      thumbFullUrl: string | undefined;
      isAtlassianMastered?: boolean;
    };
    displayName?: string;
    id?: number;
    name: string;
  };
  platform?: VideoPlatform;
  privacy?: string;
  processingInformation?: {
    instantEditingEnabled?: boolean;
    noiseSuppression?: boolean;
    replacements?: { type: 'audio' }[];
    trimId?: number | null;
    trimProgress?: number | null;
    trimRanges?: TrimRange[];
    videoUploadMessage?: string;
    videoUploadValid?: boolean | undefined;
    splitSegmentTtl?: Date;
  };
  reactionsEnabled: boolean;
  recordReplyEnabled?: boolean;
  s3Id?: string;
  seekPreviewUrl?: string;
  showAnalytics?: boolean;
  showTranscriptToViewer?: boolean;
  source?: {
    partCredentials: PartCredentialType;
    sourceMimeType: string;
    sourceUrl: string;
    sourceUrlIsTranscoded: boolean;
  };
  spaces: VideoCardSpace[];
  src: string;
  suggestedPlaybackRate?: SuggestedPlaybackRates;
  title: string;
  thumbnails: {
    default?: string;
    defaultFullUrl: string;
    defaultGifPlay?: string;
    preview?: string;
    previewFullUrl?: string;
    static?: string;
    staticFullUrl: string;
    og_thumbnail_crop_dims?: CroppedDimensions | null;
  };
  uploadComplete: boolean;
  useEmojis?: boolean;
  useGif?: boolean;
  videoFeatureFlags?: JSON;
  videoProperties: {
    client?: string;
    externalUpload?: boolean;
    format?: string;
    height: number;
    ingestionType?: string;
    mediaMetadataRotation?: number;
    microphoneEnabled?: boolean;
    os: string;
    playableDuration: number | null;
    recordingClient?: string;
    recordingType?: string;
    recordingVersion: string;
    recordInternalAudio?: boolean;
    sourceDuration?: number | null;
    sdkPartnerId?: string;
    width: number;
    // this should be moved to processing_information
    liveRewindTrimmedSections?: TrimRange[];
  };
  viewersCanWeave?: boolean;
  views?: VideoViews;
  visibility?: VideoVisibility;
  waveformGeneration?: string;
  whiteLabelPlayer?: boolean;
  folder?: {
    id: string;
    name?: string;
  };
  stylizedCaptions?: boolean;
  viewerCaptionsOn?: boolean;
};

export type ReactionType = 'love' | 'wow' | 'joy' | 'yay' | 'up' | 'down';
export type ExtendedReactionType = ReactionType | Omit<string, ReactionType>;

export type Reaction = {
  displayKey: string; // display key is used for rendering keys
  modelId: string; // modelId matches the id in db, this is used for Delete calls
  type: ExtendedReactionType;
  time: number;
  name: string;
  canDelete?: boolean;
  isNew?: boolean;
};

export type CommentPost = {
  id: string;
  content: string;
  time: number;
  name: string;
  avatar?: string;
  createdAt?: Date;
  hasMore?: number;
  source?: string;
};

export type Task = {
  id: string;
  content: string;
  timestamp: number;
  formattedDate: string;
  ownerName: string;
};

export type { FeatureFlag, EnabledFeatures };

export type UserContext = {
  /**
   * This will be used as the unique video Id
   * instead of generating one
   */
  uid?: string;
  /**
   * The current environment's base url (eg: https://www.loom.com)
   * used when building links
   */
  baseUrl?: string;
  isLoggedUser?: boolean;
  isSdkSupported?: boolean;
  enabledFeatures?: EnabledFeatures;
  showLoomConnect?: boolean;
  isRecordReplyEnabled?: boolean;
  requestedSlackPermissionLayer?: boolean;
};

export enum SlackQueryParam {
  Unfurl = 'unfurl',
}

export enum SlackUnfurlType {
  Blocks = 'blocks',
  Legacy = 'legacy',
}

export type DisplayTimeOverride = {
  currentTime: number;
  duration: number;
};

export type EmbedCustomizationContext = {
  hideOwner?: boolean;
  hideShare?: boolean;
  hideTitle?: boolean;
  hideSpeedSelector?: boolean;
  hideWatchOnLoom?: boolean;
  whiteLabelPlayer?: boolean;
  hideTopBar?: boolean;
  showPoweredByLoom?: boolean;
  showLoomWatermark?: boolean;
  displayTimeOverride?: DisplayTimeOverride;
  enforcedPlaybar?: PlaybarTypes;
  showPauseOverlay?: boolean;
  hideBackgroundPreview?: boolean;
  isDefaultSpeed?: boolean;
  loopVideo?: boolean;
  muteVideo?: boolean;
  rawEmbedVideo?: boolean;
  minimalPlayer?: boolean;
  disableClickInteractions?: boolean;
};

export type CommentBucket = {
  time: number;
  topComment: CommentPost;
  commentCount: number;
  commentIds: string[];
  bucketId: number;
};

export enum VideoPlatform {
  sharePagePlayer = 'sharePagePlayer',
  embedPlayer = 'embedPlayer',
  slackPlayer = 'slackPlayer',
}

export type VideoModel = Video & {
  currentUserCanEdit?: boolean;
  noAccess: boolean;
  reactions: Reaction[];
  salesforceEngagementTracking: boolean;
  videoWorkspacePlan?: string;
  videoWorkspacePlanIncludesAI?: boolean;
  videoWorkspaceSiteId?: string;
  isTrimReady: boolean;
};

export type RestrictedAccessVideoModel = {
  id: Video['id'];
  noAccess: true;
};

// Either a full video or just the bare minimum to render a no access message
export type MaybeRestrictedVideoModel = VideoModel | RestrictedAccessVideoModel;

export type ModelError = {
  noAccess: boolean;
};

export type VideoContextProps = {
  video: VideoModel;
  comments?: CommentPost[];
  userContext?: UserContext;
  children?: React.ReactNode;
  customization?: EmbedCustomizationContext;
};

export type VideoContext = {
  video: VideoModel & { modelId: string };
  userContext: UserContext;
  comments: CommentPost[];
  reactions: Reaction[];
  customization: EmbedCustomizationContext;
} & VideoContextActions;

export type VideoContextActions = {
  addReaction: (reaction: Reaction) => void;
  addReactions: (reactions: Reaction[]) => void;
  addComment: (comment: CommentPost) => void;
  setComments: (comments: CommentPost[]) => void;
  deleteReaction: (reactionId: string) => void;
  setReactions: (reactions: Reaction[]) => void;
  toggleReactions: (enabled: boolean) => void;
  toggleComments: (enabled: boolean) => void;
  toggleLogged: (enabled: boolean) => void;
  setShowLoomConnect: (enabled: boolean) => void;
  toggleIsOwner: (enabled: boolean) => void;
  toggleIsOnWatchLaterList: (isOnWatchLaterList: boolean) => void;
  toggleIsComplete: (enabled: boolean) => void;
  toggleIsMouseActive: (isActive: boolean) => void;
  setNudges: (nudges: VideoNudge[]) => void;
  setVideo: (video: PartialVideo) => void;
  setVideoPlatform: (platform: VideoPlatform) => void;
  setVisibility: (visibility: VideoVisibility) => void;
  setBrandColor: (color: string) => void;
  setHideSpeedSelector: (hideSpeedSelector: boolean) => void;
  setHideOwner: (hideOwner: boolean) => void;
  setHideShare: (hideShare: boolean) => void;
  setHideTitle: (hideTitle: boolean) => void;
  setHideTopbar: (hideTopBar: boolean) => void;
  setHideWatchOnLoom: (hideWatchOnLoom: boolean) => void;
  setWhiteLabelPlayer: (whiteLabelPlayer: boolean) => void;
  setEnabledFeatures: (enabledFeatures: EnabledFeatures) => void;
  setRequestedSlackPermissionLayer: (
    requestedSlackPermissionLayer: boolean
  ) => void;
  setShowPoweredByLoom: (showPoweredByLoom: boolean) => void;
  setShowLoomWatermark: (showLoomWatermark: boolean) => void;
  setDuration: (duration: number) => void;
  setDisplayTimeOverride: (override?: DisplayTimeOverride) => void;
  setChapters: (chapters?: string) => void;
  setIsSdkSupported: (isSdkSupported: boolean) => void;
  setIsRecordReplyEnabled: (isRecordReplyEnabled: boolean) => void;
  setEnforcedPlaybar: (enforcedPlaybar?: PlaybarTypes) => void;
  setRecordingVersion: (recordingVersion: string) => void;
  setShowPauseOverlay: (showPauseOverlay: boolean) => void;
  setHideBackgroundPreview: (hideBackgroundPreview: boolean) => void;
  setVideoProperties: (
    videoProperties: Partial<Video['videoProperties']>
  ) => void;
  setIsTrimReady: (isTrimReady: boolean) => void;
  setWaveformGeneration: (
    waveformGeneration: string,
    waveformUrl?: string
  ) => void;
};

export type VideoOptionValues = {
  auto_chapters?: boolean;
  auto_cta?: boolean;
  auto_filler_word_removal?: boolean;
  auto_silence_removal?: boolean;
  auto_summary?: boolean;
  auto_tasks?: boolean;
  auto_title?: boolean;
  comments_email_enabled?: boolean;
  comments_enabled: boolean;
  download_enabled?: boolean;
  email_gate_video_type?: string;
  loom_branded_player: boolean;
  noise_suppression?: boolean;
  record_reply_enabled?: boolean;
  salesforce_engagement_tracking: boolean;
  show_analytics_to_viewer?: boolean;
  show_transcript_to_viewer?: boolean;
  stylized_captions?: boolean;
  suggested_playback_rate?: SuggestedPlaybackRates | undefined;
  use_emojis?: boolean;
  use_gif?: boolean;
  viewers_can_weave?: boolean;
  viewer_captions_on?: boolean;
};
