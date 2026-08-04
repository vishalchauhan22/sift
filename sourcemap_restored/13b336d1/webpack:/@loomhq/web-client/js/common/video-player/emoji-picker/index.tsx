/* eslint-disable camelcase */
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { ToggleEmojiReactionListVariant } from '@js/common/emojis/toggle-emoji-reaction-list-variant';
import React, { useEffect, useMemo, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { Container, TextInput, Arrange, Text, u } from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';

import { track, usePopoverHandler, debounce, throttle } from '..';

import { Events } from '../api/analytics';
import { Emoji } from '../components/play-bar/emoji';
import { ArrowKeyNavigation } from './ArrowKeyNavigation';
import { EmojiType, SkinTone, skinTones, SKIN_TONE_KEY } from './emoji-data';
import { groupEmojisFiltered } from './emoji-picker-filter';
import { recordReaction, SUGGESTED_REACTION_NAMES } from './frequent-reactions';
import { writeToLocalStorage } from './local-storage';
import {
  DEFAULT_SELECTION_STATE,
  useArrowKeySelection,
} from './useArrowKeySelection';
import { GroupedEmojis, useEmojiData } from './useEmojiData';
import { useEmojiWithSkinTone } from './useEmojiWithSkinTone';
import { useFrequentReactions } from './useFrequentReactions';
import { useSkinTone } from './useSkinTone';

// Responsive variables
const columnSize = u(4);
const columnGap = u(0.25);
const emojiBtnSize = u(4);
const emojiSize = u(2.75);
const scrollBarWidth = u(1);
const scrollBarThumbMinHeight = u(10);

const popoverPadding = 'medium';

// As emojis on browsers are rendered with a padding at the top/bottom, they are
// not vertically centered.
// On Win, we need to add 2px padding at the bottom,
// on Mac, we do the opposite direction,
// on Safari, we don't need any padding
// Regex ref: https://stackoverflow.com/a/23522755
export const getAddPaddingTo = (): string => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  let addPaddingTo = '';

  if (!isSafari) {
    addPaddingTo = navigator.userAgent.indexOf('Win') !== -1 ? 'bottom' : 'top';
  }

  return addPaddingTo;
};

const addPaddingTo = getAddPaddingTo();

const EmojiButtonWrapper = styled.button<{ needsBorder?: boolean }>`
  height: ${emojiBtnSize};
  width: ${emojiBtnSize};
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: var(--lns-radius-medium);

  &:hover {
    background-color: var(--lns-color-focusRing);
  }

  &:focus-within {
    background-color: var(--lns-color-focusRing);
    box-shadow: 0 0 0 2px var(--lns-color-focusRing);
  }

  ${props => props.needsBorder && `border: 1px solid var(--lns-color-border);`}
`;

// Container of emojis w/ custom thin scrollbars
// TODO(next author): Please update to remove !important or leave notes that it's intended
// eslint-disable-next-line @loomhq/loom/no-important
const EmojiListWrapper = styled.div`
  overflow: auto;
  overflow-x: hidden;

  // Firefox
  scrollbar-width: thin;

  // Chrome, Safari, Opera
  &::-webkit-scrollbar {
    width: ${scrollBarWidth};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    min-height: ${scrollBarThumbMinHeight};
    border-radius: var(--lns-radius-medium);
    &:hover {
      background-color: var(--lns-color-grey5) !important;
    }
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: var(--lns-color-backgroundActive);
    }
  }
`;

const EmojiButton = ({
  emojiLabel,
  emojiUnicode,
  needsBorder,
  dataName,
  buttonRef,
  ...props
}: any) => (
  <EmojiButtonWrapper
    needsBorder={needsBorder}
    ref={buttonRef}
    data-name={dataName}
    {...props}
  >
    <Emoji
      size={emojiSize}
      aria-label={emojiLabel}
      noLetterSpacing
      addPaddingTo={addPaddingTo}
    >
      {emojiUnicode}
    </Emoji>
  </EmojiButtonWrapper>
);

