import React from 'react';

import { Tooltip } from '@loomhq/lens';

import { timeUtils } from '@loomhq/shared-utilities';
import { SPACES_DATA_RETENTION_TYPES } from '@loomhq/shared-utilities/constants/dataRetention';
import { VideoCardSpace } from '@js/components/video-card/types';

import { formatDataAgeLimit } from '../helpers/formatDataAgeLimit';
import { DataRetentionPill } from './DataRetentionPill';
import { SpacesDataRetentionReadWrapper } from './SpacesDataRetentionReadWrapper';
const { secondsAgo } = timeUtils;

type VideoCardDataRetentionPillProps = {
  createdAt: Date;
  spaces?: VideoCardSpace[];
};

const calculateDataLimitForReduction = (dataAgeLimit: number | null) => {
  if (dataAgeLimit === -1) {
    return Number.POSITIVE_INFINITY;
  }

  return dataAgeLimit;
};

const reduceSpacesToLowestDataAgeLimit = (
  prev: VideoCardSpace,
  curr: VideoCardSpace
) => {
  const prevDataAgeLimit = calculateDataLimitForReduction(
    prev.data_age_limit_in_seconds
  );

  const currDataAgeLimit = calculateDataLimitForReduction(
    curr.data_age_limit_in_seconds
  );

  // If either data-retention policies are null, we want to fully ignore them for the reduction
  if (prevDataAgeLimit === null) {
    return curr;
  } else if (currDataAgeLimit === null) {
    return prev;
  }

  return prevDataAgeLimit < currDataAgeLimit ? prev : curr;
};

const calculateNumberOfSecondsToShowOnPill = (
  dataAgeLimitInSeconds: number,
  createdAt: Date
) => {
  if (dataAgeLimitInSeconds === -1) {
    return -1;
  }

  // If number is negative: return 0s as video is overdue to be deleted
  return Math.max(dataAgeLimitInSeconds - secondsAgo(createdAt), 0);
};

export const VideoCardDataRetentionPill = ({
  createdAt,
  spaces,
}: VideoCardDataRetentionPillProps): JSX.Element | null => {
  // 1. Get the space with the strictest data-retention policy out of all spaces the video is shared to
  const mostStrictSpace =
    spaces && spaces.length > 0
      ? spaces.reduce(reduceSpacesToLowestDataAgeLimit)
      : null;

  // 2. If no shared space has a data-retention policy or any data is missing -> return early
  if (mostStrictSpace?.data_age_limit_in_seconds == null || createdAt == null) {
    return null;
  }

  // 3. Get the number of seconds left before video must be deleted (secondsDefinedInPolicy - secondsSinceCreation)
  // !Exception: returns -1 if strictest policy is set as -1 (video must stay forever)
  const numberOfSecondsToShowOnPill = calculateNumberOfSecondsToShowOnPill(
    mostStrictSpace.data_age_limit_in_seconds,
    createdAt
  );
  const dataAgeLimitFormatted = formatDataAgeLimit(numberOfSecondsToShowOnPill);

  const tooltipContent =
    dataAgeLimitFormatted.type === SPACES_DATA_RETENTION_TYPES.INFINITE
      ? `This video is shared to a Space with a data retention policy of Forever.`
      : `This video is shared to a Space with a data retention policy and will be deleted in ${dataAgeLimitFormatted.expanded}. If you would like to preserve this video, unshare it from ${mostStrictSpace.name}.`;

  return (
    <SpacesDataRetentionReadWrapper>
      <Tooltip
        content={tooltipContent}
        maxWidth={60}
        placement="bottomCenter"
        keepOpen
      >
        <DataRetentionPill
          dataAgeLimitFormatted={dataAgeLimitFormatted.compact}
        />
      </Tooltip>
    </SpacesDataRetentionReadWrapper>
  );
};
