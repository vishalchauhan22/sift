import { COMMENT_TEXT_AREA_ID_IN_SIDEBAR_ENTRY_POINT } from '@js/constants/comments';
import { RIGHT_PANEL_COMMENT_INPUT_FOCUSED } from '@js/constants/events';
import * as analytics from '@js/utilities/analytics';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import {
  selectDisplayName,
  useCurrentUserSelector,
} from '@js/common/current-user';

import {
  useCurrentTime,
  usePlayer,
  useVideoContext,
} from '@js/common/video-player';
import UserAvatar from '@js/components/user-avatar';

import { useIsEligibleForAiNudgeDisplay } from '@js/hooks/aiNudges';

import { useFetchNudges } from '@js/hooks/useFetchNudges';

import { CommentTextArea } from '@js/pages/share/comments/common/comment-text-area';
import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import { useFetchComments } from '@js/pages/share/comments/common/hooks';
import { useCommentsFullSize } from '@js/pages/share/common';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { getAvatarThumbForUser } from '@js/utilities/avatar';

import { getTotalCountOfCommentsAndChildrenComments } from '@js/utilities/comments';

import { Arrange, Button, Loader } from '@loomhq/lens';
import { timeUtils } from '@loomhq/shared-utilities';

import { VideoNudge } from '@js/globalTypes.generated';

import { AiNudgesRightPanel } from './ai-nudges/index';

import { CommentEntryPointIconButtons } from './comment-entry-point-icon-buttons';
import { useGetGradientBreakpointForCustomBgStyle } from './useGetGradientBreakpointForCustomBgStyle';

const { secondsToVideoTS } = timeUtils;

// TODO(next author): Please update to remove !important or leave notes that it's intended
// eslint-disable-next-line @loomhq/loom/no-important
const CommentEntryPointContainer = styled.div<{
  isExpanded: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  shouldShowErrorState: boolean;
  bgGradientBreakpoint: number;
  shouldAddBgGradient: boolean;
}>`
  transition: box-shadow 0.3s;
  ${props =>
    props.shouldShowErrorState
      ? `box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth) var(--lns-color-danger);
    &:hover {
      box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      var(--lns-color-danger);
    }`
      : props.isFocused
        ? `box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-primaryHover),
            0 0 0 var(--lns-formFieldBorderWidthFocus) var(--lns-color-focusRing);`
        : `box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth) var(--lns-color-formFieldBorder);
          &:hover {
            box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
            var(--lns-color-primaryHover);
          }`}

  border-radius: var(--lns-radius-250);
  ${props =>
    props.shouldAddBgGradient
      ? `background: linear-gradient(to bottom, var(--lns-color-formFieldBackground) ${props.bgGradientBreakpoint}%, #f7f7f8 ${props.bgGradientBreakpoint}%);`
      : 'background-color: var(--lns-color-formFieldBackground) !important;'}

  padding: 12px 16px;

  ${props =>
    props.isExpanded ? `` : `display: flex; justify-content: space-between;`}

  ${props => (props.isDisabled ? `opacity: 0.5; pointer-events: none;` : ``)}

  width: auto;
`;

const AvatarAndCommentTextAreaWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ActionButtonsWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;

  ${props => (props.isExpanded ? `padding-top: var(--lns-space-small);` : ``)}
`;

type CommentEntryPointProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  comment: string;
  setComment: (comment: string) => void;
  setNudgeAndHasNudgeBeenSelected: (nudge?: VideoNudge) => void;
  hasAiNudgeBeenSelectedRef: React.RefObject<boolean | null>;
  canSubmit: boolean;
  onSubmit: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => false | undefined;
  isReply: boolean;
  shouldShowLoadingState?: boolean;
  shouldShowErrorState?: boolean;
};

