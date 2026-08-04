import { LARGE_DESKTOP_MIN_WIDTH } from '@js/constants/breakpoints';

import { HEADER_AND_BANNER_HEIGHT } from '@js/constants/heights';

import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import {
  getCommentTabHeaderHeight,
  getTabsHeight,
} from '@js/components/share-video-fresh/right-panel/heights';
import { useCommentStore } from '@js/pages/share/comments/common/createStore';
import React, { useCallback, useMemo } from 'react';

import { useMatchMedia } from '@js/hooks/useMatchMedia';

import {
  CommentHighlightWrapperOnCommentIconClick,
  CommentHighlightWrapperOnPageLoad,
} from './commentHoverAndHighlightStyles';

const SCROLL_MARGIN_TOP_EXTRA_PADDING = 16;

type HighlightElementAndConditionallyScrollProps = {
  children: JSX.Element;
  shouldScroll: boolean;
  inActivitySidebar?: boolean;
  onPageLoad?: boolean;
  cleanupAfterHighlight?: (node: JSX.Element | null) => void;
};

export const HighlightElementAndConditionallyScroll = ({
  children,
  shouldScroll,
  inActivitySidebar,
  onPageLoad,
  cleanupAfterHighlight,
}: HighlightElementAndConditionallyScrollProps): JSX.Element => {
  const { sharePageSelectedComments, setSharePageSelectedComments } =
    useCommentStore();
  const isSharePlayer = Boolean(sharePageSelectedComments.length) || onPageLoad;
  const areCommentsBelowVideo =
    useMatchMedia(`(max-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`) ||
    !inActivitySidebar;
  const shouldShowNewCommentEntryPoint = useIsCurrentUserLoggedIn();

  // callback allows us to scroll and highlight if same comment bucket clicked twice
  const handleRef = useCallback(
    (node: any) => {
      if (!node || !shouldScroll) {
        return;
      }

      // Check if an input or textarea currently has focus so we don't
      // scroll around while the user is typing a comment reply
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          (activeElement as HTMLElement).contentEditable === 'true');

      if (isInputFocused) {
        return;
      }

      node.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });

      if (cleanupAfterHighlight) {
        cleanupAfterHighlight(node);
      }

      node.addEventListener('animationend', () => {
        setSharePageSelectedComments([]);
      });
    },
    [setSharePageSelectedComments, shouldScroll, cleanupAfterHighlight]
  );

  const calculateScrollOffset = useMemo(() => {
    let scrollOffset = '0';

    if (isSharePlayer && shouldScroll) {
      if (areCommentsBelowVideo) {
        scrollOffset = `calc(${HEADER_AND_BANNER_HEIGHT} + ${SCROLL_MARGIN_TOP_EXTRA_PADDING}px)`;
      } else {
        let offset = getTabsHeight() + SCROLL_MARGIN_TOP_EXTRA_PADDING;

        if (shouldShowNewCommentEntryPoint) {
          offset += getCommentTabHeaderHeight();
        }

        scrollOffset = `${offset}px`;
      }
    }

    return scrollOffset;
  }, [
    isSharePlayer,
    shouldScroll,
    areCommentsBelowVideo,
    shouldShowNewCommentEntryPoint,
  ]);

  if (onPageLoad) {
    return shouldScroll ? (
      <CommentHighlightWrapperOnPageLoad
        ref={handleRef}
        style={{ scrollMarginTop: calculateScrollOffset }}
      >
        {children}
      </CommentHighlightWrapperOnPageLoad>
    ) : (
      children
    );
  }

  return (
    <CommentHighlightWrapperOnCommentIconClick
      ref={handleRef}
      style={{ scrollMarginTop: calculateScrollOffset }}
    >
      {children}
    </CommentHighlightWrapperOnCommentIconClick>
  );
};
