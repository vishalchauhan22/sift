import React from 'react';

import { useViewportContext } from '../viewportContext';

export const Show = ({
  children,
  afterWidth,
  afterHeight,
  untilHeight,
  untilWidth,
}: {
  children: React.ReactNode;
  afterWidth?: number;
  untilWidth?: number;
  afterHeight?: number;
  untilHeight?: number;
}): JSX.Element | null => {
  const { width, height } = useViewportContext();

  if (afterWidth && afterWidth < width) {
    return <>{children}</>;
  }

  if (afterHeight && afterHeight < height) {
    return <>{children}</>;
  }

  if (untilWidth && untilWidth > width) {
    return <>{children}</>;
  }

  if (untilHeight && untilHeight > height) {
    return <>{children}</>;
  }

  return null;
};
