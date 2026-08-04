// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

import {
  TextInput,
  Logo,
  Text,
  TextButton,
  Container,
  Spacer,
  Tooltip,
  u,
} from '@loomhq/lens';

import { useVideoContext } from '../context';

export type LoomConnectSource =
  | 'reaction'
  | 'comment'
  | 'video_reaction_notification'
  | 'videoReactionBundle'
  | 'video_comment_notification';

const StackWrapper = styled.div<{ minWidth: string }>`
  display: grid;
  grid-template-areas: 'stack';
  place-items: center;
  justify-items: end;
  ${props => props.minWidth && `min-width: ${props.minWidth}`};

  & > * {
    grid-area: stack;
  }
`;

type ConnectButtonProps = {
  isCollapsed: boolean;
  source?: LoomConnectSource;
};

export const ConnectButton = ({
  isCollapsed,
}: ConnectButtonProps): JSX.Element | null => {
  const { setRequestedSlackPermissionLayer } = useVideoContext();

  return (
    <Tooltip
      content={isCollapsed ? 'Connect using Loom' : ''}
      placement="topRight"
    >
      <TextButton
        onClick={() => setRequestedSlackPermissionLayer(true)}
        size="small"
      >
        <Logo variant="symbol" maxWidth={2} />
        {!isCollapsed && (
          <Spacer left="xsmall">
            <Text size="body-sm" hasEllipsis>
              Connect using Loom
            </Text>
          </Spacer>
        )}
      </TextButton>
    </Tooltip>
  );
};

type Props = {
  onKeyDown?: any;
  placeholder: string;
  source?: LoomConnectSource;
  size?: 'small' | 'medium';
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

export const TextFieldLoomConnect = ({
  onKeyDown,
  placeholder,
  source,
  size,
  onChange,
}: Props): JSX.Element => {
  const [value, setValue] = React.useState('');
  const { userContext } = useVideoContext();
  const { showLoomConnect } = userContext;
  const minWidth = showLoomConnect ? u(30) : 'unset';

  return (
    <StackWrapper minWidth={minWidth}>
      <TextInput
        onKeyDown={onKeyDown}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
          onChange && onChange(e);
        }}
        placeholder={placeholder}
        size={size}
      />
      {showLoomConnect && (
        <Container marginRight="xsmall">
          <ConnectButton source={source} isCollapsed={Boolean(value)} />
        </Container>
      )}
    </StackWrapper>
  );
};
