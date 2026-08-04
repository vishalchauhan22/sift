// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React, { useEffect, useMemo, useState } from 'react';

import { Arrange, u } from '@loomhq/lens';
import { AvatarContainerReply } from '@js/pages/share/comments/common/AvatarContainerReply';
import { ExpandOrCollapseRepliesButton } from '@js/pages/share/comments/common/ExpandOrCollapseRepliesButton';
import { AVATAR_SIZE } from '@js/pages/share/comments/common/constants';
import { CommentPost } from '@js/pages/share/comments/common/grouped-comments/comment-thread/comment-post';
import { useCommentsFullSize } from '@js/pages/share/common';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { CommentTypeAndId } from '@js/utilities/types';

const NUMBER_OF_REPLIES_NEVER_COLLAPSED = 2;

const PossiblyCollapsedReplyWrapper = styled.div<{ shouldHide: boolean }>`
  display: ${props => (props.shouldHide ? `none` : `block`)};
`;

const CurvedLine = styled.span<{ fullSize: boolean }>`
  --curveSize: ${u(AVATAR_SIZE.UNITLESS / 2)};
  display: block;
  position: relative;
  height: var(--lineSize);
  width: ${props =>
    props.fullSize
      ? `calc((50% + var(--lns-space-medium)) - var(--elementsSpacing))`
      : `12px`};
  transform: translate(50%, calc(0.5 * var(--avatarSize)));
  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: var(--curveSize);
    border: var(--lineSize) solid var(--lns-color-border);
    border-top: 0;
    border-right: 0;
    border-radius: 0 0 0 calc(var(--curveSize) / 2);
    bottom: 100%;
    left: calc(-0.5 * var(--lineSize));
  }
`;

const DisableRepliesOverlay = styled.div<{
  show: boolean;
}>(
  props =>
    props.show && {
      opacity: '30%',
      pointerEvents: 'none',
    }
);

type CommentRepliesProps = {
  commentId: string;
  videoMeetingPlatform: string | null;
  replies: ReplyFromServer[];
  isEditingParentComment: boolean;
  recentlyDeleted: { commentIds: string[]; replyIds: string[] };
  addReplyDeleted: (id) => void;
  lastCommentLocallyDeleted: CommentTypeAndId;
  setLastCommentLocallyDeleted: (commentInfo: CommentTypeAndId) => void;
  replyFieldShowing?: boolean;
};

export const CommentReplies = ({
  commentId,
  videoMeetingPlatform,
  replies,
  isEditingParentComment,
  recentlyDeleted,
  addReplyDeleted,
  lastCommentLocallyDeleted,
  setLastCommentLocallyDeleted,
  replyFieldShowing,
}: CommentRepliesProps): React.ReactElement | null => {
  const disableReplies = useMemo(
    () => isEditingParentComment,
    [isEditingParentComment]
  );

  const fullSize = useCommentsFullSize();

  const totalNumOfReplies =
    replies?.length &&
    !replies.every(reply => recentlyDeleted.replyIds.includes(reply.id))
      ? replies.length
      : 0;

  const shouldAllowCollapsibleReplies =
    totalNumOfReplies > NUMBER_OF_REPLIES_NEVER_COLLAPSED;

  const [areRepliesCollapsed, setAreRepliesCollapsed] = useState(false);

  const handleCollapseRepliesButtonClick = React.useCallback(
    () => setAreRepliesCollapsed(true),
    []
  );
  const handleExpandRepliesButtonClick = React.useCallback(
    () => setAreRepliesCollapsed(false),
    []
  );

  const slicedReplies = useMemo(() => {
    if (totalNumOfReplies <= NUMBER_OF_REPLIES_NEVER_COLLAPSED) {
      return { firstNReplies: replies, lastFewReplies: [] };
    }

    return {
      firstNReplies: replies.slice(0, -NUMBER_OF_REPLIES_NEVER_COLLAPSED),
      lastFewReplies: replies.slice(
        -NUMBER_OF_REPLIES_NEVER_COLLAPSED,
        totalNumOfReplies
      ),
    };
  }, [replies, totalNumOfReplies]);

  const { firstNReplies, lastFewReplies } = slicedReplies;

  useEffect(() => {
    if (shouldAllowCollapsibleReplies) {
      // set replies to collapsed initially
      setAreRepliesCollapsed(shouldAllowCollapsibleReplies);
    }
  }, [shouldAllowCollapsibleReplies]);

  // if no replies, no need for this component
  if (!totalNumOfReplies) {
    return null;
  }

  return (
    <DisableRepliesOverlay show={disableReplies}>
      {shouldAllowCollapsibleReplies && areRepliesCollapsed && (
        <ExpandOrCollapseRepliesButton
          isCollapsed
          onClick={handleExpandRepliesButtonClick}
          extraRepliesCount={replies.length - NUMBER_OF_REPLIES_NEVER_COLLAPSED}
        />
      )}
      <Arrange
        gap={fullSize ? 'medium' : ''}
        columns={['auto', '1fr']}
        alignItems="start"
      >
        <AvatarContainerReply style={{ gap: 0 }}>
          <div
            className="straightLine"
            style={{ height: 'var(--lns-space-small)', borderRadius: 'unset' }}
          />
          <CurvedLine fullSize={fullSize} />
        </AvatarContainerReply>
        <Arrange autoFlow="row" justifyContent="stretch">
          <>
            {firstNReplies.map((reply, index) => {
              const isLastReply = index === totalNumOfReplies - 1;

              return (
                <PossiblyCollapsedReplyWrapper
                  key={index}
                  shouldHide={
                    areRepliesCollapsed && shouldAllowCollapsibleReplies
                  }
                >
                  <CommentPost
                    videoMeetingPlatform={videoMeetingPlatform}
                    comment={reply}
                    isReply
                    parentId={commentId}
                    isLastReply={isLastReply}
                    recentlyDeleted={recentlyDeleted}
                    addCommentOrReplyDeleted={addReplyDeleted}
                    lastCommentLocallyDeleted={lastCommentLocallyDeleted}
                    setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
                    replyFieldShowing={replyFieldShowing}
                  />
                </PossiblyCollapsedReplyWrapper>
              );
            })}

            {lastFewReplies.map((reply, index) => {
              const isLastReply = index === lastFewReplies.length - 1;
              const showCollapseRepliesButton =
                isLastReply &&
                !areRepliesCollapsed &&
                shouldAllowCollapsibleReplies;

              return (
                <CommentPost
                  videoMeetingPlatform={videoMeetingPlatform}
                  key={index + firstNReplies.length}
                  comment={reply}
                  isReply
                  parentId={commentId}
                  isLastReply={isLastReply}
                  onCollapseRepliesButtonClick={
                    showCollapseRepliesButton
                      ? handleCollapseRepliesButtonClick
                      : undefined
                  }
                  recentlyDeleted={recentlyDeleted}
                  addCommentOrReplyDeleted={addReplyDeleted}
                  lastCommentLocallyDeleted={lastCommentLocallyDeleted}
                  setLastCommentLocallyDeleted={setLastCommentLocallyDeleted}
                  replyFieldShowing={replyFieldShowing}
                />
              );
            })}
          </>
        </Arrange>
      </Arrange>
    </DisableRepliesOverlay>
  );
};
