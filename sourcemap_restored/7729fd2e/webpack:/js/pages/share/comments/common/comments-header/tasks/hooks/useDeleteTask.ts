import {
  DeleteVideoTaskMutationHookResult,
  useDeleteVideoTaskMutation,
} from '@js/common/tasks/DeleteVideoTask.generated';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { VideoTask } from '@js/globalTypes.generated';

const ERROR_MESSAGE = 'Failed to delete task, please try again or refresh.';

export const useDeleteTask = (
  task: VideoTask,
  setErrorMessage: (message: string | undefined) => void
): DeleteVideoTaskMutationHookResult => {
  return useDeleteVideoTaskMutation({
    variables: {
      id: task.id,
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
      setErrorMessage(ERROR_MESSAGE);
    },
    onCompleted: data => {
      if (data?.deleteVideoTask?.__typename !== 'DeleteVideoTaskPayload') {
        logger.error(
          `Failed to delete task in onCompleted: ${data?.deleteVideoTask?.message}`,
          {
            taskId: task.id,
          },
          {
            feature: Feature.VideoTasks,
          }
        );

        setErrorMessage(ERROR_MESSAGE);

        return;
      }
    },
    update: (cache, { data }) => {
      if (
        data?.deleteVideoTask?.__typename === 'DeleteVideoTaskPayload' &&
        data.deleteVideoTask.success
      ) {
        const normalizedId = cache.identify({
          id: task.id,
          __typename: 'VideoTask',
        });

        cache.evict({ id: normalizedId });

        cache.gc();
      }
    },
  });
};
