import { useCurrentUserSelector } from '@js/common/current-user';
import {
  GetTranscriptForNotificationQuery,
  useGetTranscriptForNotificationQuery,
} from '@js/common/destination-notifications/queries/getTranscriptForNotifications.generated';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import pluralize from 'pluralize';
import React, { useMemo, useState } from 'react';

import {
  Align,
  Arrange,
  Container,
  Icon,
  IconButton,
  Link,
  Spacer,
  Text,
  TextButton,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgTranscript } from '@loomhq/lens/icons/transcript';
import { SvgReplyLeft } from '@loomhq/lens/icons/reply-left';

import { timeUtils } from '@loomhq/shared-utilities';
import {
  NotificationClientType,
  NotificationType,
} from '@loomhq/shared-utilities/constants/notifications';

import NotificationsVideoPlayer, {
  getSnippetTimestamps,
} from '../notifications-video-player';
import { CommentCardProps, Reply, ReplyThreadPreviewProps } from '../types';
import { CommentContainer, NotificationLink, ReplyInput } from './common';

const { secondsToVideoTS } = timeUtils;

const COMMENT_TO_FOLLOWER = 'comment-to-follower';

const ACTION_TITLES = {
  [NotificationClientType.Comment]: 'Comment on',
  [NotificationClientType.Reply]: 'Reply to your comment on',
  [NotificationClientType.PostCommentMention]: 'You were mentioned on',
  [NotificationClientType.ReplyCommentMention]:
    'You were mentioned on a reply on',
  [COMMENT_TO_FOLLOWER]: "Comment on a video you're following:",
};

type AllNotificationTypes = NotificationClientType | NotificationType;

const selectTranscriptDataForNotifications = (
  data: GetTranscriptForNotificationQuery | undefined
) => {
  const transcriptSnippet =
    data?.getTranscriptForNotification?.__typename ===
      'GetTranscriptForNotificationPayload' &&
    data?.getTranscriptForNotification?.transcript;
  const nextTranscriptSnippet =
    data?.getTranscriptForNotification?.__typename ===
      'GetTranscriptForNotificationPayload' &&
    data?.getTranscriptForNotification?.nextTranscript;

  return { transcriptSnippet, nextTranscriptSnippet };
};

export const generateReplyThreadPreview = ({
  notification,
  userId,
  isExpandedThreadView,
}: ReplyThreadPreviewProps): {
  replies: Reply[];
  showReplyBox: boolean;
  minimizedReplyCount: number;
  showSeeNewerReplies: boolean;
} => {
  const allReplies = notification.data?.replies ?? [];

  if (allReplies.length === 0) {
    return {
      replies: [],
      showReplyBox: true,
      minimizedReplyCount: 0,
      showSeeNewerReplies: false,
    };
  }

  const commentTypes = [
    NotificationClientType.Comment,
    NotificationClientType.PostCommentMention,
  ] as AllNotificationTypes[];

  // If there's a reply and it's a comment, only show the first reply
  if (commentTypes.includes(notification.notificationType)) {
    const showSeeNewerReplies = allReplies.length > 1;

    return {
      replies: [allReplies[0]],
      showReplyBox: false,
      minimizedReplyCount: 0,
      showSeeNewerReplies,
    };
  }

  // Find the reply index for which this notification was created for to create a snapshot
  // of the reply thread. This is because the response returns the full reply thread everytime (which may
  // have been updated with more replies).
  const snapshotReplyIndex = allReplies.findIndex(
    reply => notification.data?.replyId === reply.id
  );

  if (snapshotReplyIndex < 0) {
    return {
      replies: allReplies,
      showReplyBox: false,
      minimizedReplyCount: 0,
      showSeeNewerReplies: false,
    };
  }

  const snapshotReplies = isExpandedThreadView
    ? allReplies.slice(0, snapshotReplyIndex + 1)
    : allReplies.slice(snapshotReplyIndex, snapshotReplyIndex + 1);

  const nextReply = allReplies[snapshotReplyIndex + 1];

  if (!nextReply) {
    // No more replies, this is the most recent message
    return {
      replies: snapshotReplies,
      showReplyBox: true,
      minimizedReplyCount: snapshotReplyIndex,
      showSeeNewerReplies: false,
    };
  }

  // If there are more replies and they are from the current user, then show the reply
  const userReplies = nextReply.userId === userId ? [nextReply] : [];

  const replies = [...snapshotReplies, ...userReplies];

  return {
    replies,
    showReplyBox: false,
    minimizedReplyCount: snapshotReplyIndex,
    // If there are newer replies, enable prompt to view more
    showSeeNewerReplies:
      snapshotReplyIndex + 1 < allReplies.length - userReplies.length,
  };
};

