import { useCallback } from 'react';
import { formatTimeStamp } from '@js/utilities/transcriptList';

import copy from 'copy-to-clipboard';

import { Transcript } from '@loomhq/shared-utilities';

type UseCopyTranscriptProps = {
  transcript: Transcript;
};

export const useCopyTranscript = ({
  transcript,
}: UseCopyTranscriptProps): (() => void) => {
  return useCallback(() => {
    const { phrases } = transcript;

    if (phrases.length < 1) {
      return;
    }

    // formatTimeStamp requires a playable duration. Using the last phrase's timestamp as a "good enough" as we don't have playable duration available to us here
    const lastPhraseTimestamp = phrases[phrases.length - 1].ts;

    let text = '';

    phrases.forEach(({ ts, value, speakerName }) => {
      const timestamp = formatTimeStamp(ts, lastPhraseTimestamp);

      if (!speakerName) {
        text += `${timestamp} ${value}\n`;
      } else {
        text += `${timestamp} ${speakerName}: ${value}\n`;
      }
    });

    copy(text);
  }, [transcript]);
};
