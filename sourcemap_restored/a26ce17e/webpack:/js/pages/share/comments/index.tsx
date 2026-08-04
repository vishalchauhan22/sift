import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { ErrorBoundary, StandardError } from '@js/common/error-management';
import { useVideoPasswordContext } from '@js/common/video-password';
import { UiEvents, usePlayer, useVideoContext } from '@js/common/video-player';
import { ViewportContextProvider } from '@js/common/video-player/viewportContext';
import { useViewerInsight } from '@js/common/viewer-insights';

import {
  commentCreatedByOneOf,
  getEngagementInsightUsersFromView,
  hasUsers,
} from '@js/components/video-player-fresh/utils';
import { useIsEligibleForAiNudgeDisplay } from '@js/hooks/aiNudges';
import { CommentsSkeleton } from '@js/pages/share/comments/CommentsSkeleton';
import { DisabledCommentsPlaceholder } from '@js/pages/share/comments/DisabledCommentsPlaceholder';
import { useCreateAutoComment } from '@js/pages/share/comments/common/auto-comment-and-reaction/hooks';
import {
  CommentStateProvider,
  useCommentStore,
} from '@js/pages/share/comments/common/createStore';
import { GroupedComments } from '@js/pages/share/comments/common/grouped-comments';
import { useFetchComments } from '@js/pages/share/comments/common/hooks';
import {
  useIsRightPanelOpen,
  useOpenRightPanelAndSwitchToTab,
} from '@js/pages/share/common';
import { CommentFromServer } from '@js/pages/share/common/comments/commentFromServer';
import React from 'react';
import { useHistory } from 'react-router';

import { ErrorMarkers } from '@js/utilities/rum/constants';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { SidebarBlurAndGate } from './SidebarBlurAndGate';

import { SignupOverlay } from './common/SignupOverlay';
import { CommentsHeader } from './common/comments-header';
import { sortComments } from './common/helpers/sortComments';
import { CommentsProps } from './type';

const SCROLL_DELAY_WHEN_RIGHT_PANEL_CLOSED = 500;
const SCROLL_DELAY_WHEN_NEW_COMMENT = 100;

