import React, { useEffect, useState } from 'react';
import { useLayer } from 'react-laag';

import getCaretCoordinates from 'textarea-caret';

import { Container } from '@loomhq/lens';
import { mentionUtils } from '@loomhq/shared-utilities';

import {
  track,
  Events,
  useVideoContext,
  debounce,
} from '@js/common/video-player';
import { EmojiPicker } from '@js/common/video-player/emoji-picker';
import { groupEmojisFiltered } from '@js/common/video-player/emoji-picker/emoji-picker-filter';
import { groupedEmojis } from '@js/common/video-player/emoji-picker/emojiUtil';
import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import { useMount } from '@js/hooks/useMount';

const { getContentWithParsedMentionMarkups } = mentionUtils;

// from: https://htmldom.dev/get-the-first-scrollable-parent-of-an-element/
// Starting from the given ele element, we traverse all parents up to the root of document
// For each parent node, we check if it is a scrollable node
const isScrollable = (ele: HTMLElement | null): boolean => {
  if (!ele) {
    return false;
  }

  const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const overflowYStyle = window.getComputedStyle(ele).overflowY;

  const isOverflowHidden =
    overflowYStyle.indexOf('hidden') !== -1 ||
    overflowYStyle.indexOf('visible') !== -1;
  // visible is the default with no scrollbar

  return hasScrollableContent && !isOverflowHidden;
};

const getScrollableParent = (ele: HTMLElement | null): HTMLElement | null => {
  return !ele || ele === document.documentElement
    ? document.documentElement
    : isScrollable(ele)
      ? ele
      : getScrollableParent(ele.parentElement);
};
//

const getFilteredEmojis = filterValue => {
  const filtered = groupedEmojis
    .map(group => groupEmojisFiltered({ group, filterValue }))
    .filter(group => group.emojis.length > 0);

  return filtered;
};

const getCommentContentBeforeCursor = (textArea, comment) => {
  const commentWithParsedMentions = getContentWithParsedMentionMarkups(comment);

  const cursorPosition = textArea?.selectionEnd;

  return commentWithParsedMentions.slice(0, cursorPosition);
};

export const replaceEmojiNameWithEmoji = (
  comment: string,
  getEmojiUnicodeByName: (
    variant?: string | null | undefined,
    needsMap?: boolean | undefined
  ) => string,
  textArea: HTMLTextAreaElement | null,
  videoId: string
): {
  commentWithEmoji: string | null;
  indexAfterEmoji: number | null;
} => {
  const re = /:(.*?):/g;

  const commentBeforeCursor = getCommentContentBeforeCursor(textArea, comment);

  const matches = commentBeforeCursor.match(re);

  if (matches) {
    const emojiWithColons = matches.pop();
    const emojiName = (emojiWithColons as any).replaceAll(':', '');
    const emoji = getEmojiUnicodeByName(emojiName);

    if (emoji) {
      const commentWithEmoji = comment.replace(emojiWithColons as any, emoji);
      const indexOfEmoji = commentBeforeCursor.indexOf(emojiWithColons as any);
      const indexAfterEmoji = indexOfEmoji + emoji.length;

      track({
        event: Events.QUICK_ADD_EMOJI_USED,
        payload: {
          video_id: videoId,
          selected_emoji: emojiName,
          from: 'full typed name',
        },
      });

      return { commentWithEmoji, indexAfterEmoji };
    }
  }

  return { commentWithEmoji: null, indexAfterEmoji: null };
};

export const handleEmojiSearch = (
  newComment: string,
  textArea: HTMLTextAreaElement | null,
  setEmojiSearchValue: (searchVal: string) => void,
  setEmojiPopupBounds: (bounds: DOMRect) => void,
  openEmojiPopup: () => void,
  closeEmojiPopup: () => void
): void => {
  const re = /:([^:\s]*?)$/gm;

  const commentBeforeCursor = getCommentContentBeforeCursor(
    textArea,
    newComment
  );

  const matches = commentBeforeCursor.match(re);

  if (matches && matches.length > 0) {
    const lastMatch = matches.pop();

    // if there is a non-space character before the colon :, don't show the popup
    const commentBeforeMatch = commentBeforeCursor.replace(
      lastMatch as any,
      ''
    );
    const re = /\S$/;
    const lastCharBeforeMatchIsNonSpace = re.test(
      commentBeforeMatch?.slice(-1)
    );

    // character after the match should be alphanumeric
    const isNotAlphaNumeric = /:[^a-zA-Z0-9]/;
    const characterAfterColonIsNonAlphaNumeric =
      lastMatch && isNotAlphaNumeric.test(lastMatch);

    if (lastCharBeforeMatchIsNonSpace || characterAfterColonIsNonAlphaNumeric) {
      closeEmojiPopup();

      return;
    }

    let searchVal = '';

    if (lastMatch) {
      searchVal = lastMatch?.replaceAll(':', '').replaceAll(' ', '');
    }

    setEmojiSearchValue(searchVal);

    if (searchVal !== '') {
      const filtered = getFilteredEmojis(searchVal);

      if (filtered.length === 0) {
        closeEmojiPopup();
      } else {
        openEmojiPopup();
      }
    } else {
      const coords = getCaretCoords(textArea);

      setEmojiPopupBounds(coords);
      closeEmojiPopup();
    }
  } else {
    const coords = getCaretCoords(textArea);

    setEmojiPopupBounds(coords);
    closeEmojiPopup();
  }
};

export const getCaretCoords = (
  element: HTMLInputElement | HTMLTextAreaElement | null
): DOMRect => {
  if (!element) {
    return new DOMRect();
  }

  const coords = getCaretCoordinates(element, element?.selectionEnd);

  const { width, height, x, y } = element.getBoundingClientRect();

  const updatedRect = new DOMRect(x + coords.left, y, width, height);

  return updatedRect;
};