const SkinToneSelector = ({
  videoId,
  searchBarRef,
}: {
  videoId?: string;
  searchBarRef: React.RefObject<HTMLInputElement>;
}) => {
  // videoId could be undefined
  const { skinTone: skinToneFromContext, setSkinTone } = useSkinTone();
  const [isOpen, setIsOpen, ref] = usePopoverHandler();
  const { getEmojiUnicodeByName } = useEmojiData();

  const selectedSkinToneName = skinToneFromContext || skinTones[0].short_name;
  const selectedSkinToneIdx = skinTones.findIndex(
    s => s.short_name === selectedSkinToneName
  );

  const [currentSkinToneIdx, setCurrentSkinToneIdx] =
    useState(selectedSkinToneIdx);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSkinToneChange = (newSkinTone: string) => {
    writeToLocalStorage(SKIN_TONE_KEY, newSkinTone);
    setSkinTone(newSkinTone);
  };

  const handleSkinToneClick = (skinTone: SkinTone) => {
    setCurrentSkinToneIdx(
      skinTones.findIndex(s => s.short_name === skinTone.short_name)
    );
    onSkinToneChange(skinTone.short_name);
    track({
      event: Events.SKIN_TONE_SELECTED,
      payload: {
        video_id: videoId,
        skinTone: skinTone.short_name,
      },
    });
    onClose();
  };

  const handleCloseSelector = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      onClose();
    }
  };

  const onKeyDown = throttle(evt => {
    const e = evt as React.KeyboardEvent<HTMLDivElement>;

    // Prevent arrow key use in emoji grid
    if (
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Enter',
      ].includes(e.key)
    ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
      if (currentSkinToneIdx === skinTones.length - 1) {
        setCurrentSkinToneIdx(0);

        return;
      }

      setCurrentSkinToneIdx(currentSkinToneIdx + 1);
    } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      if (currentSkinToneIdx === 0) {
        setCurrentSkinToneIdx(skinTones.length - 1);

        return;
      }

      setCurrentSkinToneIdx(currentSkinToneIdx - 1);
    } else if (e.key === 'Enter') {
      handleSkinToneClick(skinTones[currentSkinToneIdx]);
    }
  }, 50);

  React.useEffect(() => {
    if (!isOpen) {
      searchBarRef.current?.focus();
    }
  }, [isOpen, searchBarRef]);

  // focus on the selected skin tone button
  React.useEffect(() => {
    if (isOpen && ref.current) {
      const selectorElem = ref.current as HTMLDivElement;

      const skinTonesContainer = selectorElem.querySelector(
        `[data-name="skinTones"]`
      ) as HTMLButtonElement;

      const selectedSkinToneBtn = skinTonesContainer?.children[
        currentSkinToneIdx
      ] as HTMLButtonElement;

      if (selectedSkinToneBtn) {
        selectedSkinToneBtn.focus();
      }
    }
  }, [currentSkinToneIdx, isOpen, ref]);

  return (
    <div ref={ref}>
      <Container position="relative" onKeyDown={handleCloseSelector}>
        <EmojiButton
          needsBorder
          dataName="skinToneSelectorBtn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          emojiUnicode={getEmojiUnicodeByName(selectedSkinToneName)}
        />

        {isOpen && (
          <Container
            position="absolute"
            top="100%"
            backgroundColor="overlay"
            radius="medium"
            shadow="medium"
            padding="xsmall"
            right={0}
            zIndex={2}
            borderSide="all"
            onKeyDown={onKeyDown}
          >
            <Arrange gap={columnGap} data-name="skinTones">
              {skinTones.map(skinTone => (
                <EmojiButton
                  dataName={skinTone.label}
                  key={skinTone.label}
                  emojiLabel={skinTone.label}
                  emojiUnicode={getEmojiUnicodeByName(skinTone.short_name)}
                  onClick={() => handleSkinToneClick(skinTone)}
                />
              ))}
            </Arrange>
          </Container>
        )}
      </Container>
    </div>
  );
};

const SearchBarWrapper = styled.div`
  @media only screen and (max-width: 430px) {
    input {
      font-size: var(--lns-fontSize-large);
    }
  }
`;

