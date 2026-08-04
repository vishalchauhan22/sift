/* eslint-disable @loomhq/loom/no-js-extension */
import { useCurrentUserSelector } from '@js/common/current-user';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import has from 'lodash/has';
import isPlainObject from 'lodash/isPlainObject';
import omit from 'lodash/omit';
import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export function useLocalWorkspaceState(key, defaultValue) {
  const userId = useCurrentUserSelector(user => user.id, null);
  const { selectedWorkspace } = useGetWorkspaceMemberships();
  const workspaceId = selectedWorkspace?.id;
  const id = `${userId}:${workspaceId}`;
  const [state, setState] = useLocalStorageState(key);

  let value = defaultValue;

  if (state && userId && workspaceId) {
    value = state[id];
  }

  const setValue = useCallback(
    value => {
      const prev = isPlainObject(state) ? state : {};

      setState({ ...prev, [id]: value });
    },
    [id, setState, state]
  );

  const removeValue = useCallback(() => {
    if (has(state, id)) {
      setState(omit(state, id));
    }
  }, [id, setState, state]);

  return [value, setValue, removeValue];
}
