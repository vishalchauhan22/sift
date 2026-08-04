import {
  ApproveVideoTaskMutationHookResult,
  useApproveVideoTaskMutation,
} from '@js/common/tasks/ApproveVideoTask.generated';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { VideoTask } from '@js/globalTypes.generated';

const ERROR_MESSAGE = 'Failed to accept task, please try again or refresh.';

export const useApproveTask = (
  task: VideoTask,
  setErrorMessage?: (message: string | undefined) => void
): ApproveVideoTaskMutationHookResult => {
  const result = useApproveVideoTaskMutation({
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
      if (data?.approveVideoTask?.__typename !== 'ApproveVideoTaskPayload') {
        logger.error(
          `Failed to approve task in onCompleted: ${data?.approveVideoTask?.message}`,
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
