import React from 'react';

import * as logger from '@js/utilities/loggerx';

import { Arrange, Container, Text } from '@loomhq/lens';
import {
  CREATED_BY_ME_FILTER,
  IN_FOLDER_FILTER,
  PUBLISHED_FILTER,
  CREATED_BY_OTHERS_FILTER,
  MEETING_RECORDING_FILTER,
  LibraryType,
  Filter,
} from '@loomhq/shared-utilities/constants/loomsPage';
import { Team } from '@loomhq/shared-utilities/constants/product';

import { CustomButtonType, ExperienceType } from '../constants';
import AddVideoToSpaceSearchButton from './buttons/AddVideoToSpaceSearchButton';
import {
  EMPTY_SECTION_DEFAULT_OPTION,
  SECTION_EMPTY_STATE_CONTENT,
  SectionFilterType,
} from './constants';
import styles from './styles.module.less';

type FilterCopy = Filter;

export const findEmptyStateContent = (
  libraryType: LibraryType,
  selectedFilters: FilterCopy[],
  experienceType: ExperienceType
): {
  title: string;
  description: string;
  button?: CustomButtonType;
  buttonText?: string;
  illustration?: string;
  imgWidth?: string;
} => {
  const selectedFilterSet = new Set(selectedFilters.map(filter => filter.type));
  let filterType = SectionFilterType.NO_FILTER;

  if (selectedFilters.length === 0) {
    filterType = SectionFilterType.NO_FILTER;
  } else if (
    selectedFilterSet.has(CREATED_BY_ME_FILTER) &&
    selectedFilterSet.has(PUBLISHED_FILTER) &&
    selectedFilterSet.size === 2
  ) {
    filterType = SectionFilterType.CREATED_AND_POSTED_FILTER;
  } else if (
    selectedFilterSet.has(CREATED_BY_ME_FILTER) &&
    selectedFilterSet.size === 1
  ) {
    filterType = SectionFilterType.CREATED_FILTER;
  } else if (
    selectedFilterSet.has(CREATED_BY_OTHERS_FILTER) &&
    selectedFilterSet.size === 1
  ) {
    filterType = SectionFilterType.CREATED_BY_OTHERS_FILTER;
  } else if (
    selectedFilterSet.has(PUBLISHED_FILTER) &&
    selectedFilterSet.size === 1
  ) {
    filterType = SectionFilterType.POSTED_FILTER;
  } else if (
    selectedFilterSet.has(IN_FOLDER_FILTER) &&
    selectedFilterSet.size === 1
  ) {
    filterType = SectionFilterType.IN_FOLDER_FILTER;
  } else if (selectedFilterSet.has(MEETING_RECORDING_FILTER)) {
    filterType = SectionFilterType.MEETING_RECORDING_FILTER;
  } else {
    filterType = SectionFilterType.DEFAULT;
  }

  if (
    SECTION_EMPTY_STATE_CONTENT[libraryType]?.[experienceType]?.[filterType]
  ) {
    return (
      // added to appease tsx
      SECTION_EMPTY_STATE_CONTENT[libraryType]?.[experienceType]?.[
        filterType
      ] || EMPTY_SECTION_DEFAULT_OPTION
    );
  }

  logger.error(
    new Error(
      `Unable to find SECTION_EMPTY_STATE_CONTENT in DestinationSectionEmptyState`
    ),
    {
      libraryType: LibraryType[libraryType],
      experienceType: ExperienceType[experienceType],
      sectionFilterType: SectionFilterType[filterType],
    },
    {
      team: Team.IntegrateOrganizeCollaborate,
    }
  );

  return EMPTY_SECTION_DEFAULT_OPTION;
};

const DestinationSectionEmptyState = ({
  libraryType,
  selectedFilters = [],
  experienceType,
  spaceId,
  spaceName,
}: {
  libraryType: LibraryType;
  selectedFilters?: FilterCopy[];
  experienceType: ExperienceType;
  spaceId?: number;
  spaceName?: string;
}): JSX.Element | null => {
  const { title, description, button, buttonText, illustration, imgWidth } =
    findEmptyStateContent(libraryType, selectedFilters, experienceType);

  return (
    <Container padding={3}>
      <Arrange minHeight="10.125rem" justifyContent="center">
        <Arrange autoFlow="row" gap="medium" maxWidth="27rem">
          {illustration && (
            <Arrange alignItems="center" justifyContent="center">
              {/* TODO(next author): Add meaningful alt text for below img if it provides visual context and is not purely decorative. Otherwise, if the image is purely decorative, remove this todo as alt="" will suffice. */}
              <img src={illustration} width={imgWidth} alt="" />
            </Arrange>
          )}

          <Text
            fontWeight="bold"
            alignment="center"
            size="heading-sm"
            htmlTag="h2"
          >
            {title}
          </Text>
          {description && (
            <Text
              className={styles.textWithNewline}
              alignment="center"
              color="bodyDimmed"
              size="body-lg"
            >
              {description}
            </Text>
          )}

          {button === CustomButtonType.ADD_VIDEO_TO_SPACE_SEARCH && (
            <AddVideoToSpaceSearchButton
              spaceId={spaceId}
              spaceName={spaceName}
              buttonText={buttonText}
            />
          )}
        </Arrange>
      </Arrange>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default DestinationSectionEmptyState;
