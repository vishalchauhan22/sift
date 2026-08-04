import {
  SuggestedPlaybackRates,
  SuggestedPlaybackRateNone,
} from '@js/common/video-player';

/**
 * Converts a suggested playback rate from an enum format to a number format.
 *
 * @param {SuggestedPlaybackRate} rateAsEnum - The suggested playback rate in enum format.
 * @returns {number} The suggested playback rate in number format.
 */
export const convertSuggestedPlaybackRateFromEnumToNumber = (
  rateAsEnum: Exclude<SuggestedPlaybackRates, SuggestedPlaybackRateNone>
): number => {
  // since ts and graphql can't let an enum have identifiers that start with
  // a number and contain dots (ie "."), we store the playback rates as:
  // 'x80', 'x100', etc. This func formats them from 'x170' => 1.7 for example
  return parseInt(rateAsEnum.substring(1)) / 100;
};