const SearchBar = ({
  value,
  onChange,
  shouldFocus,
  searchBarRef,
  videoId,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shouldFocus: boolean;
  searchBarRef: React.RefObject<HTMLInputElement>;
  videoId?: string;
}) => {
  const { setCurrentSelection } = useArrowKeySelection();

  // focus the search bar when it should be
  React.useEffect(() => {
    if (searchBarRef.current && shouldFocus) {
      searchBarRef.current.focus();
    }
  }, [shouldFocus, searchBarRef]);

  const handleClick = () => {
    // move the selection to search bar
    setCurrentSelection(DEFAULT_SELECTION_STATE);
    track({
      event: Events.EXTENDED_REACTION_SEARCH_CLICKED,
      payload: { video_id: videoId },
    });
  };

  // prevent arrow key use in input field
  const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <SearchBarWrapper>
      <TextInput
        data-name="searchBar"
        ref={searchBarRef}
        placeholder="Search"
        aria-label="Search for an emoji"
        icon={<SvgSearch />}
        value={value}
        onChange={onChange}
        onKeyUp={onPress}
        onClick={handleClick}
      />
    </SearchBarWrapper>
  );
};

const EmptyGroupedEmojiList = ({ category }) => {
  return (
    <Container paddingBottom="small" data-name="category-container">
      <Container
        position="sticky"
        top={-1}
        backgroundColor="overlay"
        paddingY="small"
        paddingLeft={popoverPadding}
        data-name="category-name"
      >
        <Text color="bodyDimmed" fontWeight="bold" size="body-sm" htmlTag="h2">
          {category.category}
        </Text>
      </Container>
    </Container>
  );
};

interface GroupedEmojiListProps {
  onClick?: (name: string, category: string) => void;
  category: GroupedEmojis;
}

const GroupedEmojiList = ({ onClick, category }: GroupedEmojiListProps) => {
  const { getEmojiByName } = useEmojiWithSkinTone();
  const { getEmojiNameWithSkinTone } = useEmojiWithSkinTone();

  return category.emojis.length > 0 ? (
    <Container paddingBottom="small" data-name="category-container">
      <Container
        position="sticky"
        top={-1}
        backgroundColor="overlay"
        paddingY="small"
        paddingLeft={popoverPadding}
        data-name="category-name"
      >
        <Text color="bodyDimmed" fontWeight="bold" size="body-sm" htmlTag="h2">
          {category.category}
        </Text>
      </Container>
      <Container
        paddingTop="xsmall"
        paddingX={popoverPadding}
        data-name="category-list"
      >
        <Arrange
          columns={`repeat(auto-fill, minmax(${columnSize}, 1fr))`}
          gap={columnGap}
        >
          {category.emojis.map((emoji: EmojiType) => {
            return (
              <EmojiButton
                dataName="emoji"
                key={emoji.unified}
                emojiLabel={emoji.short_name}
                emojiUnicode={getEmojiByName(emoji.short_name)}
                onClick={() => {
                  const name = getEmojiNameWithSkinTone(
                    emoji.short_name.toLowerCase()
                  );

                  onClick && onClick(name, category.category);
                }}
                title={emoji.short_name}
              />
            );
          })}
        </Arrange>
      </Container>
    </Container>
  ) : null;
};

const EmptySearchResults = ({ isEmpty }: { isEmpty: boolean }) => {
  return isEmpty ? (
    <Container marginTop="25%">
      <Text
        color="bodyDimmed"
        fontWeight="bold"
        size="body-sm"
        alignment="center"
      >
        No emojis matched your search
      </Text>
    </Container>
  ) : null;
};

const LazyGroupedEmojiList = ({ onClick, category }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when the element enters the viewport
    threshold: 0.5, // Trigger when at least 50% of the element is visible
  });

  const isFrequentlyUsed = category.category === 'Frequently Used';

  return (
    <div ref={ref}>
      {inView ? (
        // Render when visible
        <GroupedEmojiList onClick={onClick} category={category} />
      ) : (
        // always render 'Frequently Used'
        // otherwise, render empty list with header
        <>
          {isFrequentlyUsed ? (
            <GroupedEmojiList onClick={onClick} category={category} />
          ) : (
            <EmptyGroupedEmojiList category={category} />
          )}
        </>
      )}
    </div>
  );
};

type EmojiPickerProps = {
  onClick?: (name: string) => void;
  videoId?: string;
  placeUsed?: string;
  isOpen?: boolean;
  externalSearchValue?: string;
  shouldHideCustomizableReactionList?: boolean;
  noLazyRender?: boolean;
};

