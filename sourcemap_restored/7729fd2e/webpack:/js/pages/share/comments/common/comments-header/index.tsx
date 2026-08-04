import { CREATION_METHOD_SIDEBAR } from '@js/constants/comments';

// TODO(next author): Please convert styled component to native Lens and/or module css instead

// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useIsMeetingRecording } from '@js/common/meeting-recordings';
import { useGetVideoTasksQuery } from '@js/common/tasks/GetVideoTasks.generated';
import { filterTasks } from '@js/common/tasks/filterTasks';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useVideoContext, isMarketingLoom } from '@js/common/video-player';
import { getTabsHeight } from '@js/components/share-video-fresh/right-panel/heights';

import { useIsEligibleForAiNudgeDisplay } from '@js/hooks/aiNudges';

import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';

import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';

import { CommentInput } from '@js/pages/share/comments/common/comment-input';
import { FollowLoomButton } from '@js/pages/share/comments/common/follow-loom-button';

import { useIsUserMemberOfVideoWorkspace } from '@js/pages/share/common';
import pluralize from 'pluralize';
import React, { useState } from 'react';

import { isMobile } from '@js/utilities/device';

import {
  Container,
  Text,
  Arrange,
  Spacer,
  Split,
  SplitSection,
} from '@loomhq/lens';

import { useGetUserFollowsVideoQuery } from './GetUserFollowsVideo.generated';
import { RefreshCommentsButton } from './RefreshCommentsButton';
import { BacklinksSection } from './backlinks-section';
import { Tasks } from './tasks';
import { TaskInput } from './tasks/components/TaskInput';
import { useShowTasks } from './tasks/hooks/useShowTasks';

type CommentsHeaderProps = {
  commentsLength: number;
  handleRefetchCommentsClick: () => void;
};

const StickyContainer = styled.div<{
  top: number;
}>`
  position: sticky;
  background-color: var(--lns-color-background);

  padding: var(--lns-space-large) var(--lns-space-large) var(--lns-space-medium);
  margin: 0 calc(-1 * var(--lns-space-large));

  transition: box-shadow 0.5s;
  z-index: 1;

  // TODO/NOTE([VIEWX-2200]): Using a relational selector in styled components is not ideal/
  // It assumes a relationship exists which makes it brittle/easy to break.
  // https://www.loom.com/share/eb2ce7e045494b5da476c0339a5b9f81
  .sidebar-scrolled & {
    box-shadow: 0px var(--lns-space-xsmall) var(--lns-space-medium)
      var(--lns-color-backgroundHover);
  }

  ${props => `top: ${props.top}px;`}
`;

/**
 *  * Only display count if non-zero.
 *
 * Keep the SplitSection component regardless of the count to maintain
 * a consistent flex layout, with or without a count.
 */
const CommentCount = ({ count }: { count: number }): JSX.Element | null => {
  return (
    <SplitSection height={3}>
      {count > 0 ? (
        <Text size="body-md">{`${count} ${pluralize('comment', count)}`}</Text>
      ) : null}
    </SplitSection>
  );
};

const CommentActionsAndBacklinkSection = ({
  videoId,
  commentsLength,
  handleRefetchCommentsClick,
  shouldShowFollowLoomButton,
  isFollowingVideo,
}: {
  videoId: string;
  commentsLength: number;
  handleRefetchCommentsClick: () => void;
  shouldShowFollowLoomButton: boolean;
  isFollowingVideo: boolean | undefined;
}): JSX.Element => {
  const isUserMemberOfVideoWorkspace = useIsUserMemberOfVideoWorkspace();

  return (
    <Split justifyContent="space-between">
      <Arrange gap={1}>
        <CommentCount count={commentsLength} />
        {shouldShowFollowLoomButton ? (
          <FollowLoomButton
            videoId={videoId}
            withNewCommentEntryPoint={true}
            isFollowingVideo={isFollowingVideo}
            popoverPlacement="bottomLeft"
            isCompact
          />
        ) : null}
        <RefreshCommentsButton
          isCompact
          refreshCommentsOnClick={handleRefetchCommentsClick}
        />
      </Arrange>

      {isUserMemberOfVideoWorkspace ? (
        <BacklinksSection videoId={videoId} />
      ) : null}
    </Split>
  );
};

