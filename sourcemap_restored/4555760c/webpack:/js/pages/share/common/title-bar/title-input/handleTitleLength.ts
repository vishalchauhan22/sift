import { MAX_VIDEO_TITLE_LENGTH } from '@loomhq/shared-utilities/constants/video';

export function isValidVideoTitleLength(title: string): boolean {
  return title.length < MAX_VIDEO_TITLE_LENGTH;
}
