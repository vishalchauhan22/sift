import {
  VIDEO_COMMENT_CREATED,
  VIDEO_COMMENT_REPLY_CREATED,
} from '@js/constants/events';
import { ENTER, ESCAPE } from '@js/constants/keyCodes';

import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { ModalTypeEnum } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ASGSource } from '@js/common/onboarding';
import { usePlayerFromContext, useVideoContext } from '@js/common/video-player';
import { formatTime } from '@js/common/video-player/utils';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import { CommentEntryPoint } from '@js/pages/share/comments/common/comment-input/comment-entry-point';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';
import { Gates } from '@js/pages/share/common/constants/gates';
import { isFullScreen } from '@js/pages/share/common/helpers';
import React, { useEffect } from 'react';
import { isMobile } from '@js/utilities/device';
import { ASGTertiaryButtonIcon } from '@js/utilities/modals';

import { Container, Spacer, Text } from '@loomhq/lens';
import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';
import { VideoNudge } from '@js/globalTypes.generated';
import * as analytics from '@js/utilities/analytics';

import { InPlayerCommentInput } from './InPlayerCommentInput';
import { OverlayCommentInput } from './OverlayCommentInput';
import { checkCanSubmit } from './helpers/checkCanSubmit';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const { SignedOutEndOfVideoNudges, SignedOutAiSidebarNudgeComments } =
  ASGSource;

type CommentInputProps = {
  inPlayer?: boolean;
  replyTo?: string;
  isFirstReply?: boolean;
  closeReply?: () => void;
  closeModal?: () => void;
  isNewCommentEntryPoint?: boolean;
  creationMethod?: string | null;
};

