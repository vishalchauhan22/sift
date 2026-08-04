import React from 'react';
import { Container, Arrange, Align, SplitSection, Split } from '@loomhq/lens';
import { TranscriptTimestamp as Timestamp } from '../TranscriptTimestamp';
import { HighLatencyPhraseLoader } from './HighLatencyPhraseLoader';

interface HighLatencyPhraseLoaderRowProps {
  currentRowTs: number;
  shouldRender: boolean;
}

export const HighLatencyPhraseLoaderRow = ({
  currentRowTs,
  shouldRender = false,
}: HighLatencyPhraseLoaderRowProps): JSX.Element | null => {
  return shouldRender ? (
    <Container
      padding="var(--lns-space-small)"
      paddingTop="var(--lns-space-xsmall)"
    >
      <Split data-testid="high-latency-phrase-loader-row" wrap="nowrap">
        <Container paddingTop="2px" paddingRight="medium" height="100%">
          <Arrange autoFlow="row" justifyContent="stretch" alignContent="start">
            <Align alignment="topLeft">
              {/* Timestamp needed for correct dynamic width of column */}
              <span style={{ visibility: 'hidden' }}>
                <Timestamp timestamp={currentRowTs} />
              </span>
            </Align>
          </Arrange>
        </Container>
        <SplitSection grow={1} width="100%">
          <HighLatencyPhraseLoader shouldRender={true} />
        </SplitSection>
      </Split>
    </Container>
  ) : null;
};
