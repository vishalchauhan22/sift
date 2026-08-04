// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useShouldShowRecordReply } from '@js/pages/share/common/record-reply/hooks';
import React from 'react';

import { MentionsIconButton } from './MentionsIconButton';
import { RecordReplyIconButton } from './RecordReplyIconButton';

const CommentEntryPointIconButtonsWrapper = styled.div`
  display: flex;
`;

const Divider = styled.div`
  width: 1px;
  margin: 10% 4px;
  background: var(--lns-color-border);
`;

type CommentEntryPointIconButtonsProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  shouldShowSecondaryIconButtons: boolean;
  comment: string;
  setComment: (comment: string) => void;
};

export const CommentEntryPointIconButtons = ({
  textAreaRef,
  shouldShowSecondaryIconButtons,
  comment,
  setComment,
}: CommentEntryPointIconButtonsProps): JSX.Element => {
  const shouldShowRecordReply: boolean = useShouldShowRecordReply();
  const shouldShowMentionsButton: boolean = useIsCurrentUserLoggedIn();

  const shouldShowDivider =
    shouldShowSecondaryIconButtons &&
    shouldShowRecordReply &&
    shouldShowMentionsButton;

  return (
    <CommentEntryPointIconButtonsWrapper>
      {shouldShowRecordReply && <RecordReplyIconButton />}
      {shouldShowDivider && <Divider />}

      {
        // Some IconButtons should only be shown when the entry-point is expanded (i.e. showSecondaryIconButtons === true)
        shouldShowSecondaryIconButtons ? (
          shouldShowMentionsButton ? (
            <MentionsIconButton
              textAreaRef={textAreaRef}
              comment={comment}
              setComment={setComment}
            />
          ) : null
        ) : null
      }
    </CommentEntryPointIconButtonsWrapper>
  );
};
