import {
  useRespondToVideoTaskMutation,
  RespondToVideoTaskMutationHookResult,
} from '@js/common/tasks/RespondToVideoTask.generated';
import { VideoTaskFragmentFragmentDoc } from '@js/common/tasks/VideoTaskFragment.generated';
import cloneDeep from 'lodash/cloneDeep';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { ActivityResponse, VideoTask } from '@js/globalTypes.generated';

const ERROR_MESSAGE = 'Failed to respond to task, please try again or refresh.';

export const useRespondToTask = (
  task: VideoTask,
  setErrorMessage: (message: string | undefined) => void
): RespondToVideoTaskMutationHookResult => {
  return useRespondToVideoTaskMutation({
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
      if (
        data?.respondToVideoTask?.__typename !== 'RespondToVideoTaskPayload'
      ) {
        logger.error(
          `Failed to respond to task in onCompleted: ${data?.respondToVideoTask?.message}`,
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
        data?.respondToVideoTask?.__typename === 'RespondToVideoTaskPayload' &&
        data.respondToVideoTask.task
      ) {
        const normalizedId = cache.identify({
          id: task.id,
          __typename: 'VideoTask',
        });

        // TODO: remove this manual cache update after `useMaster` flag is removed (check PR for more info)

        const cachedTask: VideoTask | null = cache.readFragment({
          id: normalizedId,
          fragment: VideoTaskFragmentFragmentDoc,
          fragmentName: 'VideoTaskFragment',
        });

        // Cloning because the cache for this task is read-only
        let clonedTask = cloneDeep(cachedTask);

        if (clonedTask) {
          clonedTask = {
            ...clonedTask,
            responses: data.respondToVideoTask.task
              .responses as ActivityResponse[],
          };
          cache.writeFragment({
            id: normalizedId,
            fragment: VideoTaskFragmentFragmentDoc,
            fragmentName: 'VideoTaskFragment',
            data: {
              ...clonedTask,
            },
          });
        }
      }
    },
  });
};
