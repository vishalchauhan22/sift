import { GET_STARTED_CHECKLIST_IS_MINIMIZED } from '@js/constants/localStorage';

import { useStoredStateForUser } from './utils';

export const useGetStartedChecklistState = (): [
  boolean,
  (val: boolean) => void,
] => {
  return useStoredStateForUser(GET_STARTED_CHECKLIST_IS_MINIMIZED);
};
