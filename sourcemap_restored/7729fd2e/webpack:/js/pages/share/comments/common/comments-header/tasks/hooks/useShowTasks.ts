import { useVideoContext } from '@js/common/video-player';

import { VideoTask } from '@js/globalTypes.generated';

const areTasksAvailable = (tasks: VideoTask[]): boolean => tasks.length > 0;

export const useShowTasks = ({
  approvedTasks,
  suggestedTasks,
}: {
  approvedTasks?: VideoTask[];
  suggestedTasks?: VideoTask[];
}): boolean => {
  const {
    video: { currentUserCanEdit = false },
  } = useVideoContext();

  if (suggestedTasks) {
    return currentUserCanEdit && areTasksAvailable(suggestedTasks);
  } else if (approvedTasks) {
    return currentUserCanEdit || areTasksAvailable(approvedTasks);
  }
  return false;
};
