import React from 'react';
import { EllipsesLoader } from '@loomhq/lens';

interface SpeakingDotsProps {
  shouldRender: boolean;
}

export const SpeakingDots = ({
  shouldRender,
}: SpeakingDotsProps): JSX.Element | null => {
  return shouldRender ? (
    <EllipsesLoader size="small" color="bodyDimmed" />
  ) : null;
};
