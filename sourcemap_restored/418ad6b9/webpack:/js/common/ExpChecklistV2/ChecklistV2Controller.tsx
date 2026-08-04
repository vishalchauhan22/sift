import {
  GET_STARTED_CHECKLIST_EXPANDED,
  GET_STARTED_CHECKLIST_MINIMIZED,
  GET_STARTED_CHECKLIST_SHOWN,
} from '@js/constants/events';

import {
  ChecklistV2ControllerProps,
  ChecklistV2DisplayContext,
} from '@js/common/ExpChecklistV2/types';
import {
  createTasks,
  findNextActiveTask,
} from '@js/common/ExpChecklistV2/utilities';

import { ChecklistV3 } from '@js/common/ExpChecklistV3/ChecklistV3';
import { useGetCheckListStatus } from '@js/hooks/getStartedChecklist';
import { useChecklistTaskStore } from '@js/hooks/onboarding/checklist/hooks';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import { useMount } from '@js/hooks/useMount';
import React, { useEffect } from 'react';
import * as analytics from '@js/utilities/analytics';
import { useGetStartedChecklistState } from '@js/utilities/localStorage/onboarding';
import * as logger from '@js/utilities/loggerx';

import { Container, Icon, Text } from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';

import { Team } from '@loomhq/shared-utilities/constants/product';

import styles from './ChecklistV2Controller.module.css';
import { MiniChecklist } from './MiniChecklist';

import { AllChecklistTasks, Task } from '@js/hooks/onboarding/checklist/types';
import { useExpIntegratedChecklistWithUseCases } from '@js/common/ExpChecklistV4/useExpIntegratedChecklistWithUseCases';

enum ControllerStates {
  // Full page context
  FullPage = 'fullPage',
  // No matter if the sidebar is open or closed, if it's maximized, it's open and showing a checklist
  SidebarChecklistMaximized = 'sidebarMaximized',
  // If sidebar is open, but minimized, it's showing a minimized with a progress bar
  SidebarOpenMinimized = 'sidebarOpenMinimized',
  // If sidebar is closed and we're minimized, it shows just a minimized icon
  SidebarClosedMinimized = 'sidebarClosedMinimized',
}

function getContainerStyles(
  controllerState: ControllerStates,
  isExpIntegratedChecklistWithUseCases: boolean
): {
  borderColor?: 'primary';
  shadow?: 'small';
  marginBottom?: '8px';
  borderSide?: 'all';
  borderWidth?: '1px';
  width?: string;
  height?: string;
  position?: 'sticky';
  radius?: 'large' | 'full';
} {
  if (controllerState === ControllerStates.FullPage) {
    return {};
  }

  const baseStyles = {
    borderColor: 'primary',
    borderSide: 'all',
    borderWidth: '1px',
    marginBottom: '8px',
    position: 'sticky',
    shadow: 'small',
  } as const;

  if (controllerState === ControllerStates.SidebarClosedMinimized) {
    return {
      ...baseStyles,
      height: '2.75rem',
      radius: 'full',
      width: '2.75rem',
    };
  }

  let width = '17.5rem';
  if (
    isExpIntegratedChecklistWithUseCases &&
    controllerState === ControllerStates.SidebarOpenMinimized
  ) {
    width = '14rem';
  }

  return {
    ...baseStyles,
    radius: 'large',
    width,
  };
}

const getControllerState = (
  inSidebar: boolean,
  isCollapsed: boolean,
  checklistIsMinimized: boolean
): ControllerStates => {
  let controllerState: ControllerStates;

  if (!inSidebar) {
    // If in full page, always show checklist
    controllerState = ControllerStates.FullPage;
  } else {
    // maximized state is always the same, the small checklist
    if (!checklistIsMinimized) {
      controllerState = ControllerStates.SidebarChecklistMaximized;
    } else {
      // if we are in a large sidebar we have the mini checklist, or the icon if collapsed
      controllerState = isCollapsed
        ? ControllerStates.SidebarClosedMinimized
        : ControllerStates.SidebarOpenMinimized;
    }
  }

  return controllerState;
};