export const setCaretPosition = (
  element: HTMLInputElement | HTMLTextAreaElement | null,
  position: number | null
): void => {
  if (position && element) {
    // doesn't work without the timeout oddly
    setTimeout(() => {
      element.setSelectionRange(position, position);
    }, 0);
  }
};

type EmojiPickerContainerProps = {
  emojiPickerIsOpen: boolean;
  closeEmojiPopup: () => void;
  searchValue: string;
  currentComment: string;
  setComment: (arg0: string) => void;
  textArea: HTMLTextAreaElement | null;
  isInPlayer?: boolean;
};

const EmojiPickerContainer = ({
  emojiPickerIsOpen,
  closeEmojiPopup,
  searchValue,
  setComment,
  currentComment,
  textArea,
  isInPlayer,
}: EmojiPickerContainerProps): JSX.Element => {
  const { getEmojiUnicodeByName } = useEmojiData();
  const { video } = useVideoContext();
  const videoId = video.id;

  const trackPickerOpenedEvent = React.useMemo(
    () =>
      debounce(() => {
        track({
          event: Events.QUICK_ADD_EMOJI_PICKER_OPENED,
          payload: { video_id: videoId },
        });
      }, 500),
    [videoId]
  );

  useMount(() => {
    trackPickerOpenedEvent();
  });

  const onClick = emojiName => {
    // get the comment content before the cursor
    const commentWithParsedMentionsBeforeCursor = getCommentContentBeforeCursor(
      textArea,
      currentComment
    );

    // get last occurrence of searchValue, right before cursor
    const searchRegex = new RegExp(`:${searchValue}$`);
    const indexOfSearch =
      commentWithParsedMentionsBeforeCursor.search(searchRegex);

    // slice the comment at the index of search value
    const commentBeforeEmoji = currentComment.slice(0, indexOfSearch);
    const commentStartingAtEmoji = currentComment.slice(indexOfSearch);

    // replace the search value with the correct emoji
    const emoji = getEmojiUnicodeByName(emojiName);
    const slicedCommentWithEmoji = commentStartingAtEmoji.replace(
      `:${searchValue}`,
      emoji
    );

    // merge the comment back together
    const fullCommentWithReplacedEmoji =
      commentBeforeEmoji + slicedCommentWithEmoji;

    closeEmojiPopup();
    setComment(fullCommentWithReplacedEmoji);

    textArea?.focus();
    const afterEmoji = indexOfSearch + emoji.length;

    setCaretPosition(textArea, afterEmoji);

    track({
      event: Events.QUICK_ADD_EMOJI_USED,
      payload: {
        video_id: videoId,
        selected_emoji: emojiName,
        from: 'picker',
      },
    });
  };

  return (
    <Container
      width="calc(44 * var(--lns-unit, 8px))"
      height="calc(40 * var(--lns-unit, 8px))"
      backgroundColor="background"
      radius="medium"
      data-lens-theme={isInPlayer ? 'dark' : undefined}
    >
      <EmojiPicker
        externalSearchValue={searchValue}
        onClick={onClick}
        placeUsed="inComment"
        isOpen={emojiPickerIsOpen}
        shouldHideCustomizableReactionList={true}
      />
    </Container>
  );
};

type QuickEmojiPopupProps = {
  triggerBounds: DOMRect;
  emojiPickerIsOpen: boolean;
  closeEmojiPopup: () => void;
  searchValue: string;
  currentComment: string;
  setComment: (arg0: string) => void;
  textArea: HTMLTextAreaElement | null;
  isInPlayer?: boolean;
};

export const QuickEmojiPopup = ({
  triggerBounds,
  emojiPickerIsOpen,
  closeEmojiPopup,
  searchValue,
  currentComment,
  setComment,
  textArea,
  isInPlayer,
}: QuickEmojiPopupProps): JSX.Element => {
  const container = isInPlayer
    ? document.getElementById('container')
    : undefined;
  const { layerProps, renderLayer } = useLayer({
    isOpen: emojiPickerIsOpen,
    placement: 'bottom-start',
    auto: true,
    possiblePlacements: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    trigger: {
      getBounds: () => triggerBounds,
    },
    onOutsideClick: () => closeEmojiPopup(),
    container: container ?? undefined,
  });
  const [scrollParent, setScrollParent] = useState<HTMLElement>();
  const [initialScrollOverflow, setInitialScrollOverflow] =
    useState<string>('');

  useEffect(() => {
    if (emojiPickerIsOpen) {
      // prevent scroll
      const parent = getScrollableParent(textArea);

      setInitialScrollOverflow(parent?.style.overflow || '');

      if (parent) {
        setScrollParent(parent);
        parent.style.overflow = 'hidden';
      }
    } else {
      // re-enable scroll
      if (scrollParent) {
        scrollParent.style.overflow = initialScrollOverflow;
      }
    }
    // adding scrollParent here breaks the experience
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiPickerIsOpen, textArea]);

  return (
    <>
      {emojiPickerIsOpen &&
        renderLayer(
          // zIndex needed within video player
          <div {...layerProps} style={{ ...layerProps.style, zIndex: 100 }}>
            <EmojiPickerContainer
              emojiPickerIsOpen={emojiPickerIsOpen}
              closeEmojiPopup={closeEmojiPopup}
              searchValue={searchValue}
              currentComment={currentComment}
              setComment={setComment}
              textArea={textArea}
              isInPlayer={isInPlayer}
            />
          </div>
        )}
    </>
  );
};
