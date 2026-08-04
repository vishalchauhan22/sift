import keyBy from 'lodash/keyBy';

import { CompletableTrigger } from '@js/globalTypes.generated';

export const toMap = (
  triggers: Array<CompletableTrigger | null>
): Record<string, CompletableTrigger> => {
  return keyBy(
    triggers.filter(t => t !== null) as CompletableTrigger[],
    'name'
  );
};
