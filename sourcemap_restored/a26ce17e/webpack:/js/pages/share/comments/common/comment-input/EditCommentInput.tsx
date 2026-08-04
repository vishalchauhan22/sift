import React, { useEffect, useState } from 'react';

import { Arrange, Button, TextButton, Text, Container } from '@loomhq/lens';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { EDIT_COMMENT_CANCELLED } from '@js/constants/events';
import { ENTER, ESCAPE } from '@js/constants/keyCodes';

import { CommentTextArea } from '@js/pages/share/comments/common/comment-text-area';
import { useCommentsFullSize } from '@js/pages/share/common';
import { CommentOrReply } from '@js/pages/share/common/comments/commentOrReply';

import * as analytics from '@js/utilities/analytics';

import { HighlightedCommentInputState } from './HighlightedCommentInputState';
import { useEditComment } from './useEditComment';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

type EditCommentInputProps = {
  comment: CommentOrReply;
  onClose: () => void;
  trackEditComment: () => void;
};

export const EditCommentInput = ({
  comment,
  onClose,
  trackEditComment,
}: EditCommentInputProps): JSX.Element => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [newCommentValue, setNewCommentValue] = useState(
    comment.inFlightContent || comment.content
  );
  const [textAreaFocused, setTextAreaFocused] = useState(false);

  const fullSize = useCommentsFullSize();
  const buttonSize = fullSize ? 'medium' : 'small';

  const editComment = useEditComment(comment, trackEditComment);

  const onCancel = () => {
    analytics.track(
      EDIT_COMMENT_CANCELLED,
      withIdentifiers(
        EDIT_COMMENT_CANCELLED,
        AnalyticsEntityId.user(comment.user_id, 'user_id'),
        AnalyticsEntityId.anonymous(comment.anon_user_id, 'anon_user_id'),
        AnalyticsEntityId.commentPost(comment.id, 'string', 'comment_id')
      )
    );
    onClose();
  };

  const onSave = () => {
    editComment({ comment, newContent: newCommentValue });
    onClose();
  };

  useEffect(() => {
    // change html <a> tags to regular url text

    if (comment.content.includes('<a>')) {
      const doc = new DOMParser().parseFromString(comment.content, 'text/html');
      const htmlNodes = [...doc.body.childNodes];
      const nodeValues = htmlNodes.map(node =>
        node.nodeName === 'A' ? node.toString() : node.textContent
      );

      const commentWithUrls = nodeValues.join('');

      if (comment.content !== commentWithUrls) {
        setNewCommentValue(commentWithUrls);
      }
    }
  }, [comment]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === ENTER && !e.shiftKey) {
      e.preventDefault();

      if (
        comment.content.trim() !== newCommentValue.trim() &&
        newCommentValue.trim() !== ''
      ) {
        onSave();
      }
    }

    if (e.keyCode === ESCAPE) {
      onCancel();
    }
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const el = e.target;
    const end = el.value.length;

    // place cursor at the end
    el.setSelectionRange(end, end);

    setTextAreaFocused(true);
  };

  const onBlur = () => {
    setTextAreaFocused(false);
  };

  const isLoggedIn = useIsCurrentUserLoggedIn();

  return (
    <HighlightedCommentInputState
      comment={comment}
      fullSize={fullSize}
      shouldHighlight={isLoggedIn}
      textAreaFocused={textAreaFocused}
      TextArea={
        <Arrange gap="small" autoFlow="row" justifyContent="stretch">
          <CommentTextArea
            textAreaRef={textAreaRef}
            comment={newCommentValue}
            setComment={setNewCommentValue}
            onKeyDown={onKeyDown}
            autofocus={true}
            inputSize="small"
            placeholder=""
            onFocus={onFocus}
            onBlur={onBlur}
            hasError={comment.inFlightContent !== null}
          />
          <Arrange justifyContent="space-between">
            <Container>
              {comment.inFlightContent && (
                <Text color="danger" fontWeight="bold">
                  Your comment was not saved. Please try again.
                </Text>
              )}
            </Container>
            <Arrange gap="small" justifyContent="end">
              <TextButton onClick={onCancel} size={buttonSize}>
                Cancel
              </TextButton>
              <Button
                onClick={onSave}
                variant="primary"
                isDisabled={
                  comment.content.trim() === newCommentValue.trim() ||
                  newCommentValue.trim() === ''
                }
                size={buttonSize}
              >
                Save
              </Button>
            </Arrange>
          </Arrange>
        </Arrange>
      }
    />
  );
};
