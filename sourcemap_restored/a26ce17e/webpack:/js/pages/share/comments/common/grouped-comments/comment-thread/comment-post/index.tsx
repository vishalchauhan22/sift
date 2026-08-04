import {
  COMMENT_EDIT_TYPE,
  COMMENT_DELETE_TYPE,
  COMMENT_RESTORE_TYPE,
} from '@js/constants/comments';
import {
  VIDEO_COMMENT_EDITED,
  VIDEO_COMMENT_DELETED,
  VIDEO_COMMENT_RESTORED,
} from '@js/constants/events';

import classNames from 'classnames';
import { useVideoContext } from '@js/common/video-player';

import { useClipboard } from '@js/hooks/useClipboard';
import { useMount } from '@js/hooks/useMount';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { AvatarContainerComment } from '@js/pages/share/comments/common/AvatarContainerComment';
import { AvatarContainerReply } from '@js/pages/share/comments/common/AvatarContainerReply';
import { HighlightElementAndConditionallyScroll } from '@js/pages/share/comments/common/HighlightElementAndConditionallyScroll';
import { useDeleteAutoComment } from '@js/pages/share/comments/common/auto-comment-and-reaction/hooks';
import { EditCommentInput } from '@js/pages/share/comments/common/comment-input/EditCommentInput';
import { CommentHoverWrapper } from '@js/pages/share/comments/common/commentHoverAndHighlightStyles';
import { ReplyButtonAndEmojiSlider } from '@js/pages/share/comments/common/grouped-comments/comment-thread/common/ReplyButtonAndEmojiSlider';
import { getFormattedDateForHeader } from '@js/pages/share/comments/common/helpers';
import {
  useOpenRightPanelAndSwitchToTab,
  useCommentsFullSize,
} from '@js/pages/share/common';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import { ReplyFromServer } from '@js/pages/share/common/comments/replyFromServer';
import { isAutoComment } from '@js/pages/share/common/helpers';
import React, { useEffect, useMemo, useState } from 'react';

import { isMobile } from '@js/utilities/device';
import { CommentTypeAndId } from '@js/utilities/types';
import { inEmbedPlayer, getParam, removeParam } from '@js/utilities/url';

import { Arrange, Text, Split, SplitSection, Tooltip } from '@loomhq/lens';
import { timeUtils } from '@loomhq/shared-utilities';
import {
  COMMENT_ID_QUERY_PARAM,
  REPLY_ID_QUERY_PARAM,
} from '@loomhq/shared-utilities/constants/mention';
import { REPLY_TO_COMMENT_PARAM } from '@loomhq/shared-utilities/constants/urlParams';

import * as analytics from '@js/utilities/analytics';

import { getShareVideoUrl } from '@js/utilities/video';

import { AutoCommentHeader } from './AutoCommentHeader';
import { CommentAvatar } from './CommentAvatar';
import { CommentOnHoverButtons } from './CommentOnHoverButtons';
import { FullyDeletedCommentPlaceholder } from './FullyDeletedCommentPlaceholder';
import { LocallyDeletedCommentPlaceholder } from './LocallyDeletedCommentPlaceholder';
import { PostBodyFreshEmbed } from './PostBodyFreshEmbed';
import { TimestampSection } from './TimestampSection';
import { useCanDelete } from './useCanDelete';
import { useCanEdit } from './useCanEdit';
import { useDeleteComment } from './useDeleteComment';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

enum UpdateCommentType {
  Edit,
  Delete,
  Restore,
}

const { formatDateToHumanReadableString } = timeUtils;

// In a component since it has hooks that must be called conditonally
const OpenRightPanelIfCommentHighlight = (): React.ReactElement => {
  const openRightPanelAndSwitchToTab = useOpenRightPanelAndSwitchToTab();

  useMount(() => {
    openRightPanelAndSwitchToTab();
  });

  return <></>;
};
const isCommentOrReplyToHighlight = (id: string): boolean => {
  const commentIdToHighlight = getParam(COMMENT_ID_QUERY_PARAM);
  const replyIdToHighlight = getParam(REPLY_ID_QUERY_PARAM);
  const replyToCommentIdToHighlight = getParam(REPLY_TO_COMMENT_PARAM);

  if (commentIdToHighlight !== '') {
    return commentIdToHighlight === id;
  }

  if (replyIdToHighlight !== '') {
    return replyIdToHighlight === id;
  }

  if (replyToCommentIdToHighlight !== '') {
    return replyToCommentIdToHighlight === id;
  }

  return false;
};

