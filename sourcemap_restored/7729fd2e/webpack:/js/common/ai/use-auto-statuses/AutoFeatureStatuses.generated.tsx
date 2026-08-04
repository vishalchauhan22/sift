import * as Types from '../../../globalTypes.generated';

import { gql } from '@apollo/client';
export type AutoFeatureStatusesFragment = { __typename: 'AutoFeatureStatuses', id: string | null, autoTitle: string | null, autoDescription: string | null, autoTitleStatus: Types.IntelligenceStatusType | null, autoDescriptionStatus: Types.IntelligenceStatusType | null, autoChaptersStatus: Types.AutoChapterStatusesType | null, autoTasksStatus: Types.IntelligenceStatusType | null, autoTasksCount: number | null, hasSilenceRemovalEnabled: boolean, hasFillerWordRemovalEnabled: boolean, hasFillerWordPlusRemovalEnabled: boolean, numberOfFillerWordsTrimmed: number | null, numberOfFillerWordsPlusTrimmed: number | null, secondsOfSilenceTrimmed: number | null };

export const AutoFeatureStatusesFragmentDoc = gql`
    fragment AutoFeatureStatuses on AutoFeatureStatuses {
  id
  autoTitle
  autoDescription
  autoTitleStatus
  autoDescriptionStatus
  autoChaptersStatus
  autoTasksStatus
  autoTasksCount
  hasSilenceRemovalEnabled
  hasFillerWordRemovalEnabled
  hasFillerWordPlusRemovalEnabled
  numberOfFillerWordsTrimmed
  numberOfFillerWordsPlusTrimmed
  secondsOfSilenceTrimmed
}
    `;


// @ts-expect-error Hack to fix a bug in the codegen library: https://github.com/dotansimha/graphql-code-generator/issues/4900#issuecomment-2078402934
type Dummy = Types.Maybe;