/* eslint-disable @loomhq/loom/limit-parent-import-depth */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// TODO(next author): Please convert styled component to native Lens and/or module css instead

import { LOOM_URI } from '@js/constants/routes';

import cx from 'classnames';

import { useGetCta } from '@js/common/cta-form';
import { COMMENT_SOURCE, track, useUserContext } from '@js/common/video-player';
import { EmojiReactionSet } from '@js/components/end-of-video-emoji-reaction-set/EmojiReactionSet';
import React, { useEffect, useRef, useState } from 'react';

import {
  Container,
  IconButton,
  Spacer,
  Text,
  Textarea,
  TextButton,
} from '@loomhq/lens';

import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgReplay } from '@loomhq/lens/icons/replay';

import { VideoNudge } from '@js/globalTypes.generated';

import { Events } from '../../../video-player/api/analytics';
import { EndCtaButton } from '../../../video-player/layers/end-layer';
import { useVideoContext } from '../../context';
import { usePlayer } from '../../hooks';
import { useViewportContext } from '../../viewportContext';

import styles from './styles.module.css';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const EndOfVideoCommentOverlayWithAiNudges = ({
  setIsLayerInvisible,
  hideCloseButton,
  isEmbed = false,
}: {
  setIsLayerInvisible: (isLayerInvisible: boolean) => void;
  hideCloseButton?: boolean;
  isEmbed?: boolean;
}): JSX.Element | null => {
  const { video } = useVideoContext();

  const videoId = video.id;
  const cta = useGetCta(videoId);
  const player = usePlayer(videoId);
  const { isLoggedUser } = useUserContext();

  const ownerName = video.owner.displayName || video.owner.name;

  const defaultComment = `Thank you, ${ownerName}! 🙏 `;
  const [comment, setComment] = useState(defaultComment);
  const [commentEdited, setCommentEdited] = useState(false);
  const [nudgeSelected, setNudgeSelected] = useState<VideoNudge>(null);

  const { height } = useViewportContext();
  const showWatchAgainButton = height > 470;
  const showEovnEmojis = height > 470;

  const videoTimestamp = Math.round(player?.currentTime || 0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const focusOnTextArea = () => textAreaRef.current?.focus();

  useEffect(() => {
    focusOnTextArea();
  }, []);

  const onPlay = () => {
    if (!player) {
      return;
    }

    player.watchAgainClicked();
    player.play();
  };

  const handleClose = () => {
    setIsLayerInvisible(true);
  };

  const handleSubmit = () => {
    if (isEmbed && !isLoggedUser) {
      window.open(
        `${LOOM_URI}/share/${video.modelId}?asg_comment=true&comment=${comment}&video_time_stamp=${videoTimestamp}`,
        '_blank',
        'noopener'
      );

      return;
    }

    player?.submitNewComment({
      content: comment,
      source: COMMENT_SOURCE.AI_EOVN,
    });

    track({
      event: Events.AI_EOVN_POST_COMMENT_CLICKED,
      payload: {
        video_id: videoId,
        prompt_version: nudgeSelected?.prompt_version,
        nudge_type: nudgeSelected?.nudge_type,
        exact_nudge_posted: comment === nudgeSelected?.content,
      },
    });

    handleClose();
  };

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;

    setComment(target.value);

    if (!commentEdited) {
      setCommentEdited(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key was pressed (without holding down Shift) and the comment length is >0, and if so, submit.
    if (e.key === 'Enter' && !e.shiftKey && e.target.value.trim().length > 0) {
      handleSubmit();
    }
  };

  const exitFullScreenIfNecessary = () => {
    if (player && player.isInFullScreen()) {
      player.toggleFullscreen();
    }
  };

  const isPostCommentBtnDisabled = comment.length === 0;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onDoubleClick={exitFullScreenIfNecessary}
      className={cx(
        styles.aiEovnContainer,
        'flex items:center justify:center bgc:grey8'
      )}
    >
      {!hideCloseButton ? (
        <Container position="absolute" left={1} top={1}>
          <IconButton
            altText="Close"
            icon={<SvgClose />}
            onClick={handleClose}
          />
        </Container>
      ) : null}
      {cta ? (
        <Container position="absolute" right={2} top={2}>
          <EndCtaButton cta={cta} />
        </Container>
      ) : null}
      <Container margin="xlarge" maxWidth="660px" marginTop={'0'} width="100%">
        <Spacer bottom="large">
          <Text color="white" size="body-lg" fontWeight="bold">
            Reply to {ownerName}
          </Text>
        </Spacer>
        <Container className="flex relative">
          <Textarea
            ref={textAreaRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={comment}
            resize="none"
            className={cx(styles.eovnTextArea, 'bgc:grey8 c:white')}
          />
          <TextButton
            onClick={handleSubmit}
            isDisabled={isPostCommentBtnDisabled}
            className={cx(
              'absolute bottom:0 right:0 mb:small mr:small c:white',
              styles.eovnTextAreaButton,
              isPostCommentBtnDisabled ? styles.eovnTextAreaButtonDisabled : ''
            )}
          >
            Post Comment
          </TextButton>
        </Container>
        {showEovnEmojis ? ( // If emoji tray experiment is on and no nudges are shown.
          <Container className="flex justify:center pt:large pb:xlarge">
            <EmojiReactionSet
              videoId={videoId}
              isLoggedUser={isLoggedUser}
              isAnimated={true}
              isEmbed={isEmbed}
            />
          </Container>
        ) : null}
        {showWatchAgainButton ? (
          <Container className="flex justify:center pt:medium">
            <TextButton
              id="LoomWatchAgainButton"
              onClick={onPlay}
              icon={<SvgReplay />}
            >
              Watch again
            </TextButton>
          </Container>
        ) : null}
      </Container>
    </div>
  );
};
