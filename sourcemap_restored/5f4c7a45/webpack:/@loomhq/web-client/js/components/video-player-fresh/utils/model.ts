import { LOOM_URI } from '@js/constants/runtimeConfig';

import {
  selectIsCurrentUserLoggedInFromCache,
  useCurrentUserSelector,
} from '@js/common/current-user';
import { useAnonUserName } from '@js/common/useAnonUserName';
import {
  Task,
  CommentPost,
  Reaction,
  VideoModel,
} from '@js/common/video-player';
import {
  MaybeRestrictedVideoModel,
  useVideoContext,
} from '@js/common/video-player/context';
import type { VideoViews } from '@js/common/video-player/context/types';
import cloneDeep from 'lodash/cloneDeep';

import { getFormattedDateForHeader } from '@js/pages/share/comments/common/helpers';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { useCallback } from 'react';

import { getCloudfrontURI, getAvatarThumbForUser } from '@js/utilities/avatar';

import { Clip, trimmingUtils } from '@loomhq/shared-utilities';
import emojiReactionsConstants from '@loomhq/shared-utilities/constants/emojiReactions';

import { VideoNudge, VideoTask } from '@js/globalTypes.generated';

const { convertFullTimeToTrimTime } = trimmingUtils;

const EMOJI_MAP = emojiReactionsConstants;

const MS_IN_S = 1000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VideoFromServer = any;

export type TrimRange = {
  from: number;
  to: number;
};

export type GraphQlReactionFromServer = {
  id: string;
  time: number;
  reaction: number;
  extended_reaction?: string | null;
  user?: {
    display_name: string;
    id: string;
  };
  anon_user_id?: string;
  anon_user_name?: string;
  locallyCreated?: boolean;
  localId?: string;
};

const isLoggedIn = selectIsCurrentUserLoggedInFromCache();

type UserContext = {
  baseUrl: string;
  isLoggedUser: boolean;
};

export const userContext: UserContext = {
  baseUrl: 'https://' + LOOM_URI,
  isLoggedUser: isLoggedIn,
};

export const parseReaction = (
  reaction: GraphQlReactionFromServer,
  viewingUserId: number | null,
  anonName?: string,
  trimRanges?: TrimRange[]
): Reaction => {
  const displayName = reaction.user
    ? reaction.user.display_name
    : reaction.anon_user_name;

  const authedCanDelete = Boolean(
    reaction?.user?.id === viewingUserId?.toString()
  );

  const anonCanDelete = Boolean(
    reaction?.anon_user_id === viewingUserId?.toString()
  );

  const fallbackName = anonCanDelete && anonName ? anonName : 'Anonymous';

  const time =
    convertFullTimeToTrimTime(reaction.time, trimRanges || []) / MS_IN_S;

  return {
    modelId: reaction.id,
    displayKey: reaction.localId || reaction.id,
    type: reaction.extended_reaction
      ? reaction.extended_reaction
      : EMOJI_MAP[reaction.reaction],
    time,
    name: displayName || fallbackName,
    canDelete: authedCanDelete || anonCanDelete,
    isNew: Boolean(reaction.locallyCreated),
  };
};

export const useParseReaction = (): ((
  reaction: GraphQlReactionFromServer
) => Reaction) => {
  const { anonUserName } = useAnonUserName();
  const userId = useCurrentUserSelector(user => user.id, null) as number | null;
  const { video } = useVideoContext();

  const parseFn = useCallback(
    (reaction: GraphQlReactionFromServer) => {
      return parseReaction(
        reaction,
        userId,
        anonUserName,
        video.processingInformation?.trimRanges
      );
    },
    [userId, anonUserName, video.processingInformation?.trimRanges]
  );

  return parseFn;
};

const excludeLocallyDeleted = (
  commentOrReply: CommentFromServer | ReplyFromServer
) => {
  // don't exclude a deleted comment, so its replies can be displayed
  if ((commentOrReply as CommentFromServer).deletedAt) {
    return true;
  }

  return !commentOrReply.locallyDeleted;
};

const getFirstReply = (comment: CommentFromServer): ReplyFromServer => {
  const replies = comment.children_comments.filter(excludeLocallyDeleted);
  let firstReply = replies[0];

  // find the reply that was created first
  replies.forEach(reply => {
    if (reply.createdAt < firstReply.createdAt) {
      firstReply = reply;
    }
  });

  return firstReply;
};

const emptyCommentPost = {
  id: '',
  content: '',
  time: 0,
  name: '',
};

