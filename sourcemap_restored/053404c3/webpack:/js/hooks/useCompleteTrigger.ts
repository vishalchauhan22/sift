import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';

import { toMap } from '@js/common/triggers/collection/toMap';
import { useUpdateUserTriggerV2Mutation } from '@js/hooks/UpdateUserTriggerV2.generated';
import * as logger from '@js/utilities/loggerx';

import { useCallback } from 'react';

import { triggersUtils } from '@loomhq/shared-utilities';
import { Team } from '@loomhq/shared-utilities/constants/product';
import { ALL as ALL_TRIGGERS } from '@loomhq/shared-utilities/constants/triggers';

const { isTriggerComplete } = triggersUtils;

type TriggerName = (typeof ALL_TRIGGERS)[number];

export function useCompleteTrigger(): (triggerName: TriggerName) => void {
  const isUserLoggedIn = useIsCurrentUserLoggedIn();

  const userId = useCurrentUserSelector(user => user.id, 0);
  const rawTriggers = useCurrentUserSelector(user => user.triggers, []);
  const triggerMap = useCurrentUserSelector(user => toMap(user.triggers), {});

  const [updateUserTrigger] = useUpdateUserTriggerV2Mutation();

  return useCallback(
    (triggerName: TriggerName) => {
      // TODO: remove this check once all components that use this hook are converted to TS and we have type safety
      if (!ALL_TRIGGERS.includes(triggerName)) {
        logger.warning(new Error('invalid trigger name'), {
          cause: `tried to complete invalid trigger: ${triggerName as any}`,
        });

        return;
      }

      if (!isUserLoggedIn) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (isTriggerComplete(triggerMap, triggerName)) {
        // don't complete if already complete
        return;
      }

      return updateUserTrigger({
        variables: {
          triggers: {
            [triggerName]: {
              complete: true,
              show: false,
            },
          },
        },

        optimisticResponse: {
          __typename: 'Mutation',
          updateUserTriggerV2: {
            __typename: 'UpdateUserTriggerV2Payload',
            user: {
              __typename: 'RegularUser',
              id: userId?.toString(),
              triggers: [
                ...rawTriggers,
                {
                  __typename: 'CompletableTrigger',
                  complete: true,
                  name: triggerName,
                  show: false,
                },
              ],
            },
          },
        },

        onError: error => {
          logger.error(
            error,
            { message: 'Failed to update trigger', triggerName },
            {
              team: Team.Outreach,
            }
          );
        },
      });
    },
    [isUserLoggedIn, userId, rawTriggers, triggerMap, updateUserTrigger]
  );
}
