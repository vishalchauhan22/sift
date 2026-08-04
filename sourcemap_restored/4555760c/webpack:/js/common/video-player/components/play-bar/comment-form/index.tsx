/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React, { useState } from 'react';

import { Arrange, Align, Container, Button, TextButton } from '@loomhq/lens';

import { COMMENT_SOURCE, useCommentPortal } from '@js/common/video-player';

import { UiEvents } from '../../../api';
import { useIsLoggedUser } from '../../../context';
import {
  useCurrentTime,
  usePlayer,
  usePauseOnComponentOpen,
} from '../../../hooks';
import { formatTime } from '../../../utils';
import { useViewportContext } from '../../../viewportContext';
import { TextFieldLoomConnect } from '../../text-field-loom-connect';
import { CommentTextarea } from './comment-textarea';

export const CommentForm = ({
  setCommentFormIsOpen,
  videoId,
}: {
  setCommentFormIsOpen: (value: boolean) => void;
  videoId: string;
}): JSX.Element => {
  const player = usePlayer(videoId);
  const { currentTime } = useCurrentTime(videoId);
  const isLoggedUser = useIsLoggedUser();
  const formColumns = isLoggedUser ? ['1fr', 'auto'] : ['2fr', '1fr', 'auto'];
  const { width } = useViewportContext();
  const showNameField = !isLoggedUser;
  const formBreakpoint = showNameField ? 700 : 500;
  const isSmall = width > formBreakpoint;
  const columns = isSmall ? formColumns : '1fr';
  const gap = isSmall ? 'small' : 'xsmall';

  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    player?.submitNewComment({
      content: comment,
      source: COMMENT_SOURCE.PLAY_BAR,
    });

    setCommentFormIsOpen(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  // TODO: Please refactor this to not be a nested component
  // eslint-disable-next-line react/no-unstable-nested-components
  const SubmitButton = () => (
    <Button onClick={handleSubmit} variant="primary">
      Comment at {formatTime(currentTime)}
    </Button>
  );

  return (
    <Container paddingY="xsmall">
      <Align>
        <Arrange
          columns={columns}
          gap={gap}
          width="100%"
          maxWidth={120}
          alignItems="end"
        >
          <CommentTextarea
            autoFocus
            rows={1}
            placeholder="Leave a comment"
            onChange={handleChange}
          />
          {showNameField && (
            <TextFieldLoomConnect source="comment" placeholder="Your name" />
          )}
          <Arrange gap={gap} justifyContent="end">
            {isSmall && <SubmitButton />}
            <TextButton onClick={() => setCommentFormIsOpen(false)}>
              Cancel
            </TextButton>
            {!isSmall && <SubmitButton />}
          </Arrange>
        </Arrange>
      </Align>
    </Container>
  );
};

export const CommentFormInput = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  usePauseOnComponentOpen();
  const player = usePlayer(videoId);
  const { element } = useCommentPortal();

  const setOpen = (flag: boolean) => {
    player?.trigger(UiEvents.commentFormToggle, flag);
  };

  return React.isValidElement(element) ? (
    element
  ) : (
    <CommentForm setCommentFormIsOpen={setOpen} videoId={videoId} />
  );
};
