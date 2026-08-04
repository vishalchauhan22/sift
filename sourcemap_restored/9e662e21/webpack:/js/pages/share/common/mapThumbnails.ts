import {
  THUMB_VIDEO_PREVIEW,
  THUMB_GIF_PLAY,
  THUMB_GIF,
  THUMB_FULL_PLAY,
  THUMB_FULL,
  OG_THUMB_FULL,
  THUMB_DEFAULT_PLAY,
  THUMB_DEFAULT_4x3,
  THUMB_DEFAULT,
} from '@loomhq/shared-utilities/constants/video';

export interface ThumbnailsFromServer {
  default: string | null;
  default4X3: string | null;
  defaultPlay: string | null;
  ogFull: string | null;
  full: string | null;
  fullPlay: string | null;
  defaultGif: string | null;
  defaultGifPlay: string | null;
  animatedPreview: string | null;
}

export interface ThumbnailsFromContext {
  [THUMB_DEFAULT]: string | null;
  [THUMB_DEFAULT_4x3]: string | null;
  [THUMB_DEFAULT_PLAY]: string | null;
  [OG_THUMB_FULL]: string | null;
  [THUMB_FULL]: string | null;
  [THUMB_FULL_PLAY]: string | null;
  [THUMB_GIF]: string | null;
  [THUMB_GIF_PLAY]: string | null;
  [THUMB_VIDEO_PREVIEW]: string | null;
}

export const mapThumbnailsFromServerToContext = (
  thumbnails: ThumbnailsFromServer
): ThumbnailsFromContext => ({
  [THUMB_DEFAULT]: thumbnails.default,
  [THUMB_DEFAULT_4x3]: thumbnails.default4X3,
  [THUMB_DEFAULT_PLAY]: thumbnails.defaultPlay,
  [OG_THUMB_FULL]: thumbnails.ogFull,
  [THUMB_FULL]: thumbnails.full,
  [THUMB_FULL_PLAY]: thumbnails.fullPlay,
  [THUMB_GIF]: thumbnails.defaultGif,
  [THUMB_GIF_PLAY]: thumbnails.defaultGifPlay,
  [THUMB_VIDEO_PREVIEW]: thumbnails.animatedPreview,
});

export const mapThumbnailsFromContextToServer = (
  thumbnails: ThumbnailsFromContext
): ThumbnailsFromServer => ({
  default: thumbnails[THUMB_DEFAULT],
  default4X3: thumbnails[THUMB_DEFAULT_4x3],
  defaultPlay: thumbnails[THUMB_DEFAULT_PLAY],
  ogFull: thumbnails[OG_THUMB_FULL],
  full: thumbnails[THUMB_FULL],
  fullPlay: thumbnails[THUMB_FULL_PLAY],
  defaultGif: thumbnails[THUMB_GIF],
  defaultGifPlay: thumbnails[THUMB_GIF_PLAY],
  animatedPreview: thumbnails[THUMB_VIDEO_PREVIEW],
});
