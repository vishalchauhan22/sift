import { useGetUserWatchLaterListCountQuery } from '@js/common/GetUserWatchLaterListCount.generated';

import GetUserWatchLaterListCount from '@js/common//GetUserWatchLaterListCount.graphql';

export const useWatchLaterListUnwatchedVideosCount = (): number | null => {
  const { data } = useGetUserWatchLaterListCountQuery(
    GetUserWatchLaterListCount
  );

  return data?.result?.__typename === 'WatchLaterListVideoCount'
    ? data?.result?.unwatchedCount
    : null;
};
