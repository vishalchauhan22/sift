// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { RefObject } from 'react';

import { throttle } from '..';
import { EMOJI_SELECTOR, GRID_SELECTOR, SELECTED_EMOJI_CN } from './emoji-data';
import {
  DEFAULT_SELECTION_STATE,
  useArrowKeySelection,
} from './useArrowKeySelection';
import { GroupedEmojis } from './useEmojiData';
import { useEmojiWithSkinTone } from './useEmojiWithSkinTone';

interface NavigationProps {
  groupedEmojis: GroupedEmojis[];
  filterValue: string;
  isOpen: boolean;
  onClick: (name: string, category: string) => void;
  pickerRef: RefObject<HTMLDivElement>;
}

type ArrowKeyNavigationProps = React.PropsWithChildren<{
  groupedEmojis: GroupedEmojis[];
  filterValue: string;
  isOpen: boolean;
  onClick: (name: string, category: string) => void;
}>;

const ArrowKeyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export function ArrowKeyNavigation({
  children,
  groupedEmojis,
  filterValue,
  isOpen,
  onClick,
}: ArrowKeyNavigationProps): JSX.Element {
  const pickerRef = React.useRef<HTMLDivElement>(null);

  const { onKeyDown, onWheel } = useArrowKeyNavigation({
    groupedEmojis,
    filterValue,
    isOpen,
    onClick,
    pickerRef,
  });

  return (
    // eslint-disable-next-line styled-components-a11y/no-static-element-interactions
    <ArrowKeyWrapper
      data-name="Arrow key wrapper"
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      ref={pickerRef}
    >
      {children}
    </ArrowKeyWrapper>
  );
}

const ifSamePos = (
  categoryA: number,
  emojiA: number,
  categoryB: number,
  emojiB: number
): boolean => {
  return categoryA === categoryB && emojiA === emojiB;
};

/**
 * Hook to manage the selection state, when the user triggers a keydown event,
 * it will shift the selection to the indicated child node
 *
 * There is a single event listener on the parent wrapper component
 */

