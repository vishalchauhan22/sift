import cn from 'classnames';
import { Task } from '@js/hooks/onboarding/checklist/types';
import fill from 'lodash/fill';
import React from 'react';

import { Align } from '@loomhq/lens';

import styles from '@js/common/ExpChecklistV2/ChecklistV2ProgressBar.module.css';

export enum TaskHeight {
  Small = 'small',
  Medium = 'medium',
}

const FIVE_SEGMENT_VALUES = [
  'linear-gradient(to right, #eeaa55, #eeaa55)',
  'linear-gradient(to right, #eeaa55, #df7a73)',
  'linear-gradient(to right, #dd7179, #c736b7)',
  'linear-gradient(to right, #c137b9, #9d41cc)',
  'linear-gradient(to right, #c137b9, #9d41cc)',
];

const FOUR_SEGMENT_VALUES = [
  'linear-gradient(to right, #eeaa55, #eeaa55)',
  'linear-gradient(to right, #eeaa55, #df7a73)',
  'linear-gradient(to right, #dd7179, #c736b7)',
  'linear-gradient(to right, #c137b9, #9d41cc)',
];

const THREE_SEGMENT_VALUES = [
  'linear-gradient(to right, #eeaa55, #f0863d)',
  'linear-gradient(to right, #f0863d, #d8009c)',
  'linear-gradient(to right, #d8009c, #9d41cc)',
];

function getSegmentColor(
  index: number,
  total: number,
  isExpIntegratedChecklist: boolean
): string {
  if (isExpIntegratedChecklist) {
    return 'var(--lns-color-teal)';
  }

  if (total === 3) {
    return THREE_SEGMENT_VALUES[index];
  } else if (total === 4) {
    return FOUR_SEGMENT_VALUES[index];
  }
  return FIVE_SEGMENT_VALUES[index];
}

export function ChecklistV2ProgressBar({
  tasks,
  taskHeight = TaskHeight.Medium,
  isExpIntegratedChecklist = false,
}: {
  tasks: Array<Task>;
  taskHeight?: TaskHeight;
  isExpIntegratedChecklist?: boolean;
}): JSX.Element {
  const numComplete = tasks.reduce(
    (prev: number, task: Task) => (task.isComplete ? prev + 1 : prev),
    0
  );

  const progressBars = new Array(tasks.length).fill(false);

  fill(progressBars, true, 0, numComplete);

  return (
    <Align>
      <div
        className={cn(
          styles.progressWrapper,
          'flex',
          'items:center',
          'width:full'
        )}
        aria-hidden="true"
      >
        <ol
          className={styles.taskList}
          style={{
            gridTemplateColumns: `repeat(${tasks.length}, 1fr)`,
          }}
        >
          {progressBars.map((isDone, index) => (
            <li key={`${index}${isDone}`}>
              <div
                style={{
                  background: isDone
                    ? getSegmentColor(
                        index,
                        tasks.length,
                        isExpIntegratedChecklist
                      )
                    : `var(--lns-color-grey3)`,
                }}
                className={cn(
                  styles.taskItem,
                  !isDone && styles.taskItemIncomplete,
                  taskHeight === TaskHeight.Medium
                    ? styles.taskItemMedium
                    : styles.taskItemSmall
                )}
              />
            </li>
          ))}
        </ol>
      </div>
    </Align>
  );
}
