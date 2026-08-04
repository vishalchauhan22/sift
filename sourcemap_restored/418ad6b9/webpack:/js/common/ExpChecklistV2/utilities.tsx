import { AllChecklistTasks, Task } from '@js/hooks/onboarding/checklist/types';
import React from 'react';

import {
  ADD_TEAMMATE,
  DOWNLOAD_RECORDER,
  FIRST_VIDEO_RECORDING,
  MEETING_RECORDING,
  SHARE_VIDEO,
} from '@loomhq/shared-utilities/constants/checklist';

import { DownloadCta } from './checklist-cta/download';
import { InviteCta } from './checklist-cta/invite';
import { MeetingRecordingCta } from './checklist-cta/meeting-recording';
import { RecordCta } from './checklist-cta/record';
import { ShareCta } from './checklist-cta/share';
import { ChecklistV2DisplayContext } from './types';

export function findNextActiveTask(tasks: Array<Task>): Task | null {
  const nextActiveTask = tasks.find(t => !t.isComplete);
  return nextActiveTask || null;
}

interface CreateTasksParams {
  checklistStatus: Record<AllChecklistTasks, boolean>;
  displayContext: ChecklistV2DisplayContext;
  hasInviteCapabilities: boolean;
  isExpIntegratedChecklist: boolean;
}

export const createTasks = ({
  checklistStatus,
  displayContext,
  hasInviteCapabilities,
  isExpIntegratedChecklist,
}: CreateTasksParams): Array<Task> => {
  const InviteTask: Array<Task> = hasInviteCapabilities
    ? [
        {
          id: ADD_TEAMMATE,
          title: 'Invite',
          cta: buttonSize => (
            <InviteCta
              displayContext={displayContext}
              buttonSize={buttonSize}
            />
          ),
          isComplete: checklistStatus[ADD_TEAMMATE],
          tooltipLabel: 'Invite a teammate to start collaborating',
        },
      ]
    : [];

  const MeetingRecordingTask: Array<Task> = !isExpIntegratedChecklist
    ? [
        {
          id: MEETING_RECORDING,
          title: 'Set up meeting recordings',
          cta: buttonSize => (
            <MeetingRecordingCta
              displayContext={displayContext}
              buttonSize={buttonSize}
            />
          ),
          isComplete: checklistStatus[MEETING_RECORDING],
          tooltipLabel: 'Set up meeting recordings',
          shouldShowNewPill: true,
        },
      ]
    : [];

  const tasks: Array<Task> = [
    {
      id: DOWNLOAD_RECORDER,
      title: 'Download',
      cta: buttonSize => (
        <DownloadCta displayContext={displayContext} buttonSize={buttonSize} />
      ),
      isComplete: checklistStatus[DOWNLOAD_RECORDER],
      tooltipLabel: 'Download a recorder to record anywhere, anytime',
    },
    {
      id: FIRST_VIDEO_RECORDING,
      title: 'Record',
      cta: buttonSize => (
        <RecordCta displayContext={displayContext} buttonSize={buttonSize} />
      ),
      isComplete: checklistStatus[FIRST_VIDEO_RECORDING],
      tooltipLabel: 'Record your first video to have better and fewer meetings',
    },
    {
      id: SHARE_VIDEO,
      title: 'Share',
      cta: _ => (
        <ShareCta
          hasRecordedFirstVideo={checklistStatus[FIRST_VIDEO_RECORDING]}
          displayContext={displayContext}
        />
      ),
      isComplete: checklistStatus[SHARE_VIDEO],
      tooltipLabel: 'Share your video to get your ideas out',
    },
    ...MeetingRecordingTask,
    ...InviteTask,
  ];

  tasks.sort((a, b) => {
    if (a.isComplete && !b.isComplete) {
      return -1;
    }
    if (!a.isComplete && b.isComplete) {
      return 1;
    }
    return 0;
  });

  return tasks;
};
