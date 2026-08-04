import React from 'react';

import { Icon, Pill } from '@loomhq/lens';
import { SvgTimer } from '@loomhq/lens/icons/timer';

type DataRetentionPillProps = {
  dataAgeLimitFormatted: string;
};

export const DataRetentionPill = ({
  dataAgeLimitFormatted,
}: DataRetentionPillProps): JSX.Element => {
  return (
    <Pill backgroundColor="highlight">
      <Icon icon={<SvgTimer />} size={2} />
      {dataAgeLimitFormatted}
    </Pill>
  );
};
