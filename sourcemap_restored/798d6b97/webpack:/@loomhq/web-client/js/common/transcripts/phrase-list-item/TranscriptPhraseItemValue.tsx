import React from 'react';
import { Arrange, Split, Text } from '@loomhq/lens';
import { Phrase } from '@loomhq/shared-utilities';
import { SpeakingDots } from './SpeakingDots';
import {
  ItxPartialLatency as TranscriptLatency,
  ItxPartialLatencyEnum as TranscriptLatencyEnum,
} from '@loomhq/shared-utilities/types/transcription';

type SearchHighlighting = {
  displayValue: React.ReactNode;
  phraseRef: React.RefObject<HTMLDivElement>;
  isActiveSearchPhrase: boolean;
};

type TranscriptPhraseItemValueProps = {
  phrase: Phrase;
  showSpeakerName: boolean;
  isLastPhrase?: boolean;
  searchHighlighting: SearchHighlighting;
  latencyMode?: TranscriptLatency;
};

export const TranscriptPhraseItemValue: React.FC<
  TranscriptPhraseItemValueProps
> = ({
  phrase,
  showSpeakerName,
  isLastPhrase = false,
  searchHighlighting,
  latencyMode = TranscriptLatencyEnum.Standard,
}) => {
  const { speakerName } = phrase;
  const { displayValue, phraseRef } = searchHighlighting;

  const isV2Latency = latencyMode === TranscriptLatencyEnum.V2;

  return (
    <div ref={phraseRef}>
      <Arrange gap="medium" autoFlow="row">
        {showSpeakerName ? <Text fontWeight="bold">{speakerName}</Text> : null}
        <Split gap="small">
          <Text color={isLastPhrase ? 'bodyDimmed' : undefined}>
            {displayValue}
          </Text>{' '}
          <SpeakingDots shouldRender={isLastPhrase && isV2Latency} />
        </Split>
      </Arrange>
    </div>
  );
};
