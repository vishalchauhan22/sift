// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { useCurrentUserSelector } from '@js/common/current-user';
import UserAvatar from '@js/components/user-avatar';
import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import React from 'react';

import { getAvatarThumbForUser } from '@js/utilities/avatar';

import { Arrange, Spacer } from '@loomhq/lens';

// TODO(next author): Please update to remove !important or leave notes that it's intended
// eslint-disable-next-line @loomhq/loom/no-important
const InputContainer = styled.div<{
  isDisabled: boolean;
  isFocused: boolean;
  shouldShowErrorState: boolean;
}>`
  padding: 8px;
  transition: 0.3s box-shadow;

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

  border: medium none;
  border-radius: var(--lns-formFieldRadius);

  background-color: var(--lns-color-formFieldBackground) !important;

  outline: 0;
  outline: none;
  color: inherit;

  resize: none;

  width: auto;

  &:disabled {
    background-color: var(--lns-color-disabledBackground);

    color: var(--lns-color-disabledContent);
  }

  &:disabled:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
  }

  &::placeholder {
    color: var(--lns-color-grey5);
  }
  ${props => (props.isDisabled ? `opacity: 0.5; pointer-events: none;` : ``)}
`;

type HighlightedCommentInputStateProps = {
  shouldShowLoadingState?: boolean;
  shouldShowErrorState?: boolean;
  shouldIndentLeft?: boolean;
  shouldHighlight?: boolean;
  TextArea: React.ReactElement;
  comment: any;
  fullSize: boolean;
  textAreaFocused?: boolean;
};

export const HighlightedCommentInputState = ({
  shouldShowErrorState = false,
  shouldIndentLeft,
  TextArea,
  comment,
  fullSize,
  textAreaFocused,
  shouldShowLoadingState = false,
}: HighlightedCommentInputStateProps): React.ReactElement => {
  const avatarSrc = useCurrentUserSelector(
    user => getAvatarThumbForUser(user.avatars),
    undefined
  );

  const indentReply = shouldIndentLeft ? 4 : 'unset';

  return (
    <Spacer bottom={shouldShowErrorState ? 'unset' : 2} left={indentReply}>
      <InputContainer
        isFocused={textAreaFocused ?? false}
        shouldShowErrorState={shouldShowErrorState}
        isDisabled={shouldShowLoadingState}
      >
        <Arrange columns={['auto', '1fr']} alignItems="start">
          <div style={fullSize ? {} : { paddingTop: '6px' }}>
            <UserAvatar
              avatarSrc={avatarSrc}
              name={comment.user_name}
              avatarSize={fullSize ? AVATAR_SIZE.FULL : AVATAR_SIZE.SMALL}
            />
          </div>
          {TextArea}
        </Arrange>
      </InputContainer>
    </Spacer>
  );
};
