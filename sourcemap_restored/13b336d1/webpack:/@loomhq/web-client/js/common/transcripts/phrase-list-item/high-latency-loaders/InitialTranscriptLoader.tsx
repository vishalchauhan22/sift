import React from 'react';
import { Loader, Text, Split } from '@loomhq/lens';

interface InitialTranscriptLoaderProps {
  shouldRender: boolean;
}

export const InitialTranscriptLoader = ({
  shouldRender,
}: InitialTranscriptLoaderProps): JSX.Element | null => {
  if (!shouldRender) {
    return null;
  }

  return (
    <Split gap="small">
      <Loader size="small" color="bodyDimmed" />
      <Text color="bodyDimmed" size="small">
        Transcript updates every 30 seconds...
      </Text>
    </Split>
  );
};
