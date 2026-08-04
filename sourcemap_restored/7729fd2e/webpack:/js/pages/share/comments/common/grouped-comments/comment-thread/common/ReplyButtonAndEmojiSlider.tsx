// TODO(next author): Please convert styled component to native Lens and/or module css instead

import { LARGE_DESKTOP_MIN_WIDTH } from '@js/constants/breakpoints';

import { VIDEO_COMMENT_REPLY_CREATED } from '@js/constants/events';

// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import {
  LoggedInOnly,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import { useSkinTone } from '@js/common/video-player/emoji-picker/useSkinTone';
import { useReactionsPopover } from '@js/common/video-player/hooks/ui';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import { useMatchMedia } from '@js/hooks/useMatchMedia';
import { ExpandOrCollapseRepliesButton } from '@js/pages/share/comments/common/ExpandOrCollapseRepliesButton';

import { useCommentStore } from '@js/pages/share/comments/common/createStore';
import { getEmojiNameWithSkinTone } from '@js/pages/share/comments/common/grouped-comments/comment-thread/common/getEmojiNameWithSkinTone';
import { useMobileCommentInput } from '@js/pages/share/comments/common/hooks/useMobileCommentInput';
import { useCommentsFullSize } from '@js/pages/share/common';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';
import { EmojiReactionSetAndEmojiPickerAsync as EmojiReactionSetAndEmojiPicker } from '@js/pages/share/common/emoji-reaction-set-and-emoji-picker/async';
import { isAutoComment, isFullScreen } from '@js/pages/share/common/helpers';
import React from 'react';

import * as analytics from '@js/utilities/analytics';
import { isMobile } from '@js/utilities/device';
import { inEmbedPlayer } from '@js/utilities/url';

import { Text, IconButton } from '@loomhq/lens';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const emojiList = [
  'white_check_mark',
  '+1',
  'pray',
  'heart_eyes',
  'fire',
  'raised_hands',
];
const SUBMIT_COMMENT_DELAY_MS = 250;
const reactionsWithSkinTones = ['+1', 'pray', 'raised_hands'];

const EmojiQuickListWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  &:hover {
    > div {
      opacity: 1;
      pointer-events: initial;
      width: auto;
      height: auto;
      gap: var(--lns-space-small);
    }

    + .collapse-replies-btn {
      opacity: 0;
      width: 0;

      // we only want transition when appearing, and not when disappearing
      transition: none;
    }
  }
`;

// Font order ref: https://nolanlawson.com/2022/04/08/the-struggle-of-using-native-emoji-on-the-web/
const EmojiQuickList = styled.div`
  transition:
    opacity 300ms ease-in,
    padding 200ms;
  opacity: 0;
  height: 0;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  padding-left: var(--lns-space-small);
  font-family:
    'Twemoji Mozilla', 'Apple Color Emoji', 'Noto Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'EmojiOne Color',
    'Android Emoji';
  display: inline-flex;
`;

const ReplyButtonAndEmojiSliderWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 0;
  align-items: center;
  padding-top: var(--lns-space-xsmall);
`;

const ReplyButtonWrapperSidebar = styled.div<{
  inEmbed: boolean;
}>`
  --bckg-alpha: ${props => (props.inEmbed ? `0.2` : '0')};
  --padding: var(--elementsSpacing);
  cursor: pointer;
  align-items: center;
  border-radius: var(--lns-radius-100);
  padding: var(--padding);
  padding-right: var(--lns-space-small);
  padding-left: var(--lns-space-small);
  margin-left: calc(-1 * var(--lns-space-small));
  transition: background-color 200ms ease;
  &:hover {
    background-color: var(--lns-color-backgroundHover);
  }
`;

const CollapseButtonWrapper = styled.div`
  justify-self: end;
  opacity: 1;
  width: unset;

  transition: opacity 300ms ease-in;
`;

const Emoji = ({ type, onClick, skinTone }) => {
  const { getEmojiUnicodeByName } = useEmojiData();
  const fullSize = useCommentsFullSize();

  // title will be the name of the emoji without skin tone
  const title = type;

  // attach skin tone preference to the emoji
  if (reactionsWithSkinTones.includes(type)) {
    type = getEmojiNameWithSkinTone({ type, skinTone });
  }

  return (
    <IconButton
      altText={type}
      title={title}
      icon={<span>{getEmojiUnicodeByName(type)}</span>}
      onClick={() => onClick(type)}
      size={fullSize ? 'medium' : 'small'}
    />
  );
};