// happens when top comment is deleted and its only reply is locally deleted
const excludeEmptyCommentPosts = (comment: CommentPost) => {
  return comment != emptyCommentPost;
};

export const parseComment = (comment: CommentFromServer): CommentPost => {
  let commentToReturn = {
    id: comment.id,
    content: comment.plainContent,
    time: comment.time_stamp ? comment.time_stamp : 0,
    name: comment.user_name,
    createdAt: new Date(comment.createdAt),
    avatar: getAvatarThumbForUser([comment.avatar]),
    hasMore: comment.children_comments.filter(excludeLocallyDeleted).length,
  };

  // if top comment was deleted, show the first reply contents as the top comment
  if (comment.deletedAt) {
    const firstReply = getFirstReply(comment);

    if (firstReply) {
      const newValues = {
        content: firstReply.plainContent,
        name: firstReply.user_name,
        createdAt: new Date(firstReply.createdAt),
        avatar: getAvatarThumbForUser([firstReply.avatar]),
        hasMore: commentToReturn.hasMore - 1,
      };

      commentToReturn = { ...commentToReturn, ...newValues };
    } else {
      // return empty CommentPost
      return emptyCommentPost;
    }
  }

  return commentToReturn;
};

// TODO: viewx-2147-isolate-migrate-parsecomments-function: Move this function into the pages/share/ folder so it's encapsulated with comments components and functions
// parseComments will be sending comments into the createhq player
// the createhq player does not need to know about locally deleted comments or replies,
// they are only used on the overlay
export const parseComments = (comments: CommentFromServer[]): CommentPost[] => {
  return comments
    .filter(excludeLocallyDeleted)
    .map(parseComment)
    .filter(excludeEmptyCommentPosts);
};

export const parseTasks = (tasks: VideoTask[]): Task[] => {
  if (!tasks || !tasks.length) {
    return [];
  }

  const parsedTasks: Task[] = [];

  tasks.map(task => {
    parsedTasks.push({
      id: task.id,
      content: task.content as string,
      timestamp: task.time_stamp,
      formattedDate: getFormattedDateForHeader(task.approved_at, {
        showShorthand: true,
      }),
      ownerName: task.owner?.display_name ?? '',
    });
  });

  return parsedTasks;
};

/**
 * @deprecated We are moving towards a modular frontend architecture
 * Please read this doc https://hello.atlassian.net/wiki/spaces/aa324b3e46844bdf823ffd271f73adfe/pages/5212341351
 * If you need to add to this function, it means you are probably doing something wrong
 * Reach out to the WAP team in the #team-frontend-community slack channel for guidance
 */