function useArrowKeyNavigation({
  groupedEmojis,
  filterValue,
  isOpen,
  onClick,
  pickerRef,
}: NavigationProps) {
  const { getEmojiNameWithSkinTone } = useEmojiWithSkinTone();
  const {
    currentSelection,
    setCurrentSelection,
    mouseScrolled,
    setMouseScrolled,
  } = useArrowKeySelection();
  const initialStates = useArrowKeySelection.getState();
  const [shouldScroll, setShouldScroll] = React.useState(false);

  const emojisPerRow = 9;
  const highlightColor = 'var(--lns-color-focusRing)';

  const resetPosition = React.useCallback(() => {
    setCurrentSelection(DEFAULT_SELECTION_STATE);
  }, [setCurrentSelection]);

  const ifSkipKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    return Boolean(
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Enter',
      ].includes(e.key) ||
        e.ctrlKey ||
        e.metaKey
    );
  };

  const onKeyDown = throttle(evt => {
    if (!pickerRef.current) {
      return;
    }

    const e = evt as React.KeyboardEvent<HTMLDivElement>;

    if (ifSkipKey(e)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // if no emojis in search result => no arrow keys will function
    const groupLength = groupedEmojis.length;

    if (!groupLength) {
      return;
    }

    // if at search bar & pressing UP/LEFT/RIGHT => do nothing
    if (
      e.key !== 'ArrowDown' &&
      !(e.key === 'Tab' && !e.shiftKey) &&
      ifSamePos(currentSelection.category, currentSelection.emoji, -1, -1)
    ) {
      return;
    }

    // if the user uses scroll bar and presses any arrow key, go back to the top
    if (mouseScrolled) {
      setCurrentSelection({
        category: 0,
        emoji: 0,
        categoryLength: groupedEmojis[0].emojis.length,
      });

      const emojisGrid = pickerRef.current.querySelector(
        GRID_SELECTOR
      ) as HTMLElement;

      emojisGrid.scrollTop = 0;

      setMouseScrolled(false);

      return;
    }

    let newPos: [number, number] | null = null;

    if (e.key === 'ArrowDown') {
      // if at the last row of the last category => do nothing
      if (
        currentSelection.category === groupLength - 1 &&
        currentSelection.emoji + emojisPerRow >= currentSelection.categoryLength
      ) {
        return;
      }

      // if at search bar => move to the first emoji
      if (
        ifSamePos(currentSelection.category, currentSelection.emoji, -1, -1)
      ) {
        newPos = [0, 0];
      }
      // if at the last row of a category => move to the first emoji of next category
      else if (
        currentSelection.emoji + emojisPerRow >=
        currentSelection.categoryLength
      ) {
        newPos = [currentSelection.category + 1, 0];
      }
      // else => move down to the next row
      else {
        newPos = [
          currentSelection.category,
          currentSelection.emoji + emojisPerRow,
        ];
      }
    } else if (e.key === 'ArrowUp') {
      // if at the top row of the first category => do nothing
      if (
        currentSelection.category === 0 &&
        currentSelection.emoji - emojisPerRow < 0
      ) {
        return;
      }

      // if at the top row of a category => move to the last emoji of prev category
      if (currentSelection.emoji - emojisPerRow < 0) {
        const newCategory = currentSelection.category - 1;

        newPos = [newCategory, groupedEmojis[newCategory].emojis.length - 1];
      }
      // else => move up to the prev row
      else {
        newPos = [
          currentSelection.category,
          currentSelection.emoji - emojisPerRow,
        ];
      }
    } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      // if at the first emoji => do nothing
      if (ifSamePos(currentSelection.category, currentSelection.emoji, 0, 0)) {
        return;
      }

      // if at the first emoji of a category => move to the last emoji of prev category
      if (currentSelection.emoji === 0) {
        const newCategory = currentSelection.category - 1;

        newPos = [newCategory, groupedEmojis[newCategory].emojis.length - 1];
      }
      // else => move left
      else {
        newPos = [currentSelection.category, currentSelection.emoji - 1];
      }
    } else if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
      // if at the last emoji => do nothing
      if (
        ifSamePos(
          currentSelection.category,
          currentSelection.emoji,
          groupLength - 1,
          groupedEmojis[groupLength - 1].emojis.length - 1
        )
      ) {
        return;
      }

      // if at the last emoji of a category => move to the first emoji of next category
      if (currentSelection.emoji === currentSelection.categoryLength - 1) {
        newPos = [currentSelection.category + 1, 0];
      }
      // else => move right
      else {
        newPos = [currentSelection.category, currentSelection.emoji + 1];
      }
    } else if (e.key === 'Enter') {
      // if at search bar and hit enter => do nothing
      if (currentSelection.category === -1 && currentSelection.emoji === -1) {
        return;
      }

      const { name, category } = getEmojiOnPos();

      onClick(name, category);
    }

    if (newPos) {
      // set the new selection
      setCurrentSelection({
        category: newPos[0],
        emoji: newPos[1],
        categoryLength: groupedEmojis[newPos[0]].emojis.length,
      });
    }
  }, 50);

  // return the category name and emoji button elements
  const getCurrentElements = React.useCallback(() => {
    if (!pickerRef.current) {
      return { name: null, emoji: null };
    }

    const name = pickerRef.current.querySelectorAll(
      `[data-name="category-name"]`
    )[currentSelection.category] as HTMLDivElement;
    const emojis = pickerRef.current.querySelectorAll(
      `[data-name="category-container"]`
    )[currentSelection.category] as HTMLDivElement;
    const emoji = emojis?.querySelectorAll(EMOJI_SELECTOR)[
      currentSelection.emoji
    ] as HTMLButtonElement;

    return { name, emoji };
  }, [currentSelection.category, currentSelection.emoji, pickerRef]);

  // update the emoji button's style
  const updateStyle = React.useCallback(() => {
    if (!pickerRef.current) {
      return;
    }

    // remove prev style
    const prevEmoji = pickerRef.current.getElementsByClassName(
      SELECTED_EMOJI_CN
    )[0] as HTMLDivElement;

    if (prevEmoji) {
      prevEmoji.style.backgroundColor = '';
      prevEmoji.classList.remove(SELECTED_EMOJI_CN);
    }

    // add style for current
    const { emoji: currentEmoji } = getCurrentElements();

    if (currentEmoji) {
      currentEmoji.style.backgroundColor = highlightColor;
      currentEmoji.classList.add(SELECTED_EMOJI_CN);
    }
  }, [getCurrentElements, pickerRef]);

  // scroll the emoji grid
  const scrollEmojisGrid = React.useCallback(() => {
    if (!pickerRef.current) {
      return;
    }

    const { name, emoji } = getCurrentElements();

    const emojisGrid = pickerRef.current.querySelector(
      GRID_SELECTOR
    ) as HTMLElement;

    if (emojisGrid && name && emoji) {
      const scrollUnderCategory =
        name.getBoundingClientRect().bottom - emoji.getBoundingClientRect().top;

      const scrollUp =
        emojisGrid.getBoundingClientRect().top -
        emoji.getBoundingClientRect().top;

      const scrollDown =
        emoji.getBoundingClientRect().bottom -
        emojisGrid.getBoundingClientRect().bottom;

      if (scrollUnderCategory > 0) {
        emojisGrid.scrollTop -= scrollUnderCategory + emoji.offsetHeight;
      } else if (scrollUp > 0) {
        emojisGrid.scrollTop -= scrollUp;
      } else if (scrollDown > 0) {
        emojisGrid.scrollTop += scrollDown + 1;
      }
    }
  }, [getCurrentElements, pickerRef]);

  // when the current selection updates => update the button styles
  React.useEffect(() => {
    updateStyle();
  }, [updateStyle, currentSelection]);

  // reset the states when picker is open. We don't want the scroll evt happen
  // at this moment so activate it after setup work is done
  React.useEffect(() => {
    if (isOpen && pickerRef.current) {
      updateStyle();
      useArrowKeySelection.setState(initialStates);

      const emojisGrid = pickerRef.current.querySelector(
        GRID_SELECTOR
      ) as HTMLElement;

      emojisGrid.scrollTop = 0;

      setShouldScroll(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when one selects an emoji with arrow keys, a scrolling evt could happen
  React.useEffect(() => {
    if (shouldScroll) {
      scrollEmojisGrid();
    }
  }, [scrollEmojisGrid, shouldScroll]);

  // if groupedEmojis changes, that means the search func is used,
  // hence we should move the selection to the first emoji
  React.useEffect(() => {
    if (groupedEmojis.length && filterValue && pickerRef.current) {
      setCurrentSelection({
        category: 0,
        emoji: 0,
        categoryLength: groupedEmojis[0].emojis.length,
      });

      const emojisGrid = pickerRef.current.querySelector(
        GRID_SELECTOR
      ) as HTMLElement;

      emojisGrid.scrollTop = 0;
    } else {
      resetPosition();
    }
  }, [
    filterValue,
    groupedEmojis,
    pickerRef,
    resetPosition,
    setCurrentSelection,
  ]);

  // handles if users use mouse to scroll the emojis grid
  const onWheel = () => {
    setMouseScrolled(true);
  };

  // acquire the emoji based on current selection
  const getEmojiOnPos = () => {
    const name =
      groupedEmojis[currentSelection.category].emojis[currentSelection.emoji]
        .short_name;

    return {
      name: getEmojiNameWithSkinTone(name.toLowerCase()),
      category: groupedEmojis[currentSelection.category].category,
    };
  };

  return {
    onKeyDown,
    onWheel,
  };
}
