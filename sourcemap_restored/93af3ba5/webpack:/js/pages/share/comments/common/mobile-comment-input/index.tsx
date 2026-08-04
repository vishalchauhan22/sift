// 🚩 Start: EXP_MWEB_COMMENTING
import { ModalTypeEnum } from '@js/common/modal-container/modal-components/enums';
import { useModals } from '@js/common/modal-container/useModals';
import { ASGSource } from '@js/common/onboarding';
import {
  usePlayer,
  useUserContext,
  useVideoContext,
  useVideoId,
} from '@js/common/video-player';
import { formatTime } from '@js/common/video-player/utils';
import { useExpMWebCommentingV2 } from '@js/hooks/experiments/useExpMWebCommentingV2';
import { useScreenInLandscapeMode } from '@js/hooks/useScreenInLandscapeMode';
import { useMobileCommentInput } from '@js/pages/share/comments/common/hooks/useMobileCommentInput';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';
import { Gates } from '@js/pages/share/common/constants/gates';
import React, { useEffect, useRef } from 'react';

import { ASGTertiaryButtonIcon } from '@js/utilities/modals';

import { IconButton, ModalCard, Text, Textarea } from '@loomhq/lens';
import { SvgSend } from '@loomhq/lens/icons/send';

import { CommentPostSkeleton } from './CommentPostSkeleton';
import styles from './style.module.css';

const { SignedOutHardGatingComments } = ASGSource;

const Divider = (): JSX.Element => <div className="borderBottom" />;

export const MobileCommentInputContainer = (): JSX.Element | null => {
  const videoId = useVideoId();
  const player = usePlayer(videoId);
  const currentTime = player?.currentTime ?? 0;
  const [comment, setComment] = React.useState<string>('');
  const { createComment } = useCreateComment();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isOpen,
    setIsOpen,
    replyId,
    setReplyId,
    comment: parentComment,
  } = useMobileCommentInput();

  const { isExpMWebCommentingV2 } = useExpMWebCommentingV2();
  const { isLoggedUser } = useUserContext();
  const { openModal } = useModals.getState();

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    const newText = e.target.value;
    setComment(newText);
  };
  const { video } = useVideoContext();
  const videoOwnerName = video?.owner?.displayName
    ? ` ${video.owner.displayName}`
    : '';
  const isLandscape = useScreenInLandscapeMode();
  const isLandscapeOnExpMwebCommenting = isExpMWebCommentingV2 && isLandscape;

  const handleSubmitComment = () => {
    if (comment.trim() === '') {
      return;
    }

    if (!isLoggedUser) {
      openModal({
        modalType: ModalTypeEnum.HARD_GATE_COMMENT_EMOJI_MODAL,
        options: {
          gate: Gates.EOVN,
          anonName: 'Anonymous',
          comment,
          videoOwnerName,
          commentVideoId: video.id,
          header: 'Add your name to this comment',
          subheader: `${
            videoOwnerName ?? 'They'
          } sent this Loom instead of a meeting invite. Use async video to stay connected to your team while staying focused on what counts.`,
          tertiaryButtonText: 'Post comment anonymously',
          tertiaryButtonIcon: ASGTertiaryButtonIcon.Comment,
          hideModeSwitcher: true,
          source: SignedOutHardGatingComments,
          signupParams: {
            anonComment: comment,
            anonCommentVideoId: video.id,
            anonCommentTimestamp: currentTime,
            signup_source: SignedOutHardGatingComments,
          },
        },
      });
    } else {
      createComment({
        content: comment,
        parentPostId: replyId ?? undefined,
      });
    }

    setIsOpen(false);
  };

  // Reset comment and replyId when the modal
  useEffect(() => {
    if (!isOpen) {
      setComment('');
      setReplyId(null);
    }
  }, [isOpen, setComment, setReplyId]);

  const handleOnClose = () => {
    setIsOpen(false);
    setReplyId(null);
    setComment('');
  };

  if (!isExpMWebCommentingV2 || !isOpen) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div
      className={styles.overlay}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <ModalCard
        isOpen={true}
        onCloseClick={handleOnClose}
        style={{
          position: 'fixed',
          top: 'unset',
          bottom: '0',
          borderBottomLeftRadius: 'unset',
          borderBottomRightRadius: 'unset',
          zIndex: 10,
          maxWidth: isLandscapeOnExpMwebCommenting ? 'unset' : undefined,
        }}
      >
        <div className="p:medium">
          <Text alignment="center" color="bodyDimmed">
            {replyId
              ? 'Reply to thread'
              : `Comment at ${formatTime(currentTime)}`}
          </Text>
        </div>
        <Divider />

        {parentComment && replyId ? (
          <>
            <CommentPostSkeleton />

            <Divider />
          </>
        ) : null}

        <div className="flex p:medium">
          <Textarea
            ref={textareaRef}
            value={comment}
            onChange={handleInputChange}
            className={styles.mobileCommentTextInput}
            placeholder="Share your thoughts"
            style={{
              border: 0,
              boxShadow: 'none',
              paddingTop: 0,
              fontSize: '16px', // prevent the auto-zoom on mobile web when focused
            }}
          />
          <IconButton
            onClick={handleSubmitComment}
            altText="Move to Folder"
            icon={<SvgSend />}
            iconColor={comment === '' ? 'grey2' : 'blurple'}
          />
        </div>
      </ModalCard>
    </div>
  );
};
// 🚩 End: EXP_MWEB_COMMENTING
