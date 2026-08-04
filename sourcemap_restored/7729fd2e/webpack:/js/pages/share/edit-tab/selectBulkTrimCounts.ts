import {
  OFF,
  FILLER_WORDS,
  FILLER_WORDS_PLUS,
  FillerWordAppliedTypes,
} from '@js/pages/common/bulk-trim-operations/constants';

import { GetEditTabBulkTrimCountsQuery } from './getEditTabBulkTrimCounts.generated';

export const selectBulkTrimCounts = (
  bulkTrimCountsData: GetEditTabBulkTrimCountsQuery | undefined
): {
  hasTrimmedSilences: boolean;
  secondsOfSilenceTrimmed: number;
  hasAnyTrimmedFillerWords: boolean;
  numberOfFillerWordsTrimmed: number;
  fillerWordAppliedType: FillerWordAppliedTypes;
} => {
  if (
    bulkTrimCountsData?.getAutoFeatureStatuses?.__typename !==
    'AutoFeatureStatuses'
  ) {
    return {
      hasTrimmedSilences: false,
      secondsOfSilenceTrimmed: 0,
      hasAnyTrimmedFillerWords: false,
      numberOfFillerWordsTrimmed: 0,
      fillerWordAppliedType: OFF,
    };
  }

  const hasTrimmedSilences =
    bulkTrimCountsData.getAutoFeatureStatuses.hasSilenceRemovalEnabled;
  const secondsOfSilenceTrimmed = hasTrimmedSilences
    ? bulkTrimCountsData.getAutoFeatureStatuses.secondsOfSilenceTrimmed
    : 0;
  const hasTrimmedFillerWords =
    bulkTrimCountsData.getAutoFeatureStatuses.hasFillerWordRemovalEnabled;
  const hasTrimmedFillerWordsPlus =
    bulkTrimCountsData.getAutoFeatureStatuses.hasFillerWordPlusRemovalEnabled;
  const numberOfFillerWordsTrimmed = hasTrimmedFillerWords
    ? bulkTrimCountsData.getAutoFeatureStatuses.numberOfFillerWordsTrimmed
    : hasTrimmedFillerWordsPlus
      ? bulkTrimCountsData.getAutoFeatureStatuses.numberOfFillerWordsPlusTrimmed
      : 0;
  const fillerWordAppliedType = hasTrimmedFillerWordsPlus
    ? FILLER_WORDS_PLUS
    : hasTrimmedFillerWords
      ? FILLER_WORDS
      : OFF;

  return {
    hasTrimmedSilences,
    secondsOfSilenceTrimmed: secondsOfSilenceTrimmed ?? 0,
    hasAnyTrimmedFillerWords:
      hasTrimmedFillerWords || hasTrimmedFillerWordsPlus,
    numberOfFillerWordsTrimmed: numberOfFillerWordsTrimmed ?? 0,
    fillerWordAppliedType,
  };
};
