/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { u } from '@loomhq/lens';

import { defaultTransition, slowTransition } from '../../../variables';

export const SubMenuBackButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  border-radius: var(--lns-radius-xlarge);
  cursor: pointer;
  font-family: inherit;
  padding: ${u(1.2)} ${u(1)};
  transition: ${slowTransition}ms background-color;

  &:hover {
    transition: ${defaultTransition}ms background-color;
    background: var(--lns-color-backgroundHover);
  }
`;
