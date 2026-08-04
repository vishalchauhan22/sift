/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useAnonUserName } from '@js/common/useAnonUserName';
import React from 'react';

import {
  Arrange,
  Align,
  Container,
  Button,
  TextButton,
  TextInput,
} from '@loomhq/lens';

import { UiEvents } from '../../api';
import {
  ExtendedReactionType,
  useIsLoggedUser,
  useVideoContext,
  useVideoPlatform,
} from '../../context';
import { useEmojiData } from '../../emoji-picker/useEmojiData';
import {
  usePlayerFromContext,
  usePauseOnComponentOpen,
  useCurrentTime,
} from '../../hooks';
import { formatTime } from '../../utils';
import { emojiReactionSize } from '../../variables';
import { useViewportContext } from '../../viewportContext';
import { Emoji } from './emoji';

const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
`;

/**
 * showAnonNameField - true if AnonNameInput component must be shown (ie after anon user first creates reaction,
 * but before anon user submits name)
 * isAnonNameRequired - true if anon user must be prompted to enter name to create reaction
 * anonReactionCreatedType - reaction type saved for createReaction call later when anon user enters name
 */
type UseShowAnonNameFieldReturnTypes = {
  showAnonNameField: boolean;
  isAnonNameRequired: boolean;
  anonReactionCreatedType: ExtendedReactionType | null;
};

export const useShowAnonNameField = (): UseShowAnonNameFieldReturnTypes => {
  const player = usePlayerFromContext();

  const [anonReactionCreatedType, setAnonReactionCreatedType] =
    React.useState<ExtendedReactionType | null>(null);

  const { anonUserName, setAnonUserName } = useAnonUserName();
  const anonNameSet = Boolean(anonUserName);
  const isLoggedUser = useIsLoggedUser();
  const videoPlatform = useVideoPlatform();

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const anonSubmittedHandler = (name: string) => {
      setAnonUserName(name);
      player.submitNewReaction(
        anonReactionCreatedType as ExtendedReactionType,
        videoPlatform
      );
    };

    player.on([UiEvents.anonNameSubmitted], anonSubmittedHandler);

    return () => {
      player.off([UiEvents.anonNameSubmitted], anonSubmittedHandler);
    };
  }, [anonReactionCreatedType, player, setAnonUserName, videoPlatform]);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    const setAnonReaction = (type: ExtendedReactionType | null = null) => {
      setAnonReactionCreatedType(type);
    };

    player.on([UiEvents.anonNewReaction], setAnonReaction);
    player.on([UiEvents.anonCancelReaction], setAnonReaction);

    return () => {
      player.off([UiEvents.anonNewReaction], setAnonReaction);
      player.off([UiEvents.anonCancelReaction], setAnonReaction);
    };
  }, [player]);

  return {
    showAnonNameField:
      !isLoggedUser && anonReactionCreatedType !== null && !anonNameSet,
    isAnonNameRequired: !isLoggedUser && !anonNameSet,
    anonReactionCreatedType,
  };
};

export const AnonNameInput = ({
  anonReactionCreatedType,
}: {
  anonReactionCreatedType: ExtendedReactionType | null;
}): JSX.Element => {
  const player = usePlayerFromContext();
  const {
    video: { id: videoId },
  } = useVideoContext();
  const { width } = useViewportContext();

  const formColumns = ['3fr', 'auto'];
  const isSmall = width > 500;
  const columns = isSmall ? formColumns : '1fr';
  const gap = isSmall ? 'small' : 'xsmall';

  const [anonName, setAnonName] = React.useState('');
  const isDisabled = !anonName.trim();

  usePauseOnComponentOpen();

  const onKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') {
      handleSubmit();
    } else if (e.code === 'Escape') {
      handleCancel();
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.currentTarget.value;

    // Prevent numeric from being first character to fix emoji hotkey char entering input
    if (!anonName.trim() && inputValue >= '0' && inputValue <= '9') {
      return;
    }

    setAnonName(inputValue);
  };

  const handleSubmit = () => {
    if (anonName.trim()) {
      player?.anonNameSubmitted(anonName);
      player?.play();
    }
  };

  const handleCancel = () => {
    player?.anonCancelReaction();
    setAnonName('');
    player?.play();
  };

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
          <TextInput
            value={anonName || ''}
            onKeyDown={onKey}
            onChange={onChange}
            placeholder="Your name"
            autoFocus
            id="name"
          />
          <Arrange gap={gap} justifyContent="end">
            <TextButton type="button" onClick={handleCancel}>
              Cancel
            </TextButton>
            <SubmitButton
              videoId={videoId}
              reactionType={anonReactionCreatedType}
              isDisabled={isDisabled}
              onSubmit={handleSubmit}
            />
          </Arrange>
        </Arrange>
      </Align>
    </Container>
  );
};

const SubmitButton = ({
  videoId,
  reactionType,
  isDisabled = false,
  onSubmit,
}: {
  videoId: string;
  reactionType: ExtendedReactionType | null;
  isDisabled: boolean;
  onSubmit: () => void;
}) => {
  const { currentTime } = useCurrentTime(videoId as string);
  const { getEmojiUnicodeByName } = useEmojiData();

  return (
    <Button
      type="submit"
      variant="primary"
      isDisabled={isDisabled}
      onClick={onSubmit}
    >
      <ButtonWrapper>
        <Emoji
          size={emojiReactionSize}
          aria-label={reactionType as string}
          needsMargin
        >
          {getEmojiUnicodeByName(reactionType as string)}
        </Emoji>
        at {formatTime(currentTime)}
      </ButtonWrapper>
    </Button>
  );
};
