import React from 'react';

import { VideoTask } from '@js/globalTypes.generated';

import { Task } from './Task';

interface TasksListProps {
  tasks: VideoTask[] | null;
  isSuggested?: boolean;
}

export const TasksList = ({
  tasks,
  isSuggested = false,
}: TasksListProps): JSX.Element => {
  const showTasks = tasks && tasks.length !== 0;

  return (
    <>
      {showTasks &&
        tasks.map((task: VideoTask, index) => (
          <Task
            key={`sidebar-video-task-${index}`}
            task={task}
            isSuggested={isSuggested}
          />
        ))}
    </>
  );
};
