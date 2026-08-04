import React from 'react';
import { Loader, Split, Text } from '@loomhq/lens';

interface HighLatencyPhraseLoaderProps {
  shouldRender: boolean;
}

export const HighLatencyPhraseLoader = ({
  shouldRender,
}: HighLatencyPhraseLoaderProps): JSX.Element | null => {
  return shouldRender ? (
    <Split gap="small">
      <Loader size="small" color="bodyDimmed" />
      <Text color="bodyDimmed" size="small">
        Processing transcript...
      </Text>
    </Split>
  ) : null;
};
