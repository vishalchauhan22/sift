import { useQueryNotificationsV2Query } from '@js/components/destination-notifications/queryNotifications.generated';
import EmptyState from '@js/components/empty-state';
import { SectionEmptyState } from '@js/components/empty-state/SectionEmptyState';
import { EmptyStateType } from '@js/components/empty-state/constants';
import { useSiteTitle } from '@js/hooks/useSiteTitle';
import React, { useCallback, useRef } from 'react';

import { NotificationClientType } from '@loomhq/shared-utilities/constants/notifications';
import { GetUnseenNotificationsCountDocument } from '@js/common/notifications/getUnseenNotificationsCount.generated';

import {
  NotificationQueryType,
  NotificationStatus,
} from '@js/globalTypes.generated';
import useInfiniteScroll from '@js/hooks/useInfiniteScroll';

import LoadingNotifications from './LoadingNotifications';
import { useUpdateAllNotificationStatusesMutation } from './UpdateAllNotificationStatuses.generated';
import { ALL_NOTIFICATIONS, NOTIFICATIONS_CONFIG } from './constants';
import NotificationsCard from './notification-card';

const NOTIFICATION_FETCH_LIMIT = 6;

const Notifications = ({
  queryType = NotificationQueryType.All,
  header,
}: {
  header: React.ReactNode;
  queryType?: NotificationQueryType;
}): JSX.Element => {
  const { type, libraryType, text } =
    NOTIFICATIONS_CONFIG.find(
      notification => notification.path === queryType
    ) || ALL_NOTIFICATIONS;

  useSiteTitle(`${text} | Notifications`);

  const notificationType = type as NotificationQueryType;

  const fetchMoreRef = useRef<HTMLDivElement>(null);

  const [updateAllNotificationStatuses] =
    useUpdateAllNotificationStatusesMutation({
      variables: { status: NotificationStatus.Seen },
      refetchQueries: [{ query: GetUnseenNotificationsCountDocument }],
    });

  const { data, loading, fetchMore, called } = useQueryNotificationsV2Query({
    variables: {
      first: NOTIFICATION_FETCH_LIMIT,
      cursor: null,
      notificationType,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    // Don't ignore partial results. Show notifications that succeed even if some errors are thrown.
    errorPolicy: 'all',
    onCompleted: data => {
      // Once you load the initial batch of notifications, mark
      // ALL notifications as now SEEN
      if (
        data?.response?.__typename === 'GetNotificationsPayload' &&
        data?.unseenNotificationsCount?.__typename ===
          'UnseenNotificationPayload' &&
        data.unseenNotificationsCount.count > 0
      ) {
        updateAllNotificationStatuses();
      }
    },
  });

  let endCursor: string | null | undefined;
  if (data?.response?.__typename === 'GetNotificationsPayload') {
    endCursor = data.response.notifications?.pageInfo?.endCursor;
  }

  const fetchMoreNotifications = useCallback(() => {
    if (!loading && endCursor && fetchMore) {
      fetchMore({
        variables: {
          first: NOTIFICATION_FETCH_LIMIT,
          cursor: endCursor,
          notificationType,
        },
      });
    }
  }, [notificationType, loading, endCursor, fetchMore]);

  useInfiniteScroll(fetchMoreRef, fetchMoreNotifications);

  // Show loading screen on initial render (notifications query hasn't been called at all yet),
  // or when loading the initial batch of notifications for a notification type (end cursor is null)
  if ((!called || loading) && (!data?.response || !endCursor)) {
    return (
      <>
        {header}
        <LoadingNotifications />
      </>
    );
  }

  const notifications =
    data?.response?.__typename === 'GetNotificationsPayload' &&
    data.response.notifications?.edges
      ? data.response.notifications.edges.map(edge => edge?.node)
      : [];

  if (!notifications.length) {
    if (
      data?.response?.__typename === 'GetNotificationsPayload' &&
      data.response.hasNotifications
    ) {
      return (
        <>
          {header}
          <SectionEmptyState libraryType={libraryType} />
        </>
      );
    }

    return <EmptyState type={EmptyStateType.NOTIFICATIONS} />;
  }

  return (
    <>
      {header}
      <ul>
        {notifications.map(notification => {
          if (
            !notification ||
            !notification?.id ||
            !notification?.status ||
            !notification?.notificationType
          ) {
            return null;
          }

          return (
            <li key={notification.id}>
              <NotificationsCard
                notification={{
                  ...notification,
                  notificationType:
                    notification.notificationType as unknown as NotificationClientType,
                  url: notification.url,
                }}
              />
            </li>
          );
        })}
      </ul>
      {data?.response?.__typename === 'GetNotificationsPayload' &&
        data.response.notifications?.pageInfo?.hasNextPage && (
          <div ref={fetchMoreRef}>{loading && <LoadingNotifications />}</div>
        )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Notifications;
