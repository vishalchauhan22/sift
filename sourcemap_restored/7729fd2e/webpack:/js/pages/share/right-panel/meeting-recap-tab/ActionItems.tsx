import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useAutoTasksAi } from '@js/common/intelligence';
import { useGetVideoTasksQuery } from '@js/common/tasks/GetVideoTasks.generated';
import { filterTasks } from '@js/common/tasks/filterTasks';
import { useVideoPasswordContext } from '@js/common/video-password';

import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';

import React, { useEffect } from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container, Split, Text, LogoLoader } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { IntelligenceStatusType, VideoTask } from '@js/globalTypes.generated';

import { ActionItem } from './ActionItem';

type ActionItemsProps = {
  videoId: string;
};

const ActionItemsWithoutFeatureWrapper = ({
  videoId,
}: ActionItemsProps): JSX.Element | null => {
  const { password } = useVideoPasswordContext();
  const { featureLoadedRef } = useFeatureWrapper();
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });
  const autoTasksAi = useAutoTasksAi({
    isOwnerAfterRecording,
  });

  const aiSuggestionsAvailableAfterRecording =
    isOwnerAfterRecording && autoTasksAi.status === IntelligenceStatusType.Auto;

  const pendingOrNoSuggestions =
    autoTasksAi.isWaiting && !aiSuggestionsAvailableAfterRecording;

  const { data, loading, error, refetch } = useGetVideoTasksQuery({
    variables: { videoId, password },
    skip: !isLoggedIn || pendingOrNoSuggestions,
  });

  // Ensure tasks are fetched when the component mounts due to meeting summary regeneration
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // refetch tasks when auto tasks are generated
    if (aiSuggestionsAvailableAfterRecording) {
      refetch();
    }
  }, [aiSuggestionsAvailableAfterRecording, refetch]);

  const { approvedTasks: tasks } = filterTasks(data);

  // loading state for waiting for AI responses, not for fetching/loading tasks
  if (autoTasksAi.isWaiting) {
    return (
      <div ref={featureLoadedRef}>
        <Container borderSide="all" marginBottom="medium" radius="xlarge">
          <Split>
            <LogoLoader
              animation="spin 2s infinite steps(43) alternate"
              brand="ai"
            />
            <Text color="bodyDimmed">
              Loom AI is generating action items...
            </Text>
          </Split>
        </Container>
      </div>
    );
  }

  if (loading) {
    return null;
  }

  if (error) {
    // TODO: handle error
    return null;
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div ref={featureLoadedRef}>
      <Container>
        <Container marginBottom="medium">
          <Text htmlTag="h3" variant="title">
            Action Items
          </Text>
        </Container>
        <Container marginBottom="large">
          {tasks.map((task: VideoTask, index) => {
            return <ActionItem key={`action-item-${index}`} task={task} />;
          })}
        </Container>
      </Container>
    </div>
  );
};

export const ActionItems = (props: ActionItemsProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.CalendarMeetings}
      errorType={ErrorBoundaryTypes.DEFAULT}
      additionalLoggingValues={{ version: 'tasks' }}
    >
      <ActionItemsWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
