import _debounce from 'lodash/debounce';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { getGraphQlClientInsights } from '../../../utilities/graphql';
import * as loggerx from '../../../utilities/loggerx';
import PlayIntervals from '../../../utilities/video-session/playIntervals.graphql';

interface WatchedIntervals {
  videoId: string;
  buckets: boolean[];
}

const DEBOUNCE_WAIT_MS = 900;
const DEBOUNCE_MAX_WAIT_MS = 1500;

type syncIntervalsParams = {
  watchedIntervals: WatchedIntervals;
  anonUserName: string;
};

async function syncIntervals({
  watchedIntervals,
  anonUserName,
}: syncIntervalsParams): Promise<void> {
  loggerx.addCrumb({
    message: 'sending intervals',
    context: { ...watchedIntervals },
  });

  if (watchedIntervals.buckets.length === 0) {
    loggerx.warning(
      'No intervals to send',
      { videoId: watchedIntervals.videoId },
      { feature: Feature.EngagementInsights }
    );

    return;
  }

  try {
    const { data } = await sendMutation(watchedIntervals, anonUserName);

    const payload = data?.updateVideoPlayInterval;

    if (payload?.message) {
      loggerx.error(
        payload.message,
        {},
        { feature: Feature.EngagementInsights }
      );
    }
  } catch (err) {
    if (err.networkError) {
      return;
    }

    loggerx.error(
      err,
      { intervals: watchedIntervals },
      { feature: Feature.EngagementInsights }
    );
  }
}

function sendMutation(watchedIntervals: WatchedIntervals, anonName: string) {
  const client = getGraphQlClientInsights();

  return client.mutate({
    mutation: PlayIntervals,
    variables: { watchedIntervals, anonName },
  });
}

type IntervalSync = (params: syncIntervalsParams) => Promise<void> | undefined;

// eslint-disable-next-line import/no-default-export
export default (): IntervalSync =>
  _debounce(syncIntervals, DEBOUNCE_WAIT_MS, {
    maxWait: DEBOUNCE_MAX_WAIT_MS,
  });
