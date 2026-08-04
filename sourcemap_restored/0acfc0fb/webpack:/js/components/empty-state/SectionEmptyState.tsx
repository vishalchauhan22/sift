import { useFeatureFlagValue, useFlagIsActivated } from '@js/hooks/featureFlag';
import React from 'react';

import {
  ROLLOUT_COMMUNITY_LOOMS,
  ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
} from '@loomhq/shared-utilities/constants/featureFlag';
import {
  DYNAMIC_CONFIGS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import {
  Filter,
  LibraryType,
} from '@loomhq/shared-utilities/constants/loomsPage';

import CommunitySectionEmptyState from './community-empty-state/CommunitySectionEmptyState';
import { ExperienceType, DescriptionProps } from './constants';
import DestinationSectionEmptyState from './destination-empty-state/DestinationSectionEmptyState';

type FilterCopy = Filter;

export const SectionEmptyState = ({
  libraryType,
  selectedFilters = [],
  experienceType = ExperienceType.DEFAULT,
  spaceId,
  spaceName,
  input,
}: {
  libraryType: LibraryType;
  selectedFilters?: FilterCopy[];
  experienceType?: ExperienceType;
  spaceId?: number;
  spaceName?: string;
  input?: DescriptionProps;
}): JSX.Element | null => {
  const communityLoomData = useFeatureFlagValue<any>(
    DYNAMIC_CONFIGS.CONFIG_COMMUNITY_EMPTY_STATE_LOOM_IDS,
    ControlType.DYNAMIC_CONFIG
  );

  const shouldShowCommunityLooms = useFlagIsActivated({
    flag: ROLLOUT_COMMUNITY_LOOMS,
    activationValues: ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
  });

  const communityVideos = communityLoomData?.length ? communityLoomData : [];

  if (
    shouldShowCommunityLooms === undefined ||
    communityLoomData === undefined
  ) {
    return null;
  }

  if (shouldShowCommunityLooms && communityVideos?.length > 0) {
    return (
      <CommunitySectionEmptyState
        libraryType={libraryType}
        selectedFilters={selectedFilters}
        experienceType={experienceType}
        spaceId={spaceId}
        spaceName={spaceName}
        input={input}
      />
    );
  }

  return (
    <DestinationSectionEmptyState
      libraryType={libraryType}
      selectedFilters={selectedFilters}
      experienceType={experienceType}
      spaceId={spaceId}
      spaceName={spaceName}
    />
  );
};

export { EmptyStateType } from './constants';

// eslint-disable-next-line import/no-default-export
export default SectionEmptyState;
