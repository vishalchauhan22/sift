/* eslint-disable @loomhq/loom/limit-parent-import-depth */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { u } from '@loomhq/lens';

import { slowTransition } from '../../../variables';

const Field = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  font-family: inherit;
  color: var(--lns-color-body);
  background-color: var(--lns-color-formFieldBackground);
  transition: ${slowTransition}ms box-shadow;
  border-radius: var(--lns-formFieldRadius);
  box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
    var(--lns-color-formFieldBorder);
  resize: none;
  padding: ${u(0.875)} var(--lns-formFieldHorizontalPadding);
  font: inherit;
  min-height: var(--lns-formFieldHeight);
  max-height: ${u(9.25)};
  margin: 0;

  &:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidthFocus)
      var(--lns-color-blurple);
  }

  &:focus {
    outline: none;
    box-shadow: var(--lns-formFieldBorderShadowFocus);
  }

  &:disabled {
    color: var(--lns-color-disabledContent);
    background-color: var(--lns-color-disabledBackground);
  }

  &:disabled:hover {
    box-shadow: inset 0 0 0 var(--lns-formFieldBorderWidth)
      var(--lns-color-formFieldBorder);
  }

  &::placeholder {
    color: var(--lns-color-grey5);
  }
`;

export const CommentTextarea = ({
  ...props
}: {
  [x: string]: any;
}): JSX.Element => {
  return <Field {...props} />;
};
