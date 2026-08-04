// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

export const Stack = styled.div<{ area: string }>`
  display: grid;
  grid-template-areas: '${props => props.area}';

  & > * {
    grid-area: ${props => props.area};
  }
`;
