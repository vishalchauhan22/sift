import { GetVideoTasksQuery } from '@js/common/tasks/GetVideoTasks.generated';

import { VideoTask } from '@js/globalTypes.generated';

export const filterTasks = (
  data: GetVideoTasksQuery | undefined
): { approvedTasks: VideoTask[]; suggestedTasks: VideoTask[] } => {
  // default state
  let approvedTasks = [] as VideoTask[];
  let suggestedTasks = [] as VideoTask[];

  if (data?.getVideoTasks?.__typename === 'GetVideoTasksPayload') {
    const list = data.getVideoTasks.tasks as VideoTask[];
    approvedTasks = list.filter((task: VideoTask) => task.approved_at !== null);
    suggestedTasks = list.filter(
      (task: VideoTask) => task.approved_at === null
    );
  }

  return {
    approvedTasks,
    suggestedTasks,
  };
};
