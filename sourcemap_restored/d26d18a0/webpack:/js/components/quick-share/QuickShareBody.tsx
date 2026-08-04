import { SHARE_TYPEAHEAD_SEARCH_QUERIED } from '@js/constants/events';

import React, { useMemo, useState } from 'react';

import { Spacer, Text } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import { VideoCardSpace } from '../video-card/types';
import { SearchBar } from './SearchBar';
import ShareToggle from './ShareToggle';
import { SuggestedSpacesTable } from './SuggestedSpacesTable';
import { QUICK_SHARE_MODAL_VARIANT } from './popover';
import { SuggestedSpace } from './useSuggestedSpaces';

export function QuickShareBody({
  allSpaces,
  selectedSpaceIdSet,
  setSelectedSpaces,
  title,
  showToggle = false,
  onShare,
  spaces,
  isModal = false,
}: {
  allSpaces: SuggestedSpace[];
  selectedSpaceIdSet: Set<string>;
  setSelectedSpaces: (spaces: SuggestedSpace[]) => void;
  title: string;
  showToggle?: boolean;
  isModal?: boolean;
  onShare?: (
    newSpaces: VideoCardSpace[],
    oldSpaces: VideoCardSpace[],
    toastMessage: string
  ) => void;
  spaces?: VideoCardSpace[];
}): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [firstKeyPressed, setFirstKeyPressed] = useState(false);

  const spacesInTable = showToggle
    ? allSpaces.filter(space => !space.is_primary)
    : allSpaces;

  const spaceIdSet = new Set(spaces?.map(space => space.id));

  const spacesToShow = useMemo(() => {
    // if the user is searching for something, show the search results otherwise show all possible values
    const results = inputValue
      ? spacesInTable.filter(space =>
          space?.name?.toLowerCase().includes(inputValue.toLowerCase())
        )
      : spacesInTable;

    if (inputValue) {
      analytics.track(SHARE_TYPEAHEAD_SEARCH_QUERIED, {
        modal_variant: QUICK_SHARE_MODAL_VARIANT,
        total_results: results.length,
        spaces: results.length,
      });
    }

    return results;
  }, [spacesInTable, inputValue]);

  return (
    <>
      <div className="p:medium">
        <Spacer bottom="small">
          <Text htmlTag="h1" size="body-md" alignment="left" fontWeight="bold">
            {title}
          </Text>
        </Spacer>
        <SearchBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          firstKeyPressed={firstKeyPressed}
          setFirstKeyPressed={setFirstKeyPressed}
          modalVariant={QUICK_SHARE_MODAL_VARIANT}
        />
        {spaces && showToggle && (
          <>
            <Spacer bottom="medium" />
            <ShareToggle
              isSwitchDisabled={false}
              spaces={spaces}
              onChange={onShare}
            />
          </>
        )}
      </div>
      <SuggestedSpacesTable
        spacesToShow={spacesToShow}
        spaceIds={spaceIdSet}
        selectedSpaceIds={selectedSpaceIdSet}
        setSelectedSpaces={setSelectedSpaces}
        inputValue={inputValue}
        showPrimarySpaceDescription={!isModal}
      />
    </>
  );
}
