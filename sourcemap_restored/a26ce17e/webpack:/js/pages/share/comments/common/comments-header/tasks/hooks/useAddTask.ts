import {
  CreateVideoTaskMutationHookResult,
  useCreateVideoTaskMutation,
} from '@js/common/tasks/CreateVideoTask.generated';
import {
  GetVideoTasksDocument,
  GetVideoTasksQuery,
} from '@js/common/tasks/GetVideoTasks.generated';
import cloneDeep from 'lodash/cloneDeep';

import * as logger from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';

import { MANUAL_TASK_GENERATED } from '../constants/events';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const ERROR_MESSAGE = 'Failed to create task, please try again or refresh.';

export const useAddTask = ({
  videoId,
  content,
  timestamp,
  setErrorMessage,
  password,
}: {
  videoId: string;
  content: string;
  timestamp: number;
  setErrorMessage?: (message: string | undefined) => void;
  password: string | null;
}): CreateVideoTaskMutationHookResult => {
  const result = useCreateVideoTaskMutation({
    variables: {
      videoId,
      content,
      timestamp,
    },
    onError: err => {
      logger.error(
        err,
        {
          videoId,
        },
        {
          feature: Feature.VideoTasks,
        }
      );

      setErrorMessage?.(ERROR_MESSAGE);
    },
    onCompleted: data => {
      if (data?.createVideoTask?.__typename !== 'CreateVideoTaskPayload') {
        logger.error(
          `Failed to create task in onCompleted: ${data?.createVideoTask?.message}`,
          {
            videoId,
          },
          {
            feature: Feature.VideoTasks,
          }
        );

        setErrorMessage?.(ERROR_MESSAGE);

        return;
      }

      const newTask = data.createVideoTask.task;

      analytics.track(
        MANUAL_TASK_GENERATED,
        withIdentifiers(
          MANUAL_TASK_GENERATED,
          AnalyticsEntityId.video(newTask?.video_id, 'video_id'),
          AnalyticsEntityId.commentPost(newTask?.id, 'string', 'task_id')
        )
      );
    },
    update: (cache, { data }) => {
      if (
        data?.createVideoTask?.__typename === 'CreateVideoTaskPayload' &&
        data.createVideoTask.task
      ) {
        const cachedData: GetVideoTasksQuery | null = cache.readQuery({
          query: GetVideoTasksDocument,
          variables: {
            videoId,
            password,
          },
        });

        // Required to clone because cached data is read-only
        const clonedCacheData = cloneDeep(cachedData);

        if (
          clonedCacheData?.getVideoTasks?.__typename ===
            'GetVideoTasksPayload' &&
          clonedCacheData.getVideoTasks.tasks
        ) {
          clonedCacheData.getVideoTasks.tasks = [
            ...clonedCacheData.getVideoTasks.tasks,
            data.createVideoTask.task,
          ];
          cache.writeQuery({
            query: GetVideoTasksDocument,
            data: clonedCacheData,
            variables: {
              videoId,
              password,
            },
          });
        }
      }
    },
  });

  return result;
};