const videoMeetingPlatformLabels = {
  google_meet: `Google Meet`,
  microsoft_teams: `Microsoft Teams`,
  webex: `Webex`,
  zoom: `Zoom`,
};

type CommentPostProps = {
  comment: CommentFromServer | ReplyFromServer;
  videoMeetingPlatform: string | null;
  isReply?: boolean;
  isEditingParentComment?: boolean;
  isLastReply?: boolean;
  onCollapseRepliesButtonClick?: () => void;
  parentId?: string;
  setIsEditingParentComment?: (editingParent: boolean) => void;
  recentlyDeleted: { commentIds: string[]; replyIds: string[] };
  addCommentOrReplyDeleted: (id: string) => void;
  lastCommentLocallyDeleted: CommentTypeAndId;
  setLastCommentLocallyDeleted: (commentInfo: CommentTypeAndId) => void;
  replyFieldShowing?: boolean;
};

export const CommentPost = ({
  comment,
  videoMeetingPlatform,
  isReply,
  isEditingParentComment,
  isLastReply = false,
  onCollapseRepliesButtonClick,
  parentId,
  setIsEditingParentComment,
  recentlyDeleted,
  addCommentOrReplyDeleted,
  lastCommentLocallyDeleted,
  setLastCommentLocallyDeleted,
  replyFieldShowing,
}: CommentPostProps): React.ReactElement | null => {
  const fullSize = useCommentsFullSize();
  const canDelete = useCanDelete(comment);
  const canEdit = useCanEdit(comment);
  const fontSize = fullSize ? 'medium' : 'small';
  const {
    video: { id: videoId },
  } = useVideoContext();
  const url = getShareVideoUrl(videoId);
  let urlToComment = url.concat(
    '?',
    isReply ? REPLY_ID_QUERY_PARAM : COMMENT_ID_QUERY_PARAM,
    '=',
    comment.id
  );
  const [editing, setEditing] = useState(false);
  const selectedWorkspace = useGetSelectedWorkspace();

  const humanReadableCreatedDate: string = formatDateToHumanReadableString(
    comment.createdAt
  );

  const isEmbed = inEmbedPlayer();

  const trackUpdateComment = (type: UpdateCommentType) => {
    let trackingConstant;
    let commentType;

    switch (type) {
      case UpdateCommentType.Edit:
        trackingConstant = VIDEO_COMMENT_EDITED;
        commentType = COMMENT_EDIT_TYPE;
        break;
      case UpdateCommentType.Delete:
        trackingConstant = VIDEO_COMMENT_DELETED;
        commentType = COMMENT_DELETE_TYPE;
        break;
      case UpdateCommentType.Restore:
        trackingConstant = VIDEO_COMMENT_RESTORED;
        commentType = COMMENT_RESTORE_TYPE;
        break;
      default:
        break;
    }

    analytics.track(trackingConstant, {
      ...withIdentifiers(
        trackingConstant,
        AnalyticsEntityId.user(comment.user_id, 'user_id'),
        AnalyticsEntityId.anonymous(comment.anon_user_id, 'anonymous_user_id'),
        AnalyticsEntityId.workspace(
          selectedWorkspace.id,
          'string',
          'organization_id'
        ),
        AnalyticsEntityId.video(videoId, 'video_id'),
        AnalyticsEntityId.commentPost(comment.id, 'string', 'comment_id')
      ),
      [commentType]: isReply ? 'Reply' : 'Comment',
    });
  };

  const deleteComment = useDeleteComment(
    comment,
    () => {
      // analytics tracking
      trackUpdateComment(UpdateCommentType.Delete);
    },
    () => {
      // to help show only one placeholder
      setLastCommentLocallyDeleted({
        type: isReply ? 'reply' : 'comment',
        id: comment.id,
      });
    }
  );

  const { deleteAutoComment } = useDeleteAutoComment();

  if (typeof comment.time_stamp === 'number') {
    urlToComment = urlToComment.concat('&t=', String(comment.time_stamp));
  }

  const [isLinkCopied, setIsLinkCopied] = useClipboard(urlToComment, {
    successDuration: 2000,
  });

  const copyLink = () => {
    setIsLinkCopied();
  };

  const chatSource = videoMeetingPlatform
    ? videoMeetingPlatformLabels[videoMeetingPlatform]
    : null;

  /* --- START: Scrolling to comment if in link --- */
  const cleanupScroll = React.useCallback(
    (node: any) =>
      node.addEventListener('animationend', () => {
        removeParam(window)(REPLY_ID_QUERY_PARAM);
        removeParam(window)(COMMENT_ID_QUERY_PARAM);
        removeParam(window)(REPLY_TO_COMMENT_PARAM);
        removeParam(window)('t');
      }),
    []
  );

  // Wait 1s before scrolling to avoid janky animation (same time as share page skeleton)
  const [scrollBuffer, setScrollBuffer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollBuffer(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shouldScrollAndHighlight =
    useMemo(() => isCommentOrReplyToHighlight(comment.id), [comment.id]) &&
    !scrollBuffer;

  /* --- END: Scrolling to comment if in link --- */

  const onEditButtonClick = React.useCallback(() => {
    setEditing(true);

    if (!isReply && setIsEditingParentComment !== undefined) {
      setIsEditingParentComment(true);
    }
  }, [isReply, setIsEditingParentComment]);

  const onEditClose = React.useCallback(() => {
    setEditing(false);

    if (!isReply && setIsEditingParentComment !== undefined) {
      setIsEditingParentComment(false);
    }
  }, [isReply, setIsEditingParentComment]);

  useEffect(() => {
    if (comment.inFlightContent) {
      // open the edit comment input back up if there was a backend failure
      onEditButtonClick();
    }
    // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.inFlightContent]);

  // if top comment deleted
  const isTopCommentFullyDeleted =
    !isReply &&
    (comment as CommentFromServer).deletedAt &&
    (!comment.locallyDeleted ||
      (comment.locallyDeleted &&
        recentlyDeleted.commentIds.includes(comment.id)));

  if (isTopCommentFullyDeleted) {
    return <FullyDeletedCommentPlaceholder />;
  }

  if (comment.locallyDeleted) {
    // if the current comment is the last comment locally deleted, show placeholder
    const bothReplyType = isReply && lastCommentLocallyDeleted.type === 'reply';
    const bothCommentType =
      !isReply && lastCommentLocallyDeleted.type === 'comment';
    const isCurrentAndLastLocallyDeletedSameType =
      bothReplyType || bothCommentType;
    const lastDeleted =
      isCurrentAndLastLocallyDeletedSameType &&
      lastCommentLocallyDeleted.id === comment.id;
    // if lastCommentLocallyDeleted was already dismissed, show placeholder (happens on first re-render)
    const lastCommentDeletedAlreadyDismissed =
      lastCommentLocallyDeleted.type === 'reply'
        ? recentlyDeleted.replyIds.includes(lastCommentLocallyDeleted.id)
        : recentlyDeleted.commentIds.includes(lastCommentLocallyDeleted.id);
    // if the current comment was already dismissed, don't show placeholder
    const alreadyDismissed = isReply
      ? recentlyDeleted.replyIds.includes(comment.id)
      : recentlyDeleted.commentIds.includes(comment.id);

    if (
      (lastDeleted || lastCommentDeletedAlreadyDismissed) &&
      !alreadyDismissed
    ) {
      return (
        <LocallyDeletedCommentPlaceholder
          comment={comment}
          trackRestoreComment={() =>
            trackUpdateComment(UpdateCommentType.Restore)
          }
          addCommentOrReplyDeleted={addCommentOrReplyDeleted}
        />
      );
    }

    // if the current comment is locally deleted and it wasn't the last one locally deleted, add to recently deleted (so it doesn't show)
    addCommentOrReplyDeleted(comment.id);

    return null;
  }

  const replies = (comment as CommentFromServer).children_comments;
  const noReplies =
    !replies?.length ||
    replies?.every(reply => recentlyDeleted.replyIds.includes(reply.id));

  const shouldShowStraightLineUnderAvatar = () => {
    if (isReply) {
      // if this comment is a reply:
      // if not in activity sidebar, always show line on reply
      // if in activity sidebar either:
      //   show line on all replies except the last
      //   show line on all replies if the reply field is open
      return !isLastReply || (isLastReply && replyFieldShowing);
    } else if (noReplies) {
      // if this comment is a single comment with no replies:
      // show line if reply field is open
      return replyFieldShowing;
    }
  };

  if (editing) {
    return (
      <EditCommentInput
        comment={comment}
        onClose={onEditClose}
        trackEditComment={() => trackUpdateComment(UpdateCommentType.Edit)}
      />
    );
  }

  return (
    <>
      <HighlightElementAndConditionallyScroll
        shouldScroll={shouldScrollAndHighlight}
        onPageLoad={true}
        inActivitySidebar
        cleanupAfterHighlight={cleanupScroll}
      >
        <CommentHoverWrapper show={!isMobile}>
          <Arrange
            gap={fullSize ? 'medium' : 'xsmall'}
            columns={['auto', '1fr']}
            alignItems="start"
          >
            {isReply ? (
              <AvatarContainerReply>
                <CommentAvatar comment={comment} fullSize={fullSize} />
                {shouldShowStraightLineUnderAvatar() && (
                  <div className="straightLine" />
                )}
              </AvatarContainerReply>
            ) : noReplies ? (
              <AvatarContainerComment singleComment>
                <CommentAvatar comment={comment} fullSize={fullSize} />
                {shouldShowStraightLineUnderAvatar() && (
                  <div className="straightLine" />
                )}
              </AvatarContainerComment>
            ) : (
              <AvatarContainerComment singleComment={false}>
                <CommentAvatar comment={comment} fullSize={fullSize} />
                <div
                  className="straightLine"
                  style={isEditingParentComment ? { opacity: '30%' } : {}}
                />
              </AvatarContainerComment>
            )}

            <div className={classNames('comment-container')}>
              <>
                <Split justifyContent="space-between">
                  <SplitSection>
                    <Arrange gap="xsmall">
                      <Text fontWeight="bold">
                        {(comment as CommentFromServer).user_name ??
                          'Anonymous'}
                      </Text>
                      {!isReply && (
                        <TimestampSection
                          time={(comment as CommentFromServer).time_stamp}
                          fontSize={fontSize}
                          inActivitySidebar
                        />
                      )}
                      {comment.isChatMessage && chatSource ? (
                        <Text size="body-sm" color="bodyDimmed">
                          from {chatSource}
                        </Text>
                      ) : (
                        <Tooltip
                          content={humanReadableCreatedDate}
                          placement="topCenter"
                        >
                          <Text size={fontSize} color="bodyDimmed">
                            {getFormattedDateForHeader(comment.createdAt, {
                              showShorthand: true,
                            })}
                          </Text>
                        </Tooltip>
                      )}
                      {comment.edited && (
                        <Text size={fontSize} color="bodyDimmed">
                          (edited)
                        </Text>
                      )}
                    </Arrange>
                  </SplitSection>

                  <SplitSection>
                    <CommentOnHoverButtons
                      commentId={comment.id}
                      copyButton={{
                        isCopied: isLinkCopied,

                        onClick: copyLink,
                      }}
                      editButton={{
                        show: canEdit,

                        onClick: onEditButtonClick,
                      }}
                      deleteButton={{
                        show: canDelete,
                        onClick: isAutoComment(comment.id)
                          ? deleteAutoComment
                          : deleteComment,
                      }}
                    />
                  </SplitSection>
                </Split>
                <div>
                  {isAutoComment(comment.id) && <AutoCommentHeader />}
                  <PostBodyFreshEmbed comment={comment} />
                </div>
                {isLastReply ? (
                  <ReplyButtonAndEmojiSlider
                    comment={comment} // 🚩 End: EXP_MWEB_COMMENTING
                    commentId={isReply && parentId ? parentId : comment.id}
                    onCollapseRepliesButtonClick={onCollapseRepliesButtonClick}
                  />
                ) : null}
              </>
            </div>
          </Arrange>
        </CommentHoverWrapper>
      </HighlightElementAndConditionallyScroll>
      {!isEmbed && shouldScrollAndHighlight && (
        <OpenRightPanelIfCommentHighlight />
      )}
    </>
  );
};
