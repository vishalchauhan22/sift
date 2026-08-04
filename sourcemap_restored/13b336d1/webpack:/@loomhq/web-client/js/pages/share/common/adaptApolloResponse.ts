/* eslint-disable sort-keys */
import { VERIFIED } from '@loomhq/shared-utilities/constants/userStatus';

import { mapThumbnailsFromServerToContext } from './mapThumbnails';

import type { GetVideoSsrQuery } from '@loomhq/graphql-preload';

/**
 * Adapts the apollo ssr query response data to match the legacy loomSSRVideo object
 * @param responseData The apollo ssr query response data
 * @returns The response data formatted to match the legacy loomSSRVideo object
 */
export const adaptApolloResponse = (
  responseData: GetVideoSsrQuery
): Record<string, any> | null => {
  const video = responseData.getVideo;
  const video_feature_flags = responseData.getFeatureFlags?.featureFlags ?? {};

  if (!video) {
    return null;
  }

  if (video?.__typename === 'VideoPasswordMissingOrIncorrect') {
    // We get almost no data from the server when the video is password protected so,
    // set properties that we know are going to be destructured to avoid errors
    return {
      ...responseData.getVideo,
      needs_password: true,
      video_properties: {},
      video_feature_flags,
      processing_information: {},
      thumbnails: {},
    };
  }

  if (video?.__typename !== 'RegularUserVideo') {
    return responseData.getVideo ?? {};
  }

  const { video_properties: videoProperties } = video;

  const mappedVideoProperties = mapNullAsUndefined(videoProperties, [
    'ingestion_type',
    'mediaMetadataRotation',
    'sdkPartnerIdv2',
  ]);

  const {
    organization: {
      id: organizationId,
      brand_logo_path: brandLogoPath = undefined,
      brand_primary_color: brandPrimaryColor = undefined,
      brand_show_branding: brandShowBranding = undefined,
      type: videoWorkspacePlan = '',
      site_id: videoWorkspaceSiteId = '',
      planIncludesAI: videoWorkspacePlanIncludesAI = '',
    } = {},
    owner: {
      first_name: owner_name = undefined,
      avatars = [],
      display_name: owner_full_name = undefined,
      status = undefined,
      profile,
    } = {},
  } = video;

  const customBranding = {
    brandLogoPath,
    brandPrimaryColor,
    brandShowBranding,
  };

  return {
    ...video,
    video_properties: {
      video_id: video.id,
      ...mappedVideoProperties,
    },
    thumbnails: mapThumbnailsFromServerToContext(video.thumbnails),
    signedThumbnails: mapThumbnailsFromServerToContext(video.signedThumbnails),
    processing_information: mapNullAsUndefined(video.processing_information, [
      'videoUploadMessage',
      'videoUploadValid',
    ]),
    customBranding,
    videoWorkspacePlan,
    videoWorkspacePlanIncludesAI,
    videoWorkspaceSiteId,
    owner_name,
    ownerProfile: profile?.profileInfo,
    ownerProfileUrl: profile?.profileUrl,
    owner_full_name,
    owner_avatar: avatars[0],
    owner_verified: status === VERIFIED,
    Organization: { ...video.organization, id: organizationId },
    video_feature_flags,
  };
};

type MapNullToUndefined<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? (T[P] extends null ? undefined : T[P]) : T[P];
};

const mapNullAsUndefined = <T, K extends keyof T>(
  obj: T,
  keys: K[]
): MapNullToUndefined<T, K> => {
  const result: Partial<T> = { ...obj };

  for (const key of keys) {
    if (result[key] === null) {
      result[key] = undefined;
    }
  }

  return result as MapNullToUndefined<T, K>;
};
