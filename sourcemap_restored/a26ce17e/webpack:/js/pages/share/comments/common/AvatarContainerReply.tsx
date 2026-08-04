// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { AVATAR_SIZE } from './constants';

// TODO(tatiana): Refactor styled div, leverage more lens, remove child selector CSS, which is not maintainable.
export const AvatarContainerReply = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: auto 1fr;
  height: 100%;
  gap: var(--elementsSpacing);
  min-width: var(--avatarSize);
  --lineSize: ${AVATAR_SIZE.UNITLESS / 2}px;
  padding-bottom: var(--elementsSpacing);
  & > div.straightLine {
    width: 1.5px;
    background: var(--lns-color-border);
    height: 100%;
    border-radius: 5px;
  }
`;