const CommentsWithoutFeatureWrapper = ({
  onCommentDisplay,
}: CommentsProps): React.ReactElement => {
  const {
    comments,
    videoMeetingPlatform,
    error: errorFetchingComments,
    loading,
    refetch,
  } = useFetchComments();
  const autoComment = useCreateAutoComment();
  const { video, setComments } = useVideoContext();
  const player = usePlayer(video.modelId as string);
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const isEligibleForAiNudges = useIsEligibleForAiNudgeDisplay();
  const { shouldShowLoomBranding } = useCustomBranding({
    videoId: video.modelId,
  });

  const { featureLoadedRef } = useFeatureWrapper();

  const [sortedComments, setSortedComments] = React.useState<
    CommentFromServer[]
  >([]);

  const shouldShowSidebarBlurGate =
    !isLoggedIn &&
    sortedComments.length > 0 &&
    !isEligibleForAiNudges &&
    video?.loomBrandedPlayer &&
    shouldShowLoomBranding;

  const { sharePageSelectedComments, setSharePageSelectedComments } =
    useCommentStore();

  const { selectedViewer: selectedEngagementInsightsView } = useViewerInsight();

  const isRightPanelOpen = useIsRightPanelOpen();
  const openRightPanelAndSwitchToTab = useOpenRightPanelAndSwitchToTab();

  React.useEffect(() => {
    // when a new comment is added, comments is updated
    // sortedComments at this point is the old state of the comments
    // we can check to see which comment is in comments but not in sortedComments
    // to find the new comment and highlight it
    if (comments?.length > 0 && sortedComments?.length > 0) {
      const oldCommentIds = sortedComments.map(comment => comment.id);
      const newComments = comments.filter(
        comment => !oldCommentIds.includes(comment.id)
      );

      const newCommentIds = newComments.map(comment => comment.id);

      // TODO/VIEWX-2363: remove this timeout
      // When creating a comment, the delay due to the loading state results in scrollIntoView not working
      // 100ms delay here accounts for the issue
      setTimeout(() => {
        setSharePageSelectedComments(newCommentIds);
      }, SCROLL_DELAY_WHEN_NEW_COMMENT);
    }

    onCommentDisplay(comments && comments.length > 0);
    // want to get the old state of sortedComments to see which comment is new
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, onCommentDisplay]);

  React.useEffect(() => {
    if (comments) {
      // if engagement insights panel is open with viewer selected,
      // filter comments out by selected viewer
      const engagementInsightsUsers = getEngagementInsightUsersFromView(
        selectedEngagementInsightsView
      );

      let sorted: CommentFromServer[];

      if (hasUsers(engagementInsightsUsers)) {
        const filteredComments = comments.filter(
          commentCreatedByOneOf(engagementInsightsUsers)
        );

        sorted = sortComments(
          [...filteredComments, autoComment].filter(
            Boolean
          ) as CommentFromServer[]
        );
      } else {
        sorted = sortComments(
          [...comments, autoComment].filter(Boolean) as CommentFromServer[]
        );
      }

      setSortedComments([...sorted]);
    }
  }, [selectedEngagementInsightsView, comments, setComments, autoComment]);

  // Listens for commentClicked UI events and pauses player, scrolls to
  // and highlights comments
  React.useEffect(() => {
    if (!player) {
      return;
    }

    const handleCommentEvent = selectedComments => {
      // if right panel closed -> add a delay to scroll to account for the time it'll take to open it
      const scrollDelay = isRightPanelOpen
        ? 0
        : SCROLL_DELAY_WHEN_RIGHT_PANEL_CLOSED;

      openRightPanelAndSwitchToTab();
      setTimeout(
        () => setSharePageSelectedComments(selectedComments),
        scrollDelay
      );
    };

    player?.on([UiEvents.commentClicked], handleCommentEvent);

    return () => {
      player?.off([UiEvents.commentClicked], handleCommentEvent);
    };
  }, [
    player,
    setSharePageSelectedComments,
    isRightPanelOpen,
    openRightPanelAndSwitchToTab,
  ]);

  const handleRefetchCommentsClick = () => {
    refetch();
  };

  if (errorFetchingComments && !loading) {
    return (
      <Container paddingY="20vh">
        <StandardError
          text="Comments not available"
          CTAText="Refresh comments"
          handleCTAClick={handleRefetchCommentsClick}
        />
      </Container>
    );
  }

  return (
    <div ref={featureLoadedRef}>
      <CommentsHeader
        commentsLength={sortedComments.length}
        handleRefetchCommentsClick={handleRefetchCommentsClick}
      />

      {loading ? (
        <CommentsSkeleton />
      ) : (
        <SidebarBlurAndGate
          overlay={<SignupOverlay commentCount={sortedComments.length} />}
          overlayTop="36%"
          enabled={shouldShowSidebarBlurGate}
          unScrollable
        >
          <GroupedComments
            videoMeetingPlatform={videoMeetingPlatform}
            comments={sortedComments}
            highlightGroup={sharePageSelectedComments}
            showPlaceholderWhenNoComments={true}
            inActivitySidebar
          />
        </SidebarBlurAndGate>
      )}
    </div>
  );
};

export const Comments = (props: CommentsProps): React.ReactElement => {
  return (
    <FeatureWrapper
      feature={Feature.Comments}
      errorType={ErrorBoundaryTypes.CUSTOM}
      customErrorBoundary={<CommentsWithErrorBoundary {...props} />}
    >
      <CommentsWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};

const CommentsWithErrorBoundary = (props: CommentsProps): JSX.Element => {
  const history = useHistory();

  const handleRefreshButtonClick = () => {
    history.go(0);
  };

  const { reportError } = useFeatureWrapper();

  return (
    <ErrorBoundary
      feature={Feature.Comments}
      name={ErrorMarkers.SharePageCommentsErrorBoundary}
      onError={error => reportError(Feature.Comments, error)}
      renderError={() => (
        <Container paddingY="20vh">
          <StandardError
            text="Comments not available"
            CTAText="Refresh page"
            handleCTAClick={handleRefreshButtonClick}
            showWarningIcon={true}
          />
        </Container>
      )}
    >
      <CommentsWithoutFeatureWrapper {...props} />
    </ErrorBoundary>
  );
};

export const CommentsWithProvider = ({
  onCommentDisplay,
  isScrolledInSidebar,
}: CommentsProps): React.ReactElement | null => {
  const { video } = useVideoContext();
  const { needsPassword, password } = useVideoPasswordContext();
  const ref = React.useRef(null);
  const currentUserCanEdit = video?.currentUserCanEdit;

  if (needsPassword && !password) {
    return null;
  }

  if (!video.commentsEnabled && !currentUserCanEdit) {
    return <DisabledCommentsPlaceholder />;
  }

  return (
    // TODO: VV: We don't actually want this provider stack here, we want to refactor the components.
    <ViewportContextProvider ref={ref}>
      <section className="commentsWrapper" id="comments" ref={ref}>
        <CommentStateProvider>
          <Comments
            onCommentDisplay={onCommentDisplay}
            isScrolledInSidebar={isScrolledInSidebar}
          />
        </CommentStateProvider>
      </section>
    </ViewportContextProvider>
  );
};