export function parseVideo(video: VideoFromServer): VideoModel {
  video.defaultThumbnails = {
    ...video.defaultThumbnails,
    preview: video.signedThumbnails?.['animated-preview'],
  };

  const thumbnails = prependCdn(video.defaultThumbnails) as {
    defaultFullUrl: string;
    staticFullUrl: string;
    previewFullUrl: string;
  };

  const properties = video.video_properties;
  const videoFeatureFlags = cloneDeep(video.video_feature_flags);

  delete videoFeatureFlags['config-hls-js-player'];

  return {
    activeVideoTranscriptId: video.active_video_transcript_id,
    archived: video.archived,
    chapters: video.chapters,
    clips: video.clips,
    commentsEmailEnabled: video.comments_email_enabled,
    commentsEnabled: video.white_label_player ? false : video.comments_enabled,
    complete: video.complete,
    createdAt: video.createdAt,
    currentUserCanEdit: video.currentUserCanEdit,
    customBranding: video.customBranding,
    customBrandingPrimaryColor: video.customBranding?.brandPrimaryColor,
    description: video.description,
    downloadEnabled: video.download_enabled,
    downloadable: video.downloadable,
    downloadableBy: video.downloadableBy,
    emailGateVideoType: video.email_gate_video_type,
    flipThumbnail: false,
    flipVideo: false,
    folder: video.folder,
    folderId: video.folder_id,
    hasLoomBranding: video.customBranding?.brandShowBranding,
    id: video.id,
    isCommunityLoom: video.isCommunityLoom,
    isMainVideoOnPage: true,
    isOnWatchLaterList: video.viewer_marked_for_watch_later,
    isOwner: video.current_user_is_owner,
    isParentOfPersonalizedCopies: video.isParentOfPersonalizedCopies,
    isTeamShared: video.is_team_shared,
    loomBrandedPlayer: video.loom_branded_player,
    modelId: video.modelId,
    noAccess: video.viewerNeedsPermission,
    nudges: video.nudges,
    organizationId: video.organization_idv2,
    organizationName: video.organization?.name,
    owner: {
      id: video.owner_id,
      name: video.owner_full_name,
      displayName: video.owner_name,
      avatar: {
        large: video.owner_avatar?.large,
        thumb: video.owner_avatar?.thumb,
        name: video.owner_avatar?.name,
        isAtlassianMastered: video.owner_avatar?.isAtlassianMastered,
        thumbFullUrl: getAvatarThumbForUser([video.owner_avatar]),
      },
    },
    personalizationType: video.personalizationType,
    privacy: video.privacy,
    processingInformation: {
      instantEditingEnabled:
        video.processing_information.instant_editing_enabled,
      noiseSuppression: video.processing_information.noise_cancellation_type,
      replacements: video.processing_information.replacements,
      trimId: video.processing_information.trim_id,
      trimRanges: video.processing_information.trim_ranges || [],
      videoUploadMessage: video.processing_information?.videoUploadMessage,
      videoUploadValid: video.processing_information.videoUploadValid,
      splitSegmentTtl: video.processing_information.split_segment_ttl,
    },
    reactions: [],
    reactionsEnabled: video.white_label_player ? false : video.use_emojis,
    recordReplyEnabled: video.record_reply_enabled,
    s3Id: video.s3_id,
    salesforceEngagementTracking: video.salesforce_engagement_tracking,
    showAnalytics: video.show_analytics_to_viewer,
    showTranscriptToViewer: video.show_transcript_to_viewer,
    source: undefined,
    spaces: video.spaces,
    // @ts-expect-error ignore due to enabling strict null checks
    src: null,
    stylizedCaptions: video.stylizedCaptions,
    suggestedPlaybackRate: video.suggested_playback_rate,
    tasks: parseTasks(video.approvedTasks),
    thumbnails: {
      ...thumbnails,
      ...video.thumbnails,
      defaultGifPlay:
        video.thumbnails['default-gif-play'] ??
        video.thumbnails['defaultGifPlay'] ??
        null,
    },
    title: video.name,
    uploadComplete: video.complete,
    useEmojis: video.use_emojis,
    useGif: video.use_gif,
    videoFeatureFlags,
    videoProperties: {
      client: properties.client,
      externalUpload: properties.external_upload,
      format: properties.format,
      height: properties.height,
      ingestionType: properties.ingestion_type,
      liveRewindTrimmedSections: properties.liveRewindTrimmedSections,
      mediaMetadataRotation: properties.mediaMetadataRotation,
      microphoneEnabled: properties.microphone_enabled,
      os: properties.os,
      playableDuration: video.playable_duration,
      recordInternalAudio: properties.recordInternalAudio,
      recordingClient: properties.recordingClient,
      recordingType: properties.recording_type,
      recordingVersion: properties.recording_version,
      sdkPartnerId: properties.sdkPartnerIdv2,
      sourceDuration: video.source_duration,
      width: properties.width,
    },
    videoWorkspacePlan:
      video.videoWorkspacePlan || video.organization?.type || '',
    videoWorkspacePlanIncludesAI: video.organization?.planIncludesAI || false,
    videoWorkspaceSiteId: video.organization?.site_id || '',
    viewerCaptionsOn: video.viewerCaptionsOn,
    viewersCanWeave: video.viewers_can_weave,
    views: video.views,
    visibility: video.visibility,
    waveformGeneration: video.waveform_generation,
    waveformUrl: video.waveform_url,
    whiteLabelPlayer: video.white_label_player ? true : false,
  };
}

export function parseVideoEmbed(
  video: VideoFromServer
): MaybeRestrictedVideoModel {
  if (video.__typename === 'PrivateVideo') {
    return {
      id: video.id,
      noAccess: true,
    };
  }

  return parseVideo(video);
}

