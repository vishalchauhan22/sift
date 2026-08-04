import { ApolloError } from '@apollo/client';

import { useGetUnseenNotificationsCountQuery } from './getUnseenNotificationsCount.generated';

export const useUnseenNotificationsCount = (): {
  count: number;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const { data, loading, error } = useGetUnseenNotificationsCountQuery();

  const count =
    data?.unseenNotificationsCount?.__typename === 'UnseenNotificationPayload'
      ? data.unseenNotificationsCount.count
      : 0;

  return { count, loading, error };
};