const getDisplayContext = (
  controllerState: ControllerStates
): ChecklistV2DisplayContext => {
  switch (controllerState) {
    case ControllerStates.FullPage:
      return ChecklistV2DisplayContext.Full;
    case ControllerStates.SidebarChecklistMaximized:
      return ChecklistV2DisplayContext.Compact;
    case ControllerStates.SidebarOpenMinimized:
      return ChecklistV2DisplayContext.Collapsed;
    case ControllerStates.SidebarClosedMinimized:
      return ChecklistV2DisplayContext.Collapsed;
    default:
      return ChecklistV2DisplayContext.Collapsed;
  }
};

export const ChecklistV2Controller = ({
  inSidebar = false,
  isCollapsed = false,
}: ChecklistV2ControllerProps): JSX.Element => {
  const checklistStatus = useGetCheckListStatus();
  const { showInviteButton } = useInvitationCapabilities();
  const { isExpIntegratedChecklistWithUseCases } =
    useExpIntegratedChecklistWithUseCases();

  const [checklistIsMinimized, minimizeChecklist] =
    useGetStartedChecklistState();

  const controllerState = getControllerState(
    inSidebar,
    isCollapsed,
    checklistIsMinimized
  );

  const displayContext = getDisplayContext(controllerState);

  const tasks = createTasks({
    checklistStatus,
    displayContext,
    isExpIntegratedChecklist: isExpIntegratedChecklistWithUseCases,
    hasInviteCapabilities: showInviteButton,
  });

  const { openTask, setOpenTask } = useChecklistTaskStore();

  const currentTaskId: AllChecklistTasks | null =
    findNextActiveTask(tasks)?.id || null;

  useEffect(() => {
    setOpenTask(currentTaskId);
  }, [currentTaskId, setOpenTask]);

  const openChecklist = () => {
    analytics.track(GET_STARTED_CHECKLIST_EXPANDED);
    minimizeChecklist(false);
  };

  const closeChecklist = () => {
    analytics.track(GET_STARTED_CHECKLIST_MINIMIZED);
    minimizeChecklist(true);
  };

  useMount(() => {
    analytics.track(GET_STARTED_CHECKLIST_SHOWN, {
      displayContext,
    });
  });

  let checklistToShow: JSX.Element | null = null;

  switch (controllerState) {
    case ControllerStates.FullPage:
    case ControllerStates.SidebarChecklistMaximized:
      checklistToShow = (
        <ChecklistV3
          closeChecklist={closeChecklist}
          currentTaskId={currentTaskId}
          openTaskId={openTask}
          openTask={id => setOpenTask(id)}
          tasks={tasks}
          displayContext={
            controllerState === ControllerStates.FullPage
              ? ChecklistV2DisplayContext.Full
              : ChecklistV2DisplayContext.Compact
          }
        />
      );
      break;
    case ControllerStates.SidebarOpenMinimized:
      checklistToShow = (
        <MiniChecklist
          isExpIntegratedChecklist={isExpIntegratedChecklistWithUseCases}
          isOpen={!checklistIsMinimized}
          onClick={openChecklist}
          tasks={tasks}
        />
      );
      break;
    case ControllerStates.SidebarClosedMinimized:
      checklistToShow = (
        <Container
          backgroundColor="blurpleLight"
          radius="full"
          height={'100%'}
          onClick={openChecklist}
        >
          <div className={styles.checkmark}>
            <Icon icon={<SvgCheckCircle />} color="primary" size={3} />
            <span className={styles.tasksRemainingPill}>
              <Text size="body-sm" fontWeight="bold" color="white">
                {tasks.reduce(
                  (prev: number, task: Task) =>
                    !task.isComplete ? prev + 1 : prev,
                  0
                )}
              </Text>
            </span>
          </div>
        </Container>
      );
      break;
    default:
      logger.error(
        new Error('Invalid controller state'),
        { message: 'Error in ChecklistV2 Controller' },
        {
          team: Team.Activation,
        }
      );
  }

  return (
    <Container
      {...getContainerStyles(
        controllerState,
        isExpIntegratedChecklistWithUseCases
      )}
    >
      {checklistToShow}
    </Container>
  );
};
