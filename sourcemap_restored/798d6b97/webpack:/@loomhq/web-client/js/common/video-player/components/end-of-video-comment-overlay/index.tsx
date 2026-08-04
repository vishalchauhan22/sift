import { LOOM_URI } from '@js/constants/routes';

import cx from 'classnames';

import { useGetCta } from '@js/common/cta-form';
import {
  COMMENT_SOURCE,
  EndCtaButton,
  Events,
  track,
  usePlayer,
  useUserContext,
  useVideoContext,
  useViewportContext,
} from '@js/common/video-player';
import { EmojiReactionSet } from '@js/components/end-of-video-emoji-reaction-set/EmojiReactionSet';
import React, { useEffect, useRef, useState } from 'react';

import {
  Arrange,
  Container,
  IconButton,
  Spacer,
  Text,
  Textarea,
  TextButton,
  useMedia,
} from '@loomhq/lens';

import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgReplay } from '@loomhq/lens/icons/replay';

import styles from './styles.module.css';

// exporting for testing
// 🚩 EXP_MWEB_EOVN
export const CommentTextArea = ({
  comment,
  defaultComment,
  handleChange,
  handleKeyDown,
  handleSubmit,

  // 🚩 EXP_MWEB_EOVN - start
  isMobileScreenWidth,
  isPostCommentBtnDisabled,
  onPlay,
  textAreaRef,
}: {
  comment: string;
  defaultComment: string;
  handleChange: (e: React.SyntheticEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  isMobileScreenWidth: boolean;
  isPostCommentBtnDisabled: boolean;
  onPlay: () => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}): JSX.Element => {
  return isMobileScreenWidth ? (
    <Arrange autoFlow="row" gap="small" justifyContent="stretch">
      <div className={styles.eovnEntryContainer}>
        <Container
          className="flex relative grow:1"
          radius="large"
          paddingY={1.2}
          paddingX={2}
          backgroundColor="blurpleMedium"
          contentColor="blurpleStrong"
        >
          {defaultComment}
        </Container>
        <TextButton
          onClick={handleSubmit}
          isDisabled={isPostCommentBtnDisabled}
          className={cx(
            styles.eovnButtonMweb,
            isPostCommentBtnDisabled ? styles.eovnTextAreaButtonDisabled : ''
          )}
          color="var(--lns-color-white)"
          size="large"
        >
          Comment
        </TextButton>
      </div>
      <Container className="flex justify:center pt:medium">
        <TextButton
          id="LoomWatchAgainButton"
          onClick={onPlay}
          icon={<SvgReplay />}
        >
          Watch again
        </TextButton>
      </Container>
    </Arrange>
  ) : (
    // 🚩 EXP_MWEB_EOVN - end
    <Container className="flex relative">
      <label htmlFor="EOVNCommentTextArea" className="srOnly">
        Leave a comment
      </label>
      <Textarea
        id="EOVNCommentTextArea"
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
          'absolute bottom:0 right:0 mb:small mr:small',
          styles.eovnTextAreaButton,
          isPostCommentBtnDisabled ? styles.eovnTextAreaButtonDisabled : ''
        )}
        color="var(--lns-color-white)"
      >
        Post Comment
      </TextButton>
    </Container>
  );
};

export const EndOfVideoCommentOverlay = ({
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

  const isMobileScreenWidth = useMedia(['(max-width: 767px)'], [true], false);

  const ownerName = video.owner.displayName || video.owner.name;

  const defaultComment = `Thank you, ${ownerName}! 🙏 `;
  const [comment, setComment] = useState(defaultComment);
  const [commentEdited, setCommentEdited] = useState(false);

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
      event: Events.EOV_NUDGE_SUBMITTED,
      payload: {
        video_id: videoId,
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
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.currentTarget.value.trim().length > 0
    ) {
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
        {/* 🚩 EXP_MWEB_EOVN */}
        <Spacer bottom={isMobileScreenWidth ? 'small' : 'large'}>
          <Text color="white" size="body-lg" fontWeight="bold">
            Reply to {ownerName}
          </Text>
        </Spacer>
        {/* 🚩 EXP_MWEB_EOVN */}
        <CommentTextArea
          comment={comment}
          defaultComment={defaultComment}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
          isPostCommentBtnDisabled={isPostCommentBtnDisabled}
          textAreaRef={textAreaRef}
          isMobileScreenWidth={isMobileScreenWidth}
          onPlay={onPlay}
        />
        {showEovnEmojis ? ( // If emoji tray experiment is on
          <Container className="flex justify:center pt:large pb:xlarge">
            <EmojiReactionSet
              videoId={videoId}
              isLoggedUser={Boolean(isLoggedUser)}
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
