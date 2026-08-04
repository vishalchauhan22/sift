import { useCurrentUserSelector } from '@js/common/current-user';
import { toMap } from '@js/common/triggers/collection/toMap';

import { triggersUtils } from '@loomhq/shared-utilities';
import { ALL as ALL_TRIGGERS } from '@loomhq/shared-utilities/constants/triggers';

const { shouldShowTrigger } = triggersUtils;

export type TriggerName = (typeof ALL_TRIGGERS)[number];

export function useShouldShowTrigger(triggerName: TriggerName): boolean {
  const triggerMap = useCurrentUserSelector(
    user => toMap(user.triggers ?? []),
    {}
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return shouldShowTrigger(triggerMap, triggerName);
}
