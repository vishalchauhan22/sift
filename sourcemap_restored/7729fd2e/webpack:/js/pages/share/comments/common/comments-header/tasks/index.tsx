import React, { useEffect, useState, useCallback } from 'react';

import { Container, Spacer, Text, LogoLoader } from '@loomhq/lens';
import { VIDEO_TASK_ID_QUERY_PARAM } from '@loomhq/shared-utilities/constants/mention';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useAutoTasksAi } from '@js/common/intelligence';
import { useGetVideoTasksQuery } from '@js/common/tasks/GetVideoTasks.generated';
import { filterTasks } from '@js/common/tasks/filterTasks';
import { useVideoPasswordContext } from '@js/common/video-password';
import { UiEvents, usePlayer } from '@js/common/video-player';
import { LARGE_DESKTOP_MIN_WIDTH } from '@js/constants/breakpoints';
import { IntelligenceStatusType } from '@js/globalTypes.generated';
import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import { useMatchMedia } from '@js/hooks/useMatchMedia';
import {
  useIsRightPanelOpen,
  useOpenRightPanelAndSwitchToTab,
  useOnTab,
  TAB_LIST,
} from '@js/pages/share/common';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';

import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';

import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { getParam, removeParam } from '@js/utilities/url';

import { CollapseContainer } from './components/CollapseContainer';
import { TasksHeader } from './components/TasksHeader';
import { TasksList } from './components/TasksList';
import { useShowTasks } from './hooks/useShowTasks';
import styles from './styles.module.less';

const SCROLL_DELAY_AFTER_PAGE_LOAD = 750;
const SCROLL_DELAY_FOR_EXPAND_ANIMATION = 350;
const SCROLL_DELAY_WHEN_RIGHT_PANEL_CLOSED = 500;
const HIGHLIGHT_TASK_DURATION = 1300;
const TRANSITION_DURATION = 200;
const EXTRA_OFFSET_PADDING = 8;

const getTasksHeaderTitleElem = (
  suggested,
  approvedTasksLength,
  suggestedTasksLength
) => {
  if (suggested) {
    return (
      <Text>{`${suggestedTasksLength} Suggested task${
        suggestedTasksLength !== 1 ? 's' : ''
      } for viewers`}</Text>
    );
  }

  return suggestedTasksLength ? (
    <Text size="body-lg">{`Review task${
      suggestedTasksLength !== 1 ? 's' : ''
    }`}</Text>
  ) : (
    <Text size="body-lg">{`${approvedTasksLength} Task${
      approvedTasksLength !== 1 ? 's' : ''
    }`}</Text>
  );
};

type TasksProps = {
  videoId: string;
  setIsAddingNewTask: (isAddingNewTask: boolean) => void;
  taskInputRef: React.RefObject<HTMLTextAreaElement>;
};

