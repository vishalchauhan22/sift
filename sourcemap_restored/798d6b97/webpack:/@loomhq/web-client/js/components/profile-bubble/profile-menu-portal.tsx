import React from 'react';

import { createPortal } from 'react-dom';

import { eoyTakeoverDataType } from '../insights-hub/end-of-year-insights/EndOfYearInsightsHub';
import { BubbleMenu } from './profile-menu';

export const BubbleMenuPortal = ({
  eoyTakeoverData,
}: {
  eoyTakeoverData: eoyTakeoverDataType | null;
}): JSX.Element | null => {
  const domElement = document.getElementById('intercom-destination-avatar');

  if (!domElement) {
    return null;
  }

  return createPortal(
    <BubbleMenu eoyTakeoverData={eoyTakeoverData} />,
    domElement
  );
};