export type VideoFromGraphQl = {
  __typename:
    | 'RegularUserVideo'
    | 'PrivateVideo'
    | 'VideoPasswordMissingOrIncorrect';
  id: string;
  name: string;
  clips: Clip[];
  signedDefaultThumbnails: {
    default: string;
    static: string;
  };
  signedThumbnails: {
    animatedPreview: string;
  };
  owner: {
    display_name: string;
    avatars: { thumb: string }[];
  };
  totalComments: number;
  views: VideoViews;
  processing_information?: {
    replacements?: { type: 'audio' }[];
    trim_id?: number;
    instant_editing_enabled?: boolean;
    videoUploadValid: boolean;
    trim_ranges: TrimRange[];
    noise_cancellation_type?: boolean;
  };
  video_feature_flags: unknown;
  playable_duration: number;
  source_duration?: number;
  isMeetingRecording?: boolean;
  video_properties?: {
    os?: string;
    recording_version?: string;
    width: number;
    height: number;
    screen_type: string;
    mediaMetadataRotation?: number;
    ingestion_type?: string | null;
    trim_duration?: number;
    recordingClient?: string;
  };
  flipped_camera: boolean;
  video_reactions: GraphQlReactionFromServer[];
  comments_enabled: boolean;
  use_emojis: boolean;
  needs_password: boolean;
  loom_branded_player: boolean;
  complete: boolean;
  current_user_is_owner: boolean;
  white_label_player?: boolean;
  organization?: {
    brandPrimaryColor: string;
    type?: string;
    site_id?: string;
    planIncludesAI?: boolean;
  };
  nudges?: VideoNudge[];
  createdAt: string;
  viewerNeedsPermission: boolean;
};

export type ModelError = {
  id: string;
  noAccess: boolean;
};

export function parseGraphQLVideo(
  video: VideoFromGraphQl
): VideoModel | ModelError {
  if (!video) {
    return {
      id: '',
      noAccess: true,
    };
  }
  if (
    video.__typename == 'PrivateVideo' ||
    video.__typename == 'VideoPasswordMissingOrIncorrect'
  ) {
    return {
      id: video.id,
      noAccess: video.__typename == 'PrivateVideo',
    };
  }

  const properties = video.video_properties;

  const thumbnails = prependCdn({
    default: video.signedDefaultThumbnails.default,
    static: video.signedDefaultThumbnails.static,
    preview: video.signedThumbnails.animatedPreview,
  }) as {
    defaultFullUrl: string;
    staticFullUrl: string;
    previewFullUrl: string;
  };

  return {
    commentsEnabled: video.white_label_player ? false : video.comments_enabled,
    createdAt: video.createdAt,
    customBrandingPrimaryColor: video.organization?.brandPrimaryColor,
    flipThumbnail: false,
    flipVideo: false,
    id: video.id,
    isOwner: video.current_user_is_owner,
    loomBrandedPlayer: video.loom_branded_player,
    noAccess: false,
    nudges: video.nudges,
    owner: {
      name: video.owner?.display_name,
      avatar: {
        thumbFullUrl: getAvatarThumbForUser(video.owner?.avatars),
      },
    },
    processingInformation: {
      trimId: video.processing_information?.trim_id || null,
      instantEditingEnabled: Boolean(
        video.processing_information?.instant_editing_enabled
      ),
      replacements: video.processing_information?.replacements,
      videoUploadValid: Boolean(video.processing_information?.videoUploadValid),
      trimRanges: video.processing_information?.trim_ranges,
      noiseSuppression: video.processing_information?.noise_cancellation_type,
    },
    reactions: [],
    reactionsEnabled: video.white_label_player ? false : video.use_emojis,
    source: undefined,
    // @ts-expect-error ignore due to enabling strict null checks
    src: null,
    thumbnails,
    title: video.name,
    uploadComplete: video.complete,
    videoFeatureFlags: video.video_feature_flags as JSON,
    videoProperties: {
      // @ts-expect-error ignore due to enabling strict null checks
      width: properties.width,
      // @ts-expect-error ignore due to enabling strict null checks
      height: properties.height,
      // @ts-expect-error ignore due to enabling strict null checks
      recordingVersion: properties.recording_version,
      // @ts-expect-error ignore due to enabling strict null checks
      os: properties.os,
      // @ts-expect-error ignore due to enabling strict null checks
      mediaMetadataRotation: properties.mediaMetadataRotation,
      // @ts-expect-error ignore due to enabling strict null checks
      ingestionType: properties.ingestion_type,
      // @ts-expect-error ignore due to enabling strict null checks
      recordingClient: properties.recordingClient,
      playableDuration: video.playable_duration,
      sourceDuration: video.source_duration,
    },
    videoWorkspacePlan: video.organization?.type || '',
    videoWorkspacePlanIncludesAI: video.organization?.planIncludesAI || false,
    videoWorkspaceSiteId: video.organization?.site_id || '',
    views: {
      total: video.views?.total,
      distinct: video.views?.distinct,
      named: video.views?.named,
    },
    whiteLabelPlayer: video.white_label_player ? true : false,
  };
}

function prependCdn(object) {
  const obj = {};

  Object.keys(object).forEach(k => {
    obj[`${k}FullUrl`] = getCloudfrontURI(object[k]);
  });

  return obj;
}