export const CommentEntryPoint = ({
  textAreaRef,
  comment,
  setComment,
  setNudgeAndHasNudgeBeenSelected,
  hasAiNudgeBeenSelectedRef,
  canSubmit,
  onSubmit,
  isReply,
  shouldShowLoadingState,
  shouldShowErrorState = false,
}: CommentEntryPointProps): JSX.Element => {
  const {
    video: {
      id: videoId,
      isOwner,
      owner: { displayName: videoOwnerName },
    },
  } = useVideoContext();

  const { comments } = useFetchComments();
  const { nudges } = useFetchNudges();
  const containerRef = useRef<HTMLDivElement>(null);
  const fullSize = useCommentsFullSize();
  const inputSize = fullSize ? 'medium' : 'small';
  const { currentTime } = useCurrentTime(videoId);
  const avatars = useCurrentUserSelector(user => user.avatars, []);
  const displayName = useCurrentUserSelector(selectDisplayName, undefined);
  const player = usePlayer(videoId);

  const avatarSrc = getAvatarThumbForUser(avatars);

  const isEligibleForAiNudgeDisplay = useIsEligibleForAiNudgeDisplay();
  const [isCommentInputContainerExpanded, setIsCommentInputContainerExpanded] =
    useState(
      isEligibleForAiNudgeDisplay &&
        getTotalCountOfCommentsAndChildrenComments(comments) < 2
    );
  const [isCommentInputContainerFocused, setIsCommentInputContainerFocused] =
    useState(false);

  const [commentEdited, _setCommentEdited] = useState(false);
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
  const shouldCustomizeCommentContainerForNudges =
    isEligibleForAiNudgeDisplay &&
    !hasAiNudgeBeenSelectedRef?.current &&
    isCommentInputContainerExpanded;
  const bgGradientBreakpoint =
    useGetGradientBreakpointForCustomBgStyle(containerRef);

  const setCommentEdited = useCallback(() => {
    if (!commentEdited) {
      _setCommentEdited(true);
    }
  }, [commentEdited]);

  const onKeyDown = e => {
    // when Enter key is clicked, the comment is saved through onSubmit function
    // so we want to make sure nothing else happens when that is done
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      // if there is a comment typed in, we want to blur the comment entry container
      // after onSubmit
      if (comment.length > 0) {
        setIsCommentSubmitted(true);
      }
    }

    // user not able to type when in loading state
    if (shouldShowLoadingState) {
      e.preventDefault();
    }
  };

  const onTextAreaFocus = () => {
    player?.pause();

    analytics.track(RIGHT_PANEL_COMMENT_INPUT_FOCUSED, {
      ...withIdentifiers(
        RIGHT_PANEL_COMMENT_INPUT_FOCUSED,
        AnalyticsEntityId.video(videoId, 'video_id')
      ),
    });

    setIsCommentInputContainerExpanded(true);
    setIsCommentInputContainerFocused(true);
  };

  const onContainerFocus = () => {
    // when the container is in the expanded state and the user clicks/tabs back into it
    // even if it's not the text area that was focused
    // we want to turn the focus state back on
    if (isCommentInputContainerExpanded && !isCommentInputContainerFocused) {
      onTextAreaFocus();
    }
  };

  const onContainerBlur = e => {
    // check if blur is actually out of container since blur is called
    // for every element within the container
    const containerLostFocus = !e.currentTarget.contains(e.relatedTarget);

    if (containerLostFocus) {
      if (!isEligibleForAiNudgeDisplay) {
        setIsCommentInputContainerFocused(false);
      }

      if (!shouldShowLoadingState && comment.length === 0) {
        setIsCommentInputContainerExpanded(false);
      }

      // if the click event happens on a button outside of the container,
      // go ahead and execute that. If we don't have this check here,
      // the input form simply closes and no click events follow
      if (e?.relatedTarget?.tagName === 'BUTTON') {
        e.relatedTarget.click();
      }
    }
  };

  const onCommentButtonClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (canSubmit) {
      onSubmit(e);
      setIsCommentSubmitted(true);
    }
  };

  const getSubmitButtonContent = (loading, timeStamp) => {
    if (loading) {
      return 'Posting...';
    }

    return `Comment at ${secondsToVideoTS(Math.round(timeStamp))}`;
  };

  useEffect(() => {
    // TODO: Revisit this, the logic belongs to the onCompleted task for comment creation/editing
    // after submitting and not in loading state = comment posted
    if (
      isCommentSubmitted &&
      !shouldShowLoadingState &&
      !shouldShowErrorState
    ) {
      setIsCommentInputContainerExpanded(false);
      setIsCommentSubmitted(false);
      setIsCommentInputContainerFocused(false);
    }
  }, [isCommentSubmitted, shouldShowLoadingState, shouldShowErrorState]);

  return (
    // eslint-disable-next-line styled-components-a11y/no-static-element-interactions
    <CommentEntryPointContainer
      ref={containerRef}
      isExpanded={isCommentInputContainerExpanded}
      isFocused={isCommentInputContainerFocused}
      isDisabled={Boolean(shouldShowLoadingState)}
      onFocus={onContainerFocus}
      onBlur={onContainerBlur}
      shouldShowErrorState={shouldShowErrorState}
      bgGradientBreakpoint={bgGradientBreakpoint}
      shouldAddBgGradient={shouldCustomizeCommentContainerForNudges}
    >
      <AvatarAndCommentTextAreaWrapper>
        <div style={fullSize ? {} : { paddingTop: '6px' }}>
          <UserAvatar
            avatarSrc={avatarSrc}
            name={displayName}
            avatarSize={fullSize ? AVATAR_SIZE.FULL : AVATAR_SIZE.SMALL}
          />
        </div>
        <CommentTextArea
          textAreaRef={textAreaRef}
          comment={comment}
          placeholder={
            isOwner ? 'Leave a comment...' : `Respond to ${videoOwnerName}...`
          }
          setComment={setComment}
          setCommentEdited={setCommentEdited}
          onKeyDown={onKeyDown}
          onFocus={onTextAreaFocus}
          autofocus={false}
          inputSize={inputSize}
          showCustomPlaceHolder={true}
          isSingleRow
          // this id is used to find the text area and focus it on comment button click in the engagement bar
          id={
            !isReply ? COMMENT_TEXT_AREA_ID_IN_SIDEBAR_ENTRY_POINT : undefined
          }
          dataTestId="comment-entry-field-in-sidebar"
          shouldIncreaseCommentInputHeight={
            shouldCustomizeCommentContainerForNudges
          }
        />
      </AvatarAndCommentTextAreaWrapper>

      <ActionButtonsWrapper isExpanded={isCommentInputContainerExpanded}>
        <CommentEntryPointIconButtons
          textAreaRef={textAreaRef}
          shouldShowSecondaryIconButtons={isCommentInputContainerExpanded}
          comment={comment}
          setComment={setComment}
        />

        {isCommentInputContainerExpanded && (
          <Arrange gap="small">
            {shouldShowLoadingState && <Loader />}
            <Button
              variant="primary"
              size="small"
              disabled={!canSubmit || shouldShowLoadingState}
              onClick={onCommentButtonClick}
            >
              {getSubmitButtonContent(shouldShowLoadingState, currentTime)}
            </Button>
          </Arrange>
        )}
      </ActionButtonsWrapper>

      {isCommentInputContainerExpanded && isEligibleForAiNudgeDisplay ? (
        <AiNudgesRightPanel
          nudges={nudges}
          textAreaRef={textAreaRef}
          setComment={setComment}
          setNudgeAndHasNudgeBeenSelected={setNudgeAndHasNudgeBeenSelected}
          hasAiNudgeBeenSelectedRef={hasAiNudgeBeenSelectedRef}
          commentEdited={commentEdited}
        />
      ) : null}
    </CommentEntryPointContainer>
  );
};
