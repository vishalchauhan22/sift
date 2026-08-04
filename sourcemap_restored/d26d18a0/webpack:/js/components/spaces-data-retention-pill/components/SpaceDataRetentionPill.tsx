import React from 'react';

import { Tooltip, Link, Text } from '@loomhq/lens';

import { useSpaceDataAgeLimitFormatted } from '../hooks/useSpaceDataAgeLimitFormatted';
import { DataRetentionPill } from './DataRetentionPill';
import { SpacesDataRetentionReadWrapper } from './SpacesDataRetentionReadWrapper';

const HELP_LINK = 'https://support.loom.com/hc/en-us/articles/4402954252049';

type ToolTipPlacement = 'bottomRight' | 'bottomCenter';

type SpaceDataRetentionPillProps = {
  spaceId: string;
  toolTipPlacement: ToolTipPlacement;
};

export const SpaceDataRetentionPill = ({
  spaceId,
  toolTipPlacement,
}: SpaceDataRetentionPillProps): JSX.Element | null => {
  const dataAgeLimitFormatted = useSpaceDataAgeLimitFormatted(spaceId);

  if (dataAgeLimitFormatted == null) {
    return null;
  }

  const tooltipContent =
    dataAgeLimitFormatted.compact === 'Forever' ? (
      `Videos shared to only this Space will never be deleted as per the Space's data retention policy`
    ) : (
      <Text>
        Videos shared to this Space will be permanently deleted once they are
        older than {dataAgeLimitFormatted.expanded}.{' '}
        <Link
          variant="neutral"
          target="_blank"
          href={HELP_LINK}
          onClick={e => {
            // Required to prevent click sharing the video to a space
            e.stopPropagation();
          }}
        >
          Learn more.
        </Link>
      </Text>
    );

  return (
    <SpacesDataRetentionReadWrapper>
      {/* TODO for Manda: Link inside tooltip contrast */}
      <Tooltip
        keepOpen
        content={tooltipContent}
        maxWidth={50}
        placement={toolTipPlacement}
      >
        <DataRetentionPill
          dataAgeLimitFormatted={dataAgeLimitFormatted.compact}
        />
      </Tooltip>
    </SpacesDataRetentionReadWrapper>
  );
};
