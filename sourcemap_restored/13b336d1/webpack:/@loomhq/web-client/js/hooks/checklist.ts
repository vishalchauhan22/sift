import { ApolloError } from '@apollo/client/errors';

import { useCurrentUserSelector } from '@js/common/current-user';

import { ChecklistItem } from '@js/globalTypes.generated';

import { useCompleteGettingStartedChecklistItemMutation } from './CompleteGettingStartedChecklistItem.generated';

export const useCompleteChecklistItem = (
  item: ChecklistItem
): {
  completeChecklistItem: () => Promise<void>;
  loading: boolean;
  error?: ApolloError;
} => {
  const checklist = useCurrentUserSelector(user => user.checklist, null);
  const [completeChecklistItem, { loading, error }] =
    useCompleteGettingStartedChecklistItemMutation();

  const completeItem = async () => {
    if (checklist && checklist[item]) {
      return;
    }

    await completeChecklistItem({
      variables: {
        checklistItem: item,
      },
    });
  };

  return {
    completeChecklistItem: completeItem,
    loading,
    error,
  };
};
