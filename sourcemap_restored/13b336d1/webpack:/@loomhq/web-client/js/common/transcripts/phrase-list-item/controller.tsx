import React, { useCallback, useState } from 'react';
import { Phrase } from '@loomhq/shared-utilities';
import { TranscriptPhraseListItemComponent as PhraseListItem } from './component';
import { useTranscriptSearchHighlighting } from './useTranscriptSearchHighlighting';
import {
  ItxPartialLatency as TranscriptLatency,
  ItxPartialLatencyEnum as TranscriptLatencyEnum,
} from '@loomhq/shared-utilities/types/transcription';

type TranscriptPhraseListItemControllerProps = {
  index: number;
  phrase: Phrase;
  prevPhrase?: Phrase;
  isLastPhrase: boolean;
  showPrimaryTimestamp?: boolean;
  latencyMode?: TranscriptLatency;
};

export const TranscriptPhraseListItemController: React.FC<
  TranscriptPhraseListItemControllerProps
> = ({
  index,
  phrase,
  prevPhrase,
  isLastPhrase,
  showPrimaryTimestamp = false,
  latencyMode = TranscriptLatencyEnum.Standard,
}) => {
  const { ts: currentRowTs, value: currentRowValue, speakerName } = phrase;
  const [isHovered, setIsHovered] = useState(false);
  const [isCopyButtonHovered, setIsCopyButtonHovered] = useState(false);

  // Extract search highlighting logic to custom hook
  const searchHighlighting = useTranscriptSearchHighlighting({
    index,
    phraseValue: currentRowValue,
  });

  const showSpeakerName = useCallback(() => {
    if (!speakerName) {
      return false;
    }
    if (index === 0) {
      return true;
    }
    const previousSpeaker = prevPhrase?.speakerName;
    return speakerName !== previousSpeaker;
  }, [index, prevPhrase, speakerName]);

  return (
    <PhraseListItem
      index={index}
      currentRowTs={currentRowTs}
      currentRowValue={currentRowValue}
      speakerName={speakerName}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      showSpeakerName={showSpeakerName()}
      isLastPhrase={isLastPhrase}
      isCopyButtonHovered={isCopyButtonHovered}
      onCopyHoverStateChange={setIsCopyButtonHovered}
      searchHighlighting={searchHighlighting}
      showPrimaryTimestamp={showPrimaryTimestamp}
      latencyMode={latencyMode}
    />
  );
};
