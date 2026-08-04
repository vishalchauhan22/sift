import React from 'react';
import {
  ConfluenceSpace,
  ConfluenceContentTypes,
  ConfluenceContent,
} from '@js/globalTypes.generated';
import {
  ConfluenceSpaceOption,
  ConfluenceContentOption,
  SpaceOptionGroup,
  ContentOptionGroup,
} from './types';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';
import { SvgFolder } from '@loomhq/lens/icons/folder';
import { ConfluencePageAri } from '@atlassian/ari';

export const formatSpaceOptions = (
  spaces: ConfluenceSpace[]
): ConfluenceSpaceOption[] => {
  return spaces.map(formatSpaceOption);
};

export const formatSpaceOption = (
  space: ConfluenceSpace
): ConfluenceSpaceOption => {
  return {
    value: space.name!,
    id: space.id!,
    title: space.name!,
    icon: space.icon?.url,
    homePageId: getHomepageId(space.homepage),
    spaceKey: space.key,
  };
};

export const formatContentOptions = (
  content: ConfluenceContent[]
): ConfluenceContentOption[] => {
  return content.map(formatContentOption);
};

export const formatContentOption = (
  content: ConfluenceContent
): ConfluenceContentOption => {
  const isValidContentType = (
    type: unknown
  ): type is ConfluenceContentTypes => {
    return Object.values(ConfluenceContentTypes).includes(
      type as ConfluenceContentTypes
    );
  };
  const contentType = isValidContentType(content.type)
    ? content.type
    : ConfluenceContentTypes.Page;

  return {
    value: content.title!,
    id: content.id!,
    title: content.title!,
    contentType,
    icon: getContentIcon(contentType),
  };
};

// Create properly formatted space options for the Select component
export const createSpaceOptions = ({
  hasSearchInput,
  selectedSpace,
  searchedSpaces,
  defaultSpaces,
  starredSpaces,
}: {
  hasSearchInput: boolean;
  selectedSpace: ConfluenceSpaceOption | null;
  searchedSpaces: ConfluenceSpaceOption[];
  defaultSpaces: ConfluenceSpaceOption[];
  starredSpaces: ConfluenceSpaceOption[];
}): SpaceOptionGroup[] | ConfluenceSpaceOption[] => {
  // If user has added text, we shouldn't show any of the default groups below
  if (hasSearchInput) {
    return searchedSpaces.length > 0
      ? [
          {
            group: 'All spaces',
            items: searchedSpaces,
          },
        ]
      : [];
  }

  if (
    selectedSpace &&
    defaultSpaces.length === 0 &&
    starredSpaces.length === 0
  ) {
    return [selectedSpace];
  } else if (
    selectedSpace &&
    !defaultSpaces.some(space => space.id === selectedSpace.id)
  ) {
    defaultSpaces.push(selectedSpace);
  }

  const groups: SpaceOptionGroup[] = [];
  if (starredSpaces.length > 0) {
    groups.push({
      group: 'Starred spaces',
      items: starredSpaces,
    });
  }

  if (defaultSpaces.length > 0) {
    groups.push({
      group: 'Recent spaces',
      items: defaultSpaces,
    });
  }

  return groups;
};

export const createContentOptions = ({
  hasSearchInput,
  defaultContent,
  searchedContent,
  selectedParentContent,
}: {
  hasSearchInput: boolean;
  defaultContent: ConfluenceContentOption[];
  searchedContent: ConfluenceContentOption[];
  selectedParentContent: ConfluenceContentOption | null;
  selectedSpace: ConfluenceSpaceOption | null;
}): ConfluenceContentOption[] | ContentOptionGroup[] => {
  if (hasSearchInput) {
    return searchedContent.length > 0
      ? [
          {
            group: 'Content in this space',
            items: searchedContent,
          },
        ]
      : [];
  }

  if (selectedParentContent && defaultContent.length === 0) {
    return [selectedParentContent];
  } else if (
    selectedParentContent &&
    !defaultContent.some(space => space.id === selectedParentContent.id)
  ) {
    defaultContent.push(selectedParentContent);
  }

  return [
    {
      group: 'Recent',
      items: defaultContent,
    },
  ];
};

export const getInitialSpace = (
  initialValue: ConfluenceContent | undefined
): ConfluenceSpaceOption | null =>
  initialValue?.space ? formatSpaceOption(initialValue.space) : null;

export const getInitialParent = (
  initialValue: ConfluenceContent | undefined
): ConfluenceContentOption | null => {
  const homePageId = getHomepageId(initialValue?.space?.homepage);
  const isSpaceInitialLocation = homePageId && initialValue?.id === homePageId;

  return initialValue?.id && !isSpaceInitialLocation
    ? formatContentOption(initialValue)
    : null;
};

export const getContentIcon = (
  contentType: ConfluenceContentTypes
): React.ReactNode => {
  switch (contentType) {
    case ConfluenceContentTypes.Page:
      return <SvgWriteDocument />;
    case ConfluenceContentTypes.Folder:
      return <SvgFolder />;
    case ConfluenceContentTypes.Database:
      return <SvgWriteDocument />; // Default to the page icon until new lens icons are added
    case ConfluenceContentTypes.Whiteboard:
      return <SvgWriteDocument />; // Default to the page icon until new lens icons are added
    default:
      return <SvgWriteDocument />;
  }
};

export const getHomepageId = (
  homepage: ConfluenceContent | null | undefined
): string | null => {
  if (!homepage?.id) {
    return null;
  }

  const homepageId = String(homepage.id);

  // Check if the ID is in ARI format
  if (ConfluencePageAri.check(homepageId)) {
    try {
      return ConfluencePageAri.parse(homepageId).pageId;
    } catch (error) {
      return homepageId; //fallback to raw ID
    }
  }

  return homepageId;
};
