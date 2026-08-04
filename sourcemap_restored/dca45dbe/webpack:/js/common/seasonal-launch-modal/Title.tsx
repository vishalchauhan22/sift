import React from 'react';
import { Spacer } from '@loomhq/lens';

interface TitleProps {
  aboveSubtitleSlot?: React.ReactNode;
  belowSubtitleSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({
  aboveSubtitleSlot,
  belowSubtitleSlot,
  children,
}) => (
  <>
    {aboveSubtitleSlot ? <Spacer bottom={1}>{aboveSubtitleSlot}</Spacer> : null}

    {children}

    {belowSubtitleSlot ? belowSubtitleSlot : null}
  </>
);
