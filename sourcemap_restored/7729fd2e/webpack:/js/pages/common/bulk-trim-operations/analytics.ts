import {
  EDIT_TOGGLE_FILLER_WORDS_PLUS,
  TOGGLE_FILLER_WORD_REMOVAL,
  TOGGLE_SILENCE_REMOVAL,
} from '@js/constants/events';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

export const fireFillerWordToggleEvent = ({
  videoId,
  enabled,
  type,
  source,
  wordsRemoved,
  inFillerWordsPlusFlag,
}: {
  videoId: string;
  enabled: boolean;
  source: 'share-page' | 'edit-page';
  type: 'regular' | 'plus' | null;
  wordsRemoved?: number;
  inFillerWordsPlusFlag: boolean;
}): void => {
  if (inFillerWordsPlusFlag) {
    analytics.track(EDIT_TOGGLE_FILLER_WORDS_PLUS, {
      ...withIdentifiers(
        EDIT_TOGGLE_FILLER_WORDS_PLUS,
        AnalyticsEntityId.video(videoId, 'videoId')
      ),
      source,
      enabled,
      type,
      words_removed: wordsRemoved,
    });
  } else {
    // keeping the event the same as the old one for now
    analytics.track(TOGGLE_FILLER_WORD_REMOVAL, {
      ...withIdentifiers(
        TOGGLE_FILLER_WORD_REMOVAL,
        AnalyticsEntityId.video(videoId, 'videoId')
      ),
      source: source === 'edit-page' ? 'consolidated_editor' : undefined,
      enabled,
      words_removed: wordsRemoved,
    });
  }
};

export const fireSilenceToggleEvent = ({
  videoId,
  enabled,
  source,
  secondsRemoved,
}: {
  videoId: string;
  enabled: boolean;
  source: 'share-page' | 'edit-page';
  secondsRemoved?: number;
}): void => {
  analytics.track(TOGGLE_SILENCE_REMOVAL, {
    ...withIdentifiers(
      TOGGLE_SILENCE_REMOVAL,
      AnalyticsEntityId.video(videoId, 'videoId')
    ),
    source: source === 'edit-page' ? 'consolidated_editor' : undefined,
    enabled,
    seconds_removed: secondsRemoved,
  });
};
