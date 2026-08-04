import { Phrase } from '@loomhq/shared-utilities';
/**
 * Determines whether to show a speaker name for a given phrase in a transcript.
 *
 * Show speaker names when:
 * [1] Speaker name exists for phrase
 * [2] First phrase in the transcript (index 0)
 * [3] Non-first phrase in transcript is unique from previous phrase's speaker
 *
 * @param speakerName - Speaker name for the current phrase
 * @param index - Index of the current phrase in the transcript
 * @param prevPhrase - Previous phrase in the transcript (opt)
 * @returns true to display speaker name, else false
 */

export const shouldShowSpeakerName = (
  speakerName: string | undefined,
  index: number,
  prevPhrase?: Phrase
): boolean => {
  // [1]
  if (!speakerName) {
    return false;
  }

  // [2]
  if (index === 0) {
    return true;
  }

  if (!prevPhrase) {
    return false;
  }

  // [3]
  const previousSpeaker = prevPhrase?.speakerName;
  return speakerName !== previousSpeaker;
};
