import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

const borderRadius = '20px 20px 24px 24px';

const highlightContainer = `
  margin-left: calc(-1 * var(--lns-space-small));
  margin-right: calc(-1 * var(--lns-space-small));
  padding-left: var(--lns-space-small);
  padding-right: var(--lns-space-small);
  padding-bottom: calc(-1 * var(--lns-space-small));
`;

const styleForHighlight = `
  background-color: var(--lns-color-highlight);
  ${highlightContainer}
`;

const styleForHover = `
  background-color: var(--lns-color-backgroundSecondary);
  ${highlightContainer}
`;

const highlightCommentAnimationOnPageLoad = keyframes`
10% {
  background-color: none;
}
30% {
  ${styleForHighlight}
}
80% {
  ${styleForHighlight}
}
100% {
  background-color: none;
}
`;

const highlightCommentAnimationOnCommentIconClick = keyframes`
0% {
  ${styleForHighlight}
}

80% {
  ${styleForHighlight}
}

100% {
  background-color:none;
}
`;

// When the video passes over a comment bucket, code in createhq adds the class "sidebar-comment-thread-hover-auto" or "sidebar-comment-thread-hover-manual"
// to the top level comment thread which highlights it.
// demo: https://share.cleanshot.com/1XxRJRCV
export const CommentThreadWrapper = styled.div`
  &.sidebar-comment-thread-hover-auto {
    ${styleForHover}
    border-radius: ${borderRadius};
  }

  &.sidebar-comment-thread-hover-manual {
    ${styleForHighlight};
    border-radius: ${borderRadius};
  }

  margin-bottom: 4px;
`;

export const CommentHighlightWrapperOnCommentIconClick = styled.div({
  borderRadius,
  animation: `${highlightCommentAnimationOnCommentIconClick} 1500ms ease-in-out`,
});

export const CommentHighlightWrapperOnPageLoad = styled.div({
  borderRadius,
  animation: `${highlightCommentAnimationOnPageLoad} 3000ms ease-in-out`,
});

export const CommentHoverWrapper = styled.div<{
  show: boolean;
}>(
  props =>
    props.show &&
    `
      &:hover {
        ${styleForHover}
        border-radius: ${borderRadius};

      }
    `
);
