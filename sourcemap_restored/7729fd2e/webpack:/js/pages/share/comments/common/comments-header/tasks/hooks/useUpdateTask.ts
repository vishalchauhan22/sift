import {
  UpdateVideoTaskMutationHookResult,
  useUpdateVideoTaskMutation,
} from '@js/common/tasks/UpdateVideoTask.generated';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { VideoTask } from '@js/globalTypes.generated';

const ERROR_MESSAGE = 'Failed to update task, please try again or refresh.';

export const useUpdateTask = (
  task: VideoTask,
  setErrorMessage?: (message: string | undefined) => void
): UpdateVideoTaskMutationHookResult => {
  const result = useUpdateVideoTaskMutation({
    variables: {
      id: task.id,
      content: task.content || null,
      timestamp: task.time_stamp || null,
    },
    onError: err => {
      logger.error(
        err,
        {
          taskId: task.id,
        },
        {
          feature: Feature.VideoTasks,
        }
      );

      setErrorMessage?.(ERROR_MESSAGE);
    },
    onCompleted: data => {
      if (data?.updateVideoTask?.__typename !== 'UpdateVideoTaskPayload') {
        logger.error(
          `Failed to update task in onCompleted: ${data?.updateVideoTask?.message}`,
          {
            taskId: task.id,
          },
          {
            feature: Feature.VideoTasks,
          }
        );

        setErrorMessage?.(ERROR_MESSAGE);

        return;
      }
    },
  });

  return result;
};