const TasksWithoutFeatureWrapper = ({
  videoId,
  setIsAddingNewTask,
  taskInputRef,
}: TasksProps): JSX.Element | null => {
  const { password } = useVideoPasswordContext();
  const player = usePlayer(videoId);
  const { featureLoadedRef } = useFeatureWrapper();

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId });

  const autoTasksAi = useAutoTasksAi({
    isOwnerAfterRecording,
  });

  const isRightPanelOpen = useIsRightPanelOpen();
  const openRightPanelAndSwitchToTab = useOpenRightPanelAndSwitchToTab();

  const { onTab } = useOnTab();

  const [suggestedIsCollapsed, setSuggestedIsCollapsed] = useState(false);
  const [allTasksCollapsed, setAllTasksCollapsed] = useState(false);

  const areTasksBelowVideo = useMatchMedia(
    `(max-width: ${LARGE_DESKTOP_MIN_WIDTH}px)`
  );

  const onActivityTab = onTab === TAB_LIST.Activity;

  const aiSuggestionsAvailableAfterRecording =
    isOwnerAfterRecording && autoTasksAi.status === IntelligenceStatusType.Auto;

  const pendingOrNoSuggestions =
    autoTasksAi.isWaiting && !aiSuggestionsAvailableAfterRecording;

  const isLoggedIn = useIsCurrentUserLoggedIn();

  const { data, loading, error, refetch } = useGetVideoTasksQuery({
    variables: { videoId, password },
    skip: !isLoggedIn || pendingOrNoSuggestions,
  });

  useEffect(() => {
    // refetch tasks when auto tasks are generated
    if (aiSuggestionsAvailableAfterRecording) {
      refetch();
    }
  }, [aiSuggestionsAvailableAfterRecording, refetch]);

  const { approvedTasks, suggestedTasks } = filterTasks(data);

  const displaySuggestedTasksSection = useShowTasks({
    suggestedTasks,
  });
  const displayApprovedTasksSection = useShowTasks({
    approvedTasks,
  });

  const addBottomSpacer =
    displaySuggestedTasksSection || displayApprovedTasksSection;

  const calculateScrollOffset = useCallback(() => {
    let height;

    if (areTasksBelowVideo) {
      const wrapper = document.getElementsByClassName(
        'rightPanelWrapper'
      )[0] as HTMLDivElement;

      const header = document.querySelector('header');

      if (!wrapper || !header) {
        return;
      }

      height = wrapper.offsetTop - header.offsetHeight - EXTRA_OFFSET_PADDING;
    } else {
      const sticky = document.getElementById('activity-input-header');
      const tabs = document.getElementById('right-panel-tabs');

      if (!sticky || !tabs) {
        return;
      }

      height = sticky.offsetHeight + tabs.offsetHeight + EXTRA_OFFSET_PADDING;
    }

    return height || 0;
  }, [areTasksBelowVideo]);

  const scrollToAndHighlightTask = useCallback(
    (taskId: string) => {
      /* SCROLL TO TASK */
      const elem = document.getElementById(`sidebar-video-task-${taskId}`);
      const scrollable = document.getElementsByClassName(
        'activitySidebarContainer'
      )[0];

      if (!elem || !scrollable) {
        return;
      }

      // calculate the offset
      const offset = calculateScrollOffset();

      // scroll to the task
      areTasksBelowVideo
        ? window.scrollTo({ top: elem.offsetTop + offset, behavior: 'smooth' })
        : scrollable.scrollTo({
            top: elem.offsetTop - offset,
            behavior: 'smooth',
          });

      /* HIGHLIGHT TASK */
      // the original bg color of the task might be backgroundSecondary,
      // we need to reset back to it after the timeout
      const originalColor = elem.style.backgroundColor;

      elem.style.transition = '';
      elem.style.backgroundColor = 'var(--lns-color-highlight)';

      setTimeout(() => {
        elem.style.transition = `background-color ${TRANSITION_DURATION}ms ease-out`;
        elem.style.backgroundColor = originalColor || '';
      }, HIGHLIGHT_TASK_DURATION);
    },
    [areTasksBelowVideo, calculateScrollOffset]
  );

  // Listens for taskClicked UI events, scrolls to and highlights the task
  useEffect(() => {
    if (!player) {
      return;
    }

    const handleEvent = selectedTaskId => {
      let scrollDelay = 0;

      // if the right panel is closed, we need certain delay before scroll to the task
      if (!isRightPanelOpen) {
        scrollDelay = SCROLL_DELAY_WHEN_RIGHT_PANEL_CLOSED;
      }

      // similarly, when the approved tasks list is collapsed or we're on a different tab,
      // we also need delay. Note that it's possible that the right panel is closed +
      // list is collapsed / on a different tab, so we need to add them up
      if (allTasksCollapsed || !onActivityTab) {
        scrollDelay += SCROLL_DELAY_FOR_EXPAND_ANIMATION;
      }

      openRightPanelAndSwitchToTab();
      setAllTasksCollapsed(false);
      setTimeout(() => scrollToAndHighlightTask(selectedTaskId), scrollDelay);
    };

    player?.on([UiEvents.taskClicked], handleEvent);

    return () => {
      player?.off([UiEvents.taskClicked], handleEvent);
    };
  }, [
    allTasksCollapsed,
    isRightPanelOpen,
    onActivityTab,
    openRightPanelAndSwitchToTab,
    player,
    scrollToAndHighlightTask,
  ]);

  // checks if highlightTask param is in url and highlights the task after tasks load
  useEffect(() => {
    const taskIdToHighlight = getParam(VIDEO_TASK_ID_QUERY_PARAM);

    const removeUrlParams = () => {
      removeParam(window)(VIDEO_TASK_ID_QUERY_PARAM);
      removeParam(window)('t');
    };

    if (taskIdToHighlight && approvedTasks) {
      setTimeout(() => {
        scrollToAndHighlightTask(taskIdToHighlight);
        removeUrlParams();
      }, SCROLL_DELAY_AFTER_PAGE_LOAD);
    }
  }, [approvedTasks, scrollToAndHighlightTask]);

  // loading state for waiting for AI responses, not for fetching/loading tasks
  if (autoTasksAi.isWaiting) {
    return (
      <div ref={featureLoadedRef}>
        <Spacer bottom={2.5}>
          <Container paddingBottom="medium" borderSide="bottom">
            <Container
              borderSide="all"
              radius="xlarge"
              className={styles.taskLoader}
            >
              <LogoLoader
                animation="spin 2s infinite steps(43) alternate"
                brand="ai"
              />

              <Text color="bodyDimmed">Loading task suggestions…</Text>
            </Container>
          </Container>
        </Spacer>
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

  return (
    <div ref={featureLoadedRef}>
      <Container
        borderSide={displayApprovedTasksSection ? 'bottom' : undefined}
        paddingBottom={allTasksCollapsed ? 2.5 : ''}
      >
        {displayApprovedTasksSection && (
          <TasksHeader
            numOfTasks={approvedTasks ? approvedTasks.length : 0}
            titleElem={getTasksHeaderTitleElem(
              false,
              approvedTasks?.length,
              suggestedTasks?.length
            )}
            isCollapsed={allTasksCollapsed}
            setIsCollapsed={setAllTasksCollapsed}
            setIsAddingNewTask={setIsAddingNewTask}
            taskInputRef={taskInputRef}
          />
        )}

        <CollapseContainer isCollapsed={allTasksCollapsed}>
          <>
            {displaySuggestedTasksSection && (
              <Container
                className={styles.suggestedTasksContainer}
                paddingX="medium"
                paddingY="small"
                radius="large"
                marginTop="small"
              >
                <TasksHeader
                  numOfTasks={suggestedTasks ? suggestedTasks.length : 0}
                  titleElem={getTasksHeaderTitleElem(
                    true,
                    approvedTasks?.length,
                    suggestedTasks?.length
                  )}
                  isCollapsed={suggestedIsCollapsed}
                  setIsCollapsed={setSuggestedIsCollapsed}
                  suggested
                />

                <CollapseContainer isCollapsed={suggestedIsCollapsed}>
                  <TasksList tasks={suggestedTasks} isSuggested />
                </CollapseContainer>
              </Container>
            )}

            {displayApprovedTasksSection ? (
              <Container paddingBottom={2.5}>
                <TasksList tasks={approvedTasks} />
              </Container>
            ) : null}
          </>
        </CollapseContainer>
      </Container>
      {addBottomSpacer ? <Spacer bottom={2.5} /> : null}
    </div>
  );
};

export const Tasks = (props: TasksProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.VideoPackaging}
      errorType={ErrorBoundaryTypes.DEFAULT}
      additionalLoggingValues={{ version: 'tasks' }}
    >
      <TasksWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