export const EmojiPicker = ({
  onClick,
  videoId,
  placeUsed,
  isOpen = true,
  externalSearchValue,
  shouldHideCustomizableReactionList = false,
  noLazyRender = false,
}: EmojiPickerProps): JSX.Element => {
  const { setCurrentSelection } = useArrowKeySelection();
  const [filterValue, setFilterValue] = useState('');
  const { groupedEmojis } = useEmojiData();
  const frequentReactions = useFrequentReactions();
  const searchBarRef = React.useRef<HTMLInputElement>(null);

  const externalSearchValueAvailable =
    externalSearchValue !== null &&
    externalSearchValue !== undefined &&
    externalSearchValue !== '';

  useEffect(() => {
    if (externalSearchValueAvailable) {
      setFilterValue(externalSearchValue ?? '');
    }
  }, [externalSearchValueAvailable, externalSearchValue, setFilterValue]);

  // when a search value is given externally, don't automatically select first emoji
  useEffect(() => {
    if (externalSearchValueAvailable) {
      setCurrentSelection(DEFAULT_SELECTION_STATE);
    }
    // only check when filterValue is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fireSearchPlayerEvent = React.useCallback(
    debounce(() => {
      track({
        event: Events.EXTENDED_REACTION_SEARCHED,
        payload: {
          video_id: videoId,
          placeUsed,
        },
      });
    }, 1000),
    []
  );

  // when the search input updates, the following evts will take place:
  // - set filter val
  // - trigger analytics evt
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTxt = e.target.value;

    setFilterValue(searchTxt);
    fireSearchPlayerEvent();
  };

  const filteredGroups = useMemo(() => {
    const groups = [frequentReactions, ...groupedEmojis];

    return groups
      .map(group => groupEmojisFiltered({ group, filterValue }))
      .filter(group => group.emojis.length > 0);
  }, [frequentReactions, groupedEmojis, filterValue]);

  const isResultEmpty =
    filteredGroups
      .flatMap(group => group.emojis)
      .flatMap(emoji => emoji.short_names).length === 0;

  React.useEffect(() => {
    if (isOpen) {
      setFilterValue('');
    }
  }, [isOpen]);

  const onEmojiClicked = (name: string, category: string) => {
    // if the emoji is in 'Frequently Used' category, trigger the track event
    if (category === 'Frequently Used') {
      const isSuggested = Boolean(SUGGESTED_REACTION_NAMES.includes(name));

      track({
        event: Events.FREQUENT_EXTENDED_REACTION_CLICKED,
        payload: {
          video_id: videoId,
          selected_emoji: name,
          is_suggested: isSuggested,
        },
      });
    }

    // record the reaction for calculating Frequently Used
    recordReaction(name);
    // Submit reaction
    onClick?.(name);
  };

  // if picker is not open, return an empty layout to save performance
  if (!isOpen) {
    return <PickerLayout />;
  }

  // otherwise, return the picker
  return (
    <PickerLayout>
      <ArrowKeyNavigation
        filterValue={filterValue}
        groupedEmojis={filteredGroups}
        isOpen={isOpen}
        onClick={onEmojiClicked}
      >
        {!externalSearchValueAvailable ? (
          <Container
            paddingX={popoverPadding}
            paddingTop={popoverPadding}
            paddingBottom="small"
          >
            <Arrange columns={['1fr', 'auto']} gap="small">
              <SearchBar
                value={filterValue}
                onChange={onSearchChange}
                shouldFocus={isOpen}
                searchBarRef={searchBarRef}
                videoId={videoId}
              />

              <SkinToneSelector videoId={videoId} searchBarRef={searchBarRef} />
            </Arrange>
          </Container>
        ) : (
          // this input helps give focus to the emoji picker when searching externally
          <input
            id="emoji-picker-external-search-focus-element"
            style={{ opacity: 0, height: 0 }}
          />
        )}

        <EmojiListWrapper data-name="emoji-grid">
          <EmptySearchResults isEmpty={isResultEmpty} />
          {filteredGroups.map(category => {
            // noLazyRender is used for testing
            return noLazyRender ? (
              <GroupedEmojiList
                key={category.category}
                onClick={onEmojiClicked}
                category={category}
              />
            ) : (
              <LazyGroupedEmojiList
                key={category.category}
                onClick={onEmojiClicked}
                category={category}
              />
            );
          })}
        </EmojiListWrapper>
        {!shouldHideCustomizableReactionList ? (
          <ToggleEmojiReactionListVariant videoId={videoId} />
        ) : null}
      </ArrowKeyNavigation>
    </PickerLayout>
  );
};

const PickerLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Container borderSide="all" radius="medium" shadow="large" height="100%">
      {children}
    </Container>
  );
};