export const CommentCard = ({
  notification,
}: CommentCardProps): JSX.Element => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isExpandedThreadView, setIsExpandedThreadView] = useState(false);
  const userId = useCurrentUserSelector(user => user.id, NaN);
  const isVideoFollower = Boolean(notification.data?.isVideoFollower);
  const transcriptTimestamp = secondsToVideoTS(notification.timestamp, 0);

  const notificationTimestamp = notification.timestamp;
  const videoId = notification.video?.id;

  const { data } = useGetTranscriptForNotificationQuery({
    variables: {
      videoId,
      timestamp: notificationTimestamp,
    },
  });

  const { transcriptSnippet, nextTranscriptSnippet } =
    selectTranscriptDataForNotifications(data);

  const { replies, showReplyBox, minimizedReplyCount, showSeeNewerReplies } =
    useMemo(() => {
      const replyPreviewState = generateReplyThreadPreview({
        notification,
        userId,
        isExpandedThreadView,
      });

      replyPreviewState.replies = replyPreviewState.replies.filter(
        reply => reply
      );

      return replyPreviewState;
    }, [isExpandedThreadView, notification, userId]);

  const onTranscriptToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    setShowTranscript(!showTranscript);
  };

  const onShowMore = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsExpandedThreadView(true);
  };

  let startTimestamp;
  let stopTimestamp;

  if (transcriptSnippet && nextTranscriptSnippet) {
    startTimestamp = transcriptSnippet.ts;
    stopTimestamp = nextTranscriptSnippet.ts;
  } else {
    [startTimestamp, stopTimestamp] = getSnippetTimestamps(startTimestamp);
  }

  const titleActionPrefix =
    isVideoFollower &&
    notification.notificationType === NotificationClientType.Comment
      ? ACTION_TITLES[COMMENT_TO_FOLLOWER]
      : ACTION_TITLES[notification.notificationType];
  const placeholder = `Reply to ${notification.user?.name} or add others with @`;

  const notificationBody = (
    <Container>
      <Container>
        <Arrange justifyContent="space-between" gap="medium">
          <Align alignment="topCenter">
            <Text hasEllipsis className="width:full" htmlTag="h2">
              <Text color="bodyDimmed" isInline>
                {titleActionPrefix}{' '}
              </Text>
              <NotificationLink url={notification.url}>
                {notification.video?.name}
              </NotificationLink>
            </Text>
          </Align>
          {transcriptSnippet ? (
            <>
              <TextButton
                iconPosition="right"
                icon={
                  <div>
                    <Icon color="primary" icon={<SvgTranscript />} />
                  </div>
                }
                onClick={onTranscriptToggle}
              >
                <Text color="primary" fontWeight="bold">
                  {transcriptTimestamp}
                </Text>
              </TextButton>
            </>
          ) : (
            <Spacer top={4} />
          )}
        </Arrange>
        <Spacer top="0.625rem" />
        {transcriptSnippet && showTranscript && (
          <>
            <Container
              backgroundColor="backgroundSecondary"
              radius="large"
              borderSide="all"
              padding="medium"
            >
              <Arrange gap="medium" alignItems="start" columns="auto 1fr auto">
                <Text color="primary">{transcriptTimestamp}</Text>
                <Text hasEllipsis ellipsisLines={3}>
                  {transcriptSnippet.value}
                </Text>
                <IconButton
                  altText="Close"
                  icon={<SvgClose />}
                  onClick={onTranscriptToggle}
                  size="small"
                />
              </Arrange>
            </Container>
            <Spacer top="medium" />
          </>
        )}
      </Container>
      <CommentContainer
        avatarSrc={notification.data?.commentPost?.avatar}
        name={notification.data?.commentPost?.userName}
        createdAt={formatDistanceToNow(
          new Date(notification.data?.commentPost?.createdAt),
          { addSuffix: true }
        )}
        content={notification.data?.commentPost?.content}
        profileId={notification.data?.commentPost?.userId}
        timestamp={secondsToVideoTS(notification.data?.commentPost?.timestamp)}
        url={notification.url}
      />

      {!isExpandedThreadView && (
        <ShowMoreReplies
          replyCount={minimizedReplyCount}
          onShowMore={onShowMore}
        />
      )}

      {replies.map(reply => (
        <CommentContainer
          key={reply.id}
          avatarSrc={reply.avatar}
          name={reply.userName}
          createdAt={formatDistanceToNow(new Date(reply.createdAt), {
            addSuffix: true,
          })}
          content={reply.content}
          profileId={reply.userId}
          timestamp={secondsToVideoTS(reply.timestamp)}
          alertIcon={reply.userId === userId && <SvgReplyLeft />}
          url={notification.url}
        />
      ))}
      {showReplyBox && (
        <ReplyInput
          notificationTrayItemId={notification.id}
          videoId={videoId}
          parentPostId={notification.data?.commentId}
          timestamp={notificationTimestamp}
          placeholder={placeholder}
        />
      )}

      {showSeeNewerReplies && <SeeNewerReplies notification={notification} />}
    </Container>
  );

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'auto'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      {notification.data ? (
        notificationBody
      ) : (
        <Container
          backgroundColor="backgroundSecondary"
          radius="large"
          borderSide="all"
          padding="small"
          paddingLeft="medium"
        >
          <Text isDimmed>[Comment not available]</Text>
        </Container>
      )}

      <div className="none sm-block">
        <Align alignment="topCenter">
          <Container radius="large" borderSide="all" overflow="hidden">
            <NotificationsVideoPlayer
              startTimestamp={startTimestamp}
              stopTimestamp={stopTimestamp}
              title={notification.video?.name}
              url={notification.url}
              videoModel={notification.video.enhancedVideo}
            />
          </Container>
        </Align>
      </div>
    </Arrange>
  );
};

const ShowMoreReplies = ({ replyCount, onShowMore }) => {
  return replyCount > 0 ? (
    <Spacer bottom="medium" x={5.5}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link htmlTag="button" onClick={onShowMore}>
        Show {replyCount} more {pluralize('reply', replyCount)}
      </Link>
    </Spacer>
  ) : null;
};

const SeeNewerReplies = ({
  notification,
}: {
  notification: CommentCardProps['notification'];
}) => (
  <Spacer x={5.5} y="small">
    <Link href={notification.url}>Go to newer replies</Link>
  </Spacer>
);
