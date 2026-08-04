import { ConsolidatedEditGetVideoDocument } from '../ConsolidatedEditGetVideo.generated';
import { ConsolidatedEditFetchTimestampedWordsDocument } from './use-editable-video-transcript/ConsolidatedEditFetchTimestampedWords.generated';
import { ConsolidatedEditGetAutoTrimStatusesDocument } from '../right-nav-bar/common/use-bulk-trim-mutations/ConsolidatedEditGetAutoTrimStatuses.generated';
import { ConsolidatedEditGetVideoBackgroundDocument } from '../right-nav-bar/add-background-button/ConsolidatedEditGetVideoBackground.generated';

export const REFETCH_QUERIES_ON_CLIP_OPERATION = [
  ConsolidatedEditGetVideoDocument, // The video plus it's trim ranges
  ConsolidatedEditFetchTimestampedWordsDocument, // Transcript
];

export const REFETCH_QUERIES_ON_BULK_TRIM_OPERATION = [
  ConsolidatedEditGetVideoDocument, // The video plus it's new trim ranges
  ConsolidatedEditGetAutoTrimStatusesDocument, // The status of which bulk trim`s have been applied
];

export const REFETCH_QUERIES_ON_REVERT_TO_ORIGINAL = [
  ConsolidatedEditGetVideoDocument, // The video plus it's trim ranges
  ConsolidatedEditFetchTimestampedWordsDocument, // Transcript
  ConsolidatedEditGetAutoTrimStatusesDocument, // The status of which bulk trim`s have been applied
  ConsolidatedEditGetVideoBackgroundDocument, // The video background
];