const EmojiSlider = ({ commentId, reactionPickerProp }) => {
  const { getEmojiUnicodeByName } = useEmojiData();
  const { createComment } = useCreateComment();
  const { skinTone } = useSkinTone();

  const {
    video: { id: videoId },
  } = useVideoContext();

  const trackingEvt = type => {
    analytics.track(VIDEO_COMMENT_REPLY_CREATED, {
      ...withIdentifiers(
        VIDEO_COMMENT_REPLY_CREATED,
        AnalyticsEntityId.video(videoId, 'video_id')
      ),
      comment_length: 1,
      freshPlayer: true,
      comment_reply_type: 'emojiOnly',
      selected_emoji: type,
    });
  };

  const onCreateComment = type => {
    createComment({
      content: getEmojiUnicodeByName(type),
      parentPostId: commentId,
      extendedReaction: type,
    });
  };

  const onClick = type => {
    trackingEvt(type);
    onCreateComment(type);
  };

  const onExtendedEmojiClick = type => {
    // let picker close first, then display the newly added comment (emoji)
    setTimeout(() => {
      onCreateComment(type);
    }, SUBMIT_COMMENT_DELAY_MS);
  };

  const isInFullScreen = Boolean(isFullScreen());
  const isSidebarStacked = useMatchMedia(
    `(max-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`
  );

  return (
    <LoggedInOnly>
      <EmojiQuickListWrapper>
        <EmojiReactionSetAndEmojiPicker
          customEmojiSet
          reactionPickerProp={reactionPickerProp}
          onClick={name => onExtendedEmojiClick(name)}
          // Note: Due to an overflow issue on the comments sidebar, this popup was being clipped.
          // To fix this, we will force it to shift right only when the comments are in the sidebar
          inCommentsSidebar={!isInFullScreen && !isSidebarStacked}
          forcedEmojiPickerSize={isMobile ? 'small' : undefined}
        />
        {!isMobile ? (
          <EmojiQuickList>
            {emojiList.map(emoji => {
              return (
                <Emoji
                  key={emoji}
                  type={emoji}
                  skinTone={skinTone}
                  onClick={onClick}
                />
              );
            })}
          </EmojiQuickList>
        ) : null}
      </EmojiQuickListWrapper>
    </LoggedInOnly>
  );
};

const ReplyButton = ({ showAddReply }) => {
  const fullSize = useCommentsFullSize();
  const inEmbed = inEmbedPlayer();
  const {
    video: { modelId: videoId },
  } = useVideoContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isVideoEmbedded = useIsVideoEmbedded();

  const showAsgComment = !isLoggedIn && isVideoEmbedded;

  const onReplyClick = () => {
    if (showAsgComment) {
      window.open(`/share/${videoId}?asg_comment=true`, '_blank', 'noopener');
    } else {
      showAddReply();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div onClick={onReplyClick}>
      <ReplyButtonWrapperSidebar inEmbed={inEmbed}>
        <Text
          color="body"
          fontWeight="bold"
          size={fullSize ? 'medium' : 'small'}
        >
          Reply
        </Text>
      </ReplyButtonWrapperSidebar>
    </div>
  );
};

export const ReplyButtonAndEmojiSlider = ({
  comment,
  commentId,
  onCollapseRepliesButtonClick,
}: {
  comment: CommentFromServer | ReplyFromServer;
  commentId: string;
  onCollapseRepliesButtonClick?: () => void;
}): React.ReactElement => {
  const {
    video: { id: videoId },
  } = useVideoContext();
  const { setReplyId, replyId } = useCommentStore();
  const showReplyField = replyId === commentId;
  const [reactionPickerPopupOpen, onReactionKey, reactionPickerPopupRef] =
    useReactionsPopover({ videoId, disabled: true });

  const reactionPickerProp = {
    reactionPickerPopupOpen,
    onReactionKey,
    reactionPickerPopupRef,
  };

  const { isExpMwebCommenting } = useExpMwebCommenting();
  const {
    setReplyId: setReplyIdMobile,
    setIsOpen,
    setComment,
  } = useMobileCommentInput();

  const handleShowAddReply = () => {
    setReplyId(commentId);

    if (isExpMwebCommenting) {
      setIsOpen(true);
      setReplyIdMobile(commentId);
      setComment(comment);
    }
  };

  return (
    <ReplyButtonAndEmojiSliderWrapper>
      {!showReplyField && !isAutoComment(commentId) && (
        <>
          <ReplyButton showAddReply={handleShowAddReply} />
          <EmojiSlider
            reactionPickerProp={reactionPickerProp}
            commentId={commentId}
          />
          {
            // only show collapse button if collapse button onclick function is passed in
            onCollapseRepliesButtonClick && (
              <CollapseButtonWrapper className="collapse-replies-btn">
                <ExpandOrCollapseRepliesButton
                  isCollapsed={false}
                  onClick={onCollapseRepliesButtonClick}
                />
              </CollapseButtonWrapper>
            )
          }
        </>
      )}
    </ReplyButtonAndEmojiSliderWrapper>
  );
};
