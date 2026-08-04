import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useUpdateUserPropertyMutation } from '@js/hooks/user/UpdateUserProperty.generated';
import { useCallback } from 'react';

import { incrementMetric } from '@js/utilities/metrics';
import { useApolloClient } from '@apollo/client';
import { useFtuxStore } from '@js/common/ftux/ftuxStore';
import { AvailableFtux } from '@js/globalTypes.generated';

import { setLocalStorageKey } from '@js/utilities/localStorage';
import { getPathnameForMetrics } from '@js/utilities/url';

export const useFtuxIsVisible = (name: string): boolean => {
  const { visibleFtux } = useFtuxStore();

  return visibleFtux?.some(ftux => ftux.name === name);
};

export const useFtuxIsAvailable = (name: string): boolean => {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { availableFtuxAnonymous } = useFtuxStore();
  const availableFtuxFromServer = useCurrentUserSelector(
    user => user.availableFtux || null,
    null
  );
  const availableFtux = isLoggedIn
    ? availableFtuxFromServer
    : availableFtuxAnonymous;

  return availableFtux?.some(ftux => ftux.name === name) ?? false;
};

export const useOnDismissFtux = (): ((ftuxKey: string) => void) => {
  const { visibleFtux, removeVisibleFtux } = useFtuxStore();

  const client = useApolloClient();
  const [updateUserProperty] = useUpdateUserPropertyMutation();
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const handleCacheEviction = useCallback(
    (ftuxKey: string): void => {
      removeVisibleFtux({ name: ftuxKey } as AvailableFtux);

      const normalizedId = client.cache.identify({
        name: ftuxKey,
        __typename: 'AvailableFtux',
      });

      client.cache.evict({ id: normalizedId });
      client.cache.gc();
    },
    [client, removeVisibleFtux]
  );

  const onDismissFtux = useCallback(
    (ftuxKey: string): void => {
      if (!isLoggedIn) {
        // update local storage, because we don't have userProperties for anon users
        setLocalStorageKey(ftuxKey, { show: false });
        handleCacheEviction(ftuxKey);
      } else {
        updateUserProperty({
          variables: {
            name: ftuxKey,
            value: true,
          },
          refetchQueries: ['GetUserProperty'],
          onCompleted: () => {
            handleCacheEviction(ftuxKey);
          },
        });
      }

      const ftuxInVisible = visibleFtux?.find(
        (ftux: AvailableFtux) => ftux.name === ftuxKey
      );

      incrementMetric('ftux.dismissed', {
        name: ftuxKey,
        path: getPathnameForMetrics(),
        priority: ftuxInVisible?.priority,
        isLoggedIn,
      });
    },
    [visibleFtux, updateUserProperty, isLoggedIn, handleCacheEviction]
  );

  return onDismissFtux;
};
