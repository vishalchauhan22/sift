import React, { useMemo, useRef, useState } from 'react';

import { Spacer } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useIsMeetingRecording } from '@js/common/meeting-recordings';

import { SidebarTabErrorBoundary } from '@js/common/right-panel/SidebarTabErrorBoundary';

import { useTranscriptStatus } from '@js/common/transcripts/useTranscriptStatus';

import { isMobile } from '@js/utilities/device';

import {
  useUserContext,
  useVideoContext,
  isMarketingLoom,
} from '@js/common/video-player';

import { WorkflowsModalEntryFooter } from '@js/common/workflows/common/workflows-modal-entry-footer';

import { useHasAiWorkflowsForViewersModalAccess } from '@js/hooks/experiments/useExpIsEligibleForViewerWorkflows';

// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { CommentsWithProvider } from '@js/pages/share/comments';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { CommentsSkeleton } from '@js/pages/share/comments/CommentsSkeleton';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { useFetchComments } from '@js/pages/share/comments/common/hooks';

import { useOnTab, TAB_LIST } from '@js/pages/share/common';

import { SignupCta } from '@js/pages/signup-cta-right-panel';

import { getTotalCountOfCommentsAndChildrenComments } from '@js/utilities/comments';

const ActivityTab = (): JSX.Element => {
  const [commentsDisplayed, setCommentsDisplayed] = useState(false);
  const { video } = useVideoContext();

  const { id: videoId } = video;
  const { isLoggedUser } = useUserContext();
  const { loading: areCommentsLoading } = useFetchComments();

  const showSignupCta = !isLoggedUser && isMarketingLoom(videoId);

  const MemoizedComments = useMemo(
    () => <CommentsWithProvider onCommentDisplay={setCommentsDisplayed} />,

    // NOTE(tatiana)/TODO(viewx-2183-fix-missing-deps-issues-in): Not sure why we're using useEffect here to managed the tab states. Ideally refactor to remove useEffect, or at the very least, resolve missing dependency arrays properly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [commentsDisplayed]
  );

  if (areCommentsLoading) {
    return (
      <Spacer left={3} right={3}>
        <CommentsSkeleton />
      </Spacer>
    );
  }

  return (
    <Spacer left={3} right={3}>
      {showSignupCta ? <SignupCta /> : <div>{MemoizedComments}</div>}
    </Spacer>
  );
};

// 🚩 EXP_AI_WORKFLOWS_FOR_VIEWERS_PHASE_2
// Given that the activity tab entry point for the Workflows Modal
// (WorkflowsModalEntryFooter) is still an experiment, we are
// keeping ActivityTab as an a separate component.
const ActivityTabWithWorkflowsModalEntryFooter = (): JSX.Element => {
  const {
    video: { id: videoId },
  } = useVideoContext();

  const { comments } = useFetchComments();

  const { transcriptSuccessful } = useTranscriptStatus();

  const isMeetingRecording = useIsMeetingRecording(videoId);

  const activityTabConTainerRef = useRef<HTMLDivElement | null>(null);

  const hasAiWorkflowsForViewersModalAccess =
    useHasAiWorkflowsForViewersModalAccess();

  const { onTab } = useOnTab();

  const displayWorkflowsModalEntryFooter =
    // We do not want to show workflows on meeting recording videos
    !isMeetingRecording &&
    // Since workflow docs depend on transcript, don't show if transcript is not successful
    transcriptSuccessful &&
    hasAiWorkflowsForViewersModalAccess &&
    !isMobile;

  return (
    <div
      ref={activityTabConTainerRef}
      style={onTab === TAB_LIST.Activity ? {} : { display: 'none' }}
    >
      <ActivityTab />
      {displayWorkflowsModalEntryFooter ? (
        <WorkflowsModalEntryFooter
          parentWidth={activityTabConTainerRef.current?.clientWidth ?? 0}
          isExpanded={getTotalCountOfCommentsAndChildrenComments(comments) < 3}
        />
      ) : null}
    </div>
  );
};

export const ActivityTabWithErrorBondary = (): JSX.Element => {
  return (
    <SidebarTabErrorBoundary
      name="Activity Transcript Sidebar Activity"
      feature={Feature.ActivityTab}
      tabName="Activity"
    >
      <ActivityTabWithWorkflowsModalEntryFooter />
    </SidebarTabErrorBoundary>
  );
};