export const CommentInput = ({
  inPlayer,
  replyTo,
  isFirstReply,
  closeReply,
  closeModal,
  isNewCommentEntryPoint,
  creationMethod = null,
}: CommentInputProps): JSX.Element | null => {
  const formRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const player = usePlayerFromContext();
  const { video } = useVideoContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const [comment, setComment] = React.useState('');
  const isVideoEmbedded = useIsVideoEmbedded();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  React.useState(false);

  const isSalesforceTrackedVideo = video.salesforceEngagementTracking;
  const isVideoEmailGated =
    video.emailGateVideoType !== EmailGatingSetting.None;

  const isSalesTargetedVideo = isSalesforceTrackedVideo || isVideoEmailGated;

  const { openModal } = useModals();

  const isReply = Boolean(replyTo);

  const placeholderText = isReply
    ? 'Leave a Reply'
    : `Comment at ${formatTime(Math.round(player?.currentTime || 0))}`;

  const videoOwnerName = video?.owner?.displayName || '';

  const videoTimestamp = Math.round(player?.currentTime || 0);

  const [selectedAiNudge, setSelectedAiNudge] = React.useState<
    VideoNudge | undefined
  >(undefined);

  const hasAiNudgeBeenSelectedRef = React.useRef<boolean | null>(null);

  const setNudgeAndHasNudgeBeenSelected = (nudge?: VideoNudge): void => {
    setSelectedAiNudge(nudge);

    if (!hasAiNudgeBeenSelectedRef.current) {
      hasAiNudgeBeenSelectedRef.current = Boolean(nudge);
    }
  };

  const canSubmit = checkCanSubmit(comment) && !isSubmitting;

  const handleOnCompleteCreateComment = () => {
    setIsSubmitting(false);
    setComment('');
    closeReply && closeReply();
    textAreaRef.current?.blur();
  };

  const {
    createComment,
    loading,
    error: errorCreatingComment,
  } = useCreateComment({
    handleOnCompleteCreateComment,
    shouldUseGlobalError: Boolean(inPlayer),
  });

  const handleComment = commentContent => {
    setIsSubmitting(true);
    createComment({
      content: commentContent,
      parentPostId: replyTo ?? undefined,
    });

    const eventType = isReply
      ? VIDEO_COMMENT_REPLY_CREATED
      : VIDEO_COMMENT_CREATED;

    analytics.track(eventType, {
      ...withIdentifiers(
        eventType,
        AnalyticsEntityId.video(video.modelId, 'video_id')
      ),
      comment_length: commentContent.length,
      freshPlayer: true,
      comment_reply_type: 'text',
      creation_method: isReply ? null : creationMethod,
      ai_nudge_type_selected:
        isNewCommentEntryPoint && selectedAiNudge
          ? selectedAiNudge.nudge_type
          : undefined,
      exact_ai_nudge_posted:
        isNewCommentEntryPoint && selectedAiNudge
          ? commentContent === selectedAiNudge?.content
          : undefined,
    });
  };

  const onSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();

    if (!canSubmit) {
      return false;
    }

    const commentContent = comment;

    // Note: we don't want to show ASG to leads when on sales targeted videos
    if (!isLoggedIn && !isSalesTargetedVideo) {
      if (!isVideoEmbedded) {
        // exit out of full screen also exits out of the comments overlay
        if (isFullScreen()) {
          player?.toggleFullscreen();
        }

        const sourceToReturn = hasAiNudgeBeenSelectedRef.current
          ? SignedOutAiSidebarNudgeComments
          : SignedOutEndOfVideoNudges;

        openModal({
          modalType: ModalTypeEnum.HARD_GATE_COMMENT_EMOJI_MODAL,
          options: {
            anonName: 'Anonymous',
            comment: commentContent,
            commentVideoId: video.id,
            creationMethod,
            gate: Gates.REACTION,
            header: 'Add your name to this comment',
            hideModeSwitcher: true,
            onboardingType: 'modal-onboarding',
            parentPostId: replyTo,
            signupParams: {
              anonComment: commentContent,
              anonCommentTimestamp: videoTimestamp,
              anonCommentVideoId: video.id,
              ...(replyTo && { anonParentPostId: replyTo }),
            },
            source: sourceToReturn,
            subheader: `${
              videoOwnerName ?? 'They'
            } sent this Loom instead of a meeting invite. Use async video to stay connected to your team while staying focused on what counts.`,
            tertiaryButtonIcon: ASGTertiaryButtonIcon.Comment,
            tertiaryButtonText: 'Post comment anonymously',
            videoOwnerName,
          },
        });

        handleOnCompleteCreateComment();

        return;
      }

      // [note] excluding slack player due to sandbox error preventing popups
      // https://linear.app/loom-com/issue/TOFU-2428/comments-are-not-working-in-video-embeds-including-slack-if-users-are
      const isSlackPlayer = video?.platform === 'slackPlayer';

      // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
      const isEligibleToSeeEmbedASG =
        isVideoEmbedded && !isMobile && !isSlackPlayer;

      if (isEligibleToSeeEmbedASG) {
        window.open(
          `/share/${video.modelId}?asg_comment=true&comment=${commentContent}&video_time_stamp=${videoTimestamp}`,
          '_blank',
          'noopener'
        );

        // Returning false here to avoid duplicate comments
        // https://www.loom.com/share/7b311fe55fc64cc9967ba2fb6d200c71
        return false;
      }
    }

    handleComment(commentContent);
    closeModal && closeModal();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === ENTER && !e.shiftKey) {
      onSubmit(e);
    }

    if (e.keyCode === ESCAPE && closeReply) {
      e.nativeEvent.stopImmediatePropagation();
      closeReply();
    }
  };

  useEffect(() => {
    const el = formRef.current;

    if (!el || !isReply) {
      return;
    }

    el.scrollIntoView({
      block: 'center',
    });
  }, [formRef, isReply]);

  const shouldShowErrorMessage = errorCreatingComment && !inPlayer;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={onKeyDown} ref={formRef}>
      {isNewCommentEntryPoint ? (
        <CommentEntryPoint
          textAreaRef={textAreaRef}
          comment={comment}
          setComment={setComment}
          setNudgeAndHasNudgeBeenSelected={setNudgeAndHasNudgeBeenSelected}
          hasAiNudgeBeenSelectedRef={hasAiNudgeBeenSelectedRef}
          canSubmit={canSubmit}
          isReply={isReply}
          onSubmit={onSubmit}
          shouldShowErrorState={Boolean(errorCreatingComment)}
          shouldShowLoadingState={loading}
        />
      ) : inPlayer ? (
        <InPlayerCommentInput
          textAreaRef={textAreaRef}
          comment={comment}
          setComment={setComment}
          placeholderText={placeholderText}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      ) : (
        <OverlayCommentInput
          textAreaRef={textAreaRef}
          comment={comment}
          setComment={setComment}
          placeholderText={placeholderText}
          closeReply={closeReply}
          isReply={isReply}
          isFirstReply={isFirstReply}
          canSubmit={canSubmit}
          onSubmit={onSubmit}
          shouldShowErrorState={Boolean(errorCreatingComment)}
          shouldShowLoadingState={loading}
          videoId={video.modelId}
        />
      )}
      {shouldShowErrorMessage ? (
        <Spacer left={isReply && !isFirstReply ? 4 : 'unset'}>
          <Container paddingX="medium" paddingY="small">
            <Text size="body-md" fontWeight="book" color="danger">
              {`We weren't able to post your comment. Please try again`}
            </Text>
          </Container>
        </Spacer>
      ) : null}
    </div>
  );
};
