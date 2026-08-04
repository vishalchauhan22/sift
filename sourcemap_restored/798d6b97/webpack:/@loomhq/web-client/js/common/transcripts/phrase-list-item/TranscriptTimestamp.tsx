import React from 'react';
import { Text } from '@loomhq/lens';
import { formatTimeStamp } from '@js/utilities/transcriptList';

type TranscriptTimestampProps = {
  timestamp: number;
  showPrimary?: boolean;
};

export const TranscriptTimestamp: React.FC<TranscriptTimestampProps> = ({
  timestamp,
  showPrimary,
}) => {
  return (
    <Text
      size="body-sm"
      color={showPrimary ? 'primary' : 'body'}
      fontSetting="tnum"
    >
      {formatTimeStamp(timestamp, timestamp)}
    </Text>
  );
};
