import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { eoyTakeoverDataType } from './end-of-year-insights/EndOfYearInsightsHub';

const InsightsHubLoader = reactLazyRetry(
  () => import(/* webpackChunkName: "InsightsHub" */ './internal/InsightsHub')
);

export const AsyncInsightsHub = ({
  eoyTakeoverData,
}: {
  eoyTakeoverData: eoyTakeoverDataType | null;
}): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <InsightsHubLoader eoyTakeoverData={eoyTakeoverData} />
    </Suspense>
  );
};
