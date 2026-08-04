import { GET_STARTED_CHECKLIST_COMPLETED } from '@js/constants/events';

import cn from 'classnames';

import {
  ChecklistV2ProgressBar,
  TaskHeight,
} from '@js/common/ExpChecklistV2/ChecklistV2ProgressBar';
import { ChecklistV2Task } from '@js/common/ExpChecklistV2/ChecklistV2Task';
import { LoomLogoCheckAnimation } from '@js/common/ExpChecklistV2/LoomLogoCheckAnimation';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useCompleteTrigger } from '@js/hooks/useCompleteTrigger';
import React from 'react';

import {
  Align,
  Arrange,
  Container,
  IconButton,
  Text,
  Spacer,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SHOW_GET_STARTED_CHECKLIST } from '@loomhq/shared-utilities/constants/triggers';
import * as analytics from '@js/utilities/analytics';

import { ChecklistV2DisplayContext } from '../ExpChecklistV2/types';
import styles from './ChecklistV3.module.css';

import { AllChecklistTasks, Task } from '@js/hooks/onboarding/checklist/types';
import { useExpIntegratedChecklistWithUseCases } from '@js/common/ExpChecklistV4/useExpIntegratedChecklistWithUseCases';
interface ChecklistV3Params {
  currentTaskId: AllChecklistTasks | null;
  tasks: Array<Task>;
  displayContext?: ChecklistV2DisplayContext;
  openTask: (taskId: AllChecklistTasks | null) => void;
  openTaskId: AllChecklistTasks | null;
  closeChecklist: () => void;
}

function MiniChecklistV3({
  tasks,
  closeChecklist,
  openTask,
  openTaskId,
  currentTaskId,
  isExpIntegratedChecklist,
}: {
  tasks: Array<Task>;
  closeChecklist: () => void;
  openTask: (taskId: AllChecklistTasks | null) => void;
  openTaskId: AllChecklistTasks | null;
  currentTaskId: AllChecklistTasks | null;
  isExpIntegratedChecklist: boolean;
}): JSX.Element {
  return (
    <Container bottom="small" overflow="hidden" radius="large" zIndex="1">
      <Container
        padding="large"
        paddingTop="large"
        backgroundColor={'background'}
      >
        <Arrange alignItems="center" justifyContent={'space-around'}>
          <Text color="body" size={'body-lg'} fontWeight="bold">
            Get Started
          </Text>
          <div className={styles.collapseButton}>
            <IconButton
              data-testid="minimize-checklist-button"
              altText="Minimize checklist"
              size="medium"
              icon={<SvgChevronDown />}
              onClick={() => closeChecklist()}
            />
          </div>
        </Arrange>
        <Align>
          <Spacer top={'medium'} />
          <ChecklistV2ProgressBar
            tasks={tasks}
            taskHeight={TaskHeight.Small}
            isExpIntegratedChecklist={isExpIntegratedChecklist}
          />
        </Align>
      </Container>
      <Container
        paddingTop={'small'}
        paddingBottom="medium"
        backgroundColor="background"
        position="relative"
      >
        <ul>
          {tasks.map(task => (
            <li className="block" key={task.id}>
              <ChecklistV2Task
                task={task}
                title={task.title}
                isCurrent={currentTaskId === task.id}
                isComplete={task.isComplete}
                isOpen={task.id === openTaskId}
                onOpen={() => openTask(task.id)}
                onClose={() => openTask(null)}
                showCompletionAnimation={false}
                displayContext={ChecklistV2DisplayContext.Compact}
              >
                {task.cta?.('small') || null}
              </ChecklistV2Task>
            </li>
          ))}
        </ul>
      </Container>
    </Container>
  );
}

export function ChecklistV3({
  currentTaskId,
  tasks,
  displayContext = ChecklistV2DisplayContext.Full,
  openTask,
  openTaskId,
  closeChecklist,
}: ChecklistV3Params): JSX.Element | null {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { isExpIntegratedChecklistWithUseCases } =
    useExpIntegratedChecklistWithUseCases();

  const completeTrigger = useCompleteTrigger();

  if (currentTaskId) {
    if (displayContext === ChecklistV2DisplayContext.Compact) {
      return (
        <MiniChecklistV3
          tasks={tasks}
          closeChecklist={closeChecklist}
          openTask={openTask}
          openTaskId={openTaskId}
          currentTaskId={currentTaskId}
          isExpIntegratedChecklist={isExpIntegratedChecklistWithUseCases}
        />
      );
    }

    return (
      <Container padding={4}>
        <ul>
          {tasks.map(task => (
            <li className="block" key={task.id}>
              <Container
                className={cn('flex items:center', styles.taskItem)}
                onClick={() => openTask(task.id)}
              >
                <span
                  className={cn(styles.statusIcon, {
                    [styles.statusIconComplete]: task.isComplete,
                    [styles.statusIconCurrent]: currentTaskId === task.id,
                  })}
                />
                <Text
                  className={task.isComplete ? styles.completedTask : ''}
                  color={openTaskId === task.id ? 'body' : 'bodyDimmed'}
                  fontWeight={openTaskId === task.id ? 'bold' : 'book'}
                >
                  {task.title}
                </Text>
              </Container>
            </li>
          ))}
        </ul>
      </Container>
    );
  } else if (displayContext !== ChecklistV2DisplayContext.Full) {
    return (
      <Container bottom="small" overflow="hidden" radius="large" zIndex="1">
        <Container
          paddingTop="large"
          paddingBottom="xlarge"
          backgroundColor="background"
          position="relative"
        >
          <div className={styles.allComplete}>
            <Align alignment="center">
              <Arrange
                alignItems="center"
                justifyContent="center"
                gap="large"
                autoFlow="row"
              >
                <LoomLogoCheckAnimation
                  callback={() => {
                    completeTrigger(SHOW_GET_STARTED_CHECKLIST);
                    analytics.track(GET_STARTED_CHECKLIST_COMPLETED, {
                      displayContext,
                    });
                  }}
                  timeout={5000}
                />
                <Arrange autoFlow="row">
                  <Text size="body-md" fontWeight="bold" alignment="center">
                    Congrats!
                  </Text>
                  <Text size="body-md" fontWeight="bold" alignment="center">
                    {"You're becoming a pro"}
                  </Text>
                </Arrange>
              </Arrange>
            </Align>
          </div>
        </Container>
      </Container>
    );
  }

  return null;
}
