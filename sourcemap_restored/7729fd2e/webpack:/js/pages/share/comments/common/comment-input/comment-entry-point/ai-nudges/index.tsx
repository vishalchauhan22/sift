// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import { useVideoContext, track } from '@js/common/video-player';

import { Events } from '@js/common/video-player/api/analytics';

import { useMount } from '@js/hooks/useMount';
import React, { useCallback } from 'react';

import { Arrange, Logo, Text, Spacer } from '@loomhq/lens';

import { VideoNudge } from '@js/globalTypes.generated';

import { NudgeWithOverflow } from './components';

import './animations.less';

type AnimatedNudgesContainerProps = {
  isNudgeSelected: boolean | null;
};

const AnimatedNudgesContainer = styled.div<{
  isNudgeSelected: boolean | null;
}>`
  flex-direction: column;
  align-items: stretch;
  max-width: 100%;
  column-gap: 10px;
  background-color: #f7f7f8;
  border-radius: 0 0 28px 28px;
  background-clip: padding-box;
  border: 2px solid transparent;
  padding: 0px 16px;
  ${props => (props.isNudgeSelected ? '' : 'margin-top: 10px;')}
  transition-duration: 0.3s, 0.4s;
  transition-delay: ${(props: AnimatedNudgesContainerProps) =>
    props.isNudgeSelected ? '0.3s, 0s' : '0.3s, 0.6s'};
  transition-property: height, opacity;
  height: ${(props: AnimatedNudgesContainerProps) =>
    props.isNudgeSelected === null
      ? '0px'
      : props.isNudgeSelected === false
        ? '125px'
        : '0px'};
  opacity: ${(props: AnimatedNudgesContainerProps) =>
    props.isNudgeSelected === null
      ? '0'
      : props.isNudgeSelected === false
        ? '1'
        : '0'};
  order: ${(props: AnimatedNudgesContainerProps) =>
    props.isNudgeSelected ? '1' : '-1'};
`;

export const AiNudgesRightPanel = ({
  nudges,
  textAreaRef,
  setComment,
  setNudgeAndHasNudgeBeenSelected,
  hasAiNudgeBeenSelectedRef,
  commentEdited,
}: {
  nudges: VideoNudge[] | undefined;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  setComment: (comment: string) => void;
  setNudgeAndHasNudgeBeenSelected: (nudge?: VideoNudge) => void;
  hasAiNudgeBeenSelectedRef: React.RefObject<boolean | null>;
  commentEdited: boolean;
}): JSX.Element | null => {
  const { video } = useVideoContext();

  const focusOnTextArea = () => textAreaRef.current?.focus();

  const createCommentSetter = useCallback(
    (commentText: string): ((commentText: string) => void) | undefined => {
      if (!commentEdited && !hasAiNudgeBeenSelectedRef.current) {
        return () => setComment(commentText);
      }
    },
    [commentEdited, hasAiNudgeBeenSelectedRef, setComment]
  );

  useMount(() => {
    setNudgeAndHasNudgeBeenSelected();

    !hasAiNudgeBeenSelectedRef.current && setComment('');
  });

  const handleNudgeClick = (nudge: VideoNudge) => {
    setComment(nudge.content);

    // hide nudges
    setNudgeAndHasNudgeBeenSelected(nudge);

    focusOnTextArea();

    track({
      event: Events.AI_EOVN_NUDGE_CLICKED,
      payload: {
        video_id: video?.id,
        prompt_version: nudge.prompt_version,
        nudge_type: nudge.nudge_type,
        source: 'right panel',
      },
    });
  };

  if (!nudges || !nudges.length) {
    return null;
  }

  return (
    <AnimatedNudgesContainer
      isNudgeSelected={hasAiNudgeBeenSelectedRef.current}
    >
      <Spacer top="medium" bottom="small">
        <Arrange gap="8px">
          <Text color="#6c6684" size="body-sm">
            Start with a suggestion from Loom AI
          </Text>
          <Logo
            variant="symbol"
            maxWidth="12px"
            brand="ai"
            customId="taskHeader"
          />
        </Arrange>
      </Spacer>
      <Arrange gap="10px" columns="repeat(auto-fit, minmax(1rem, 1fr))">
        {nudges.map((nudge, i) => (
          <NudgeWithOverflow
            nudgeContent={nudge.content}
            isNudgeSelected={Boolean(hasAiNudgeBeenSelectedRef.current)}
            key={i}
            onClick={() => handleNudgeClick(nudge)}
            onMouseEnter={createCommentSetter(nudge.content)}
            onMouseLeave={createCommentSetter('')}
          />
        ))}
      </Arrange>
    </AnimatedNudgesContainer>
  );
};