const CommentsHeaderWithNewEntryPoint = ({
  videoId,
  commentsLength,
  handleRefetchCommentsClick,
  shouldShowFollowLoomButton,
  isFollowingVideo,
}: CommentsHeaderProps & {
  videoId: string;
  shouldShowFollowLoomButton: boolean;
  isFollowingVideo: boolean | undefined;
}) => {
  const { password } = useVideoPasswordContext();
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const isMeetingRecording = useIsMeetingRecording(videoId);

  const { data, loading, error } = useGetVideoTasksQuery({
    variables: { videoId, password },
    skip: !isLoggedIn || isMeetingRecording,
  });

  const { approvedTasks } = filterTasks(data);

  const showTaskArea = useShowTasks({
    approvedTasks,
  });

  const [isAddingTask, setIsAddingTask] = useState(false);

  const taskInputRef = React.useRef<HTMLTextAreaElement>(null);

  const hideCommentInputForAnonMarketingLoom =
    !isLoggedIn && isMarketingLoom(videoId);

  // 🚩 Start: EXP_MWEB_COMMENTING
  const { isExpMwebCommenting } = useExpMwebCommenting();

  const hideCommentInput =
    hideCommentInputForAnonMarketingLoom || isExpMwebCommenting;
  // 🚩 End: EXP_MWEB_COMMENTING

  if (!loading && !error && showTaskArea) {
    return (
      <>
        <StickyContainer id="activity-input-header" top={getTabsHeight()}>
          {isAddingTask ? (
            <TaskInput
              videoId={videoId}
              onClose={() => setIsAddingTask(false)}
              taskInputRef={taskInputRef}
              isNew
            />
          ) : !hideCommentInput ? (
            <CommentInput
              isNewCommentEntryPoint={true}
              creationMethod={CREATION_METHOD_SIDEBAR}
            />
          ) : null}
        </StickyContainer>

        {!isMeetingRecording ? (
          <Tasks
            videoId={videoId}
            setIsAddingNewTask={setIsAddingTask}
            taskInputRef={taskInputRef}
          />
        ) : null}

        <CommentActionsAndBacklinkSection
          videoId={videoId}
          commentsLength={commentsLength}
          handleRefetchCommentsClick={handleRefetchCommentsClick}
          shouldShowFollowLoomButton={shouldShowFollowLoomButton}
          isFollowingVideo={isFollowingVideo}
        />
        <Spacer bottom={2.5} />
      </>
    );
  }

  return (
    <StickyContainer id="comments-tab-header" top={getTabsHeight()}>
      {isAddingTask ? (
        <TaskInput
          videoId={videoId}
          onClose={() => setIsAddingTask(false)}
          taskInputRef={taskInputRef}
          isNew
        />
      ) : !hideCommentInput ? (
        <CommentInput
          isNewCommentEntryPoint={true}
          creationMethod={CREATION_METHOD_SIDEBAR}
        />
      ) : null}

      <Spacer bottom={2.5} />

      {!isMeetingRecording ? (
        <Tasks
          videoId={videoId}
          setIsAddingNewTask={setIsAddingTask}
          taskInputRef={taskInputRef}
        />
      ) : null}

      <CommentActionsAndBacklinkSection
        videoId={videoId}
        commentsLength={commentsLength}
        handleRefetchCommentsClick={handleRefetchCommentsClick}
        shouldShowFollowLoomButton={shouldShowFollowLoomButton}
        isFollowingVideo={isFollowingVideo}
      />
    </StickyContainer>
  );
};

export const CommentsHeader = ({
  commentsLength,
  handleRefetchCommentsClick,
}: CommentsHeaderProps): JSX.Element | null => {
  // using modelId as videoId to ensure playerId is never accidentally used
  const {
    video: { modelId: videoId },
  } = useVideoContext();

  const currentUserIsOwner = useCurrentUserIsOwner({ videoId });
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isLoggedInNonCreator = !currentUserIsOwner && isLoggedIn;

  const {
    data: followingVideoData,
    loading: isFollowingVideoResultLoading,
    error: followingVideoError,
  } = useGetUserFollowsVideoQuery({
    variables: {
      videoId,
    },
    skip: !isLoggedInNonCreator,
  });

  const showNewCommentEntryPoint = isLoggedIn;
  const isEligibleForAiNudgeDisplay = useIsEligibleForAiNudgeDisplay();
  const shouldShowNewCommentEntryPoint =
    showNewCommentEntryPoint || isEligibleForAiNudgeDisplay;

  if (isFollowingVideoResultLoading) {
    return null;
  }

  const isFollowingVideo =
    followingVideoData?.result?.__typename === 'UserFollowsStream'
      ? (followingVideoData.result.follow ?? undefined)
      : undefined;

  const shouldShowFollowLoomButton =
    isLoggedInNonCreator && !followingVideoError;

  return (
    <>
      {shouldShowNewCommentEntryPoint ? (
        <CommentsHeaderWithNewEntryPoint
          videoId={videoId}
          commentsLength={commentsLength}
          handleRefetchCommentsClick={handleRefetchCommentsClick}
          shouldShowFollowLoomButton={shouldShowFollowLoomButton}
          isFollowingVideo={isFollowingVideo}
        />
      ) : (
        <Container paddingTop={!isMobile ? 'medium' : undefined}>
          {shouldShowFollowLoomButton ? (
            <Container paddingBottom={!isMobile ? 'medium' : undefined}>
              <Arrange alignContent="end" gap="small">
                <FollowLoomButton
                  videoId={videoId}
                  isFollowingVideo={isFollowingVideo}
                  popoverPlacement="bottomLeft"
                />
              </Arrange>
            </Container>
          ) : null}
        </Container>
      )}
    </>
  );
};
