import React from 'react';
import { Align, Arrange, Container } from '@loomhq/lens';
import { TranscriptTimestamp as Timestamp } from './TranscriptTimestamp';
import { TranscriptCopySnippetButtonController as CopySnippetButton } from './copy-snippet-button';
import { TranscriptPhraseItemValue } from './TranscriptPhraseItemValue';
import {
  ItxPartialLatency as TranscriptLatency,
  ItxPartialLatencyEnum as TranscriptLatencyEnum,
} from '@loomhq/shared-utilities/types/transcription';
import cx from 'classnames';

import $ from './styles.module.css';
import { HighLatencyPhraseLoaderRow } from './high-latency-loaders';

type SearchHighlighting = {
  displayValue: React.ReactNode;
  phraseRef: React.RefObject<HTMLDivElement>;
  isActiveSearchPhrase: boolean;
};

type TranscriptPhraseListItemComponentProps = {
  index: number;
  currentRowTs: number;
  currentRowValue: string;
  speakerName?: string;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  showSpeakerName: boolean;
  isLastPhrase: boolean;
  isCopyButtonHovered?: boolean;
  onCopyHoverStateChange?: (isHovering: boolean) => void;
  searchHighlighting: SearchHighlighting;
  showPrimaryTimestamp?: boolean;
  latencyMode?: TranscriptLatency;
};

export const TranscriptPhraseListItemComponent: React.FC<
  TranscriptPhraseListItemComponentProps
> = ({
  index,
  currentRowTs,
  currentRowValue,
  speakerName,
  isHovered,
  setIsHovered,
  showSpeakerName,
  isLastPhrase,
  isCopyButtonHovered = false,
  onCopyHoverStateChange,
  searchHighlighting,
  showPrimaryTimestamp,
  latencyMode = TranscriptLatencyEnum.Standard,
}) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={cx($.row, {
          [$.copying]: isCopyButtonHovered,
        })}
        data-testid={`transcript-row-${index}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Container paddingTop="2px" paddingRight="medium" height="100%">
          <Arrange autoFlow="row" justifyContent="stretch" alignContent="start">
            <Align alignment="topLeft">
              <Timestamp
                timestamp={currentRowTs}
                showPrimary={showPrimaryTimestamp}
              />
            </Align>
            <Align
              alignment="bottomLeft"
              style={{
                visibility: isHovered ? 'visible' : 'hidden',
              }}
            >
              <CopySnippetButton
                snippet={
                  speakerName
                    ? `${speakerName}:\n${currentRowValue}`
                    : currentRowValue
                }
                onHoverStateChange={onCopyHoverStateChange}
              />
            </Align>
          </Arrange>
        </Container>
        <Container width="100%" position="relative">
          <TranscriptPhraseItemValue
            phrase={{ ts: currentRowTs, value: currentRowValue, speakerName }}
            showSpeakerName={showSpeakerName}
            isLastPhrase={isLastPhrase}
            searchHighlighting={searchHighlighting}
            latencyMode={latencyMode}
          />
        </Container>
      </div>
      <HighLatencyPhraseLoaderRow
        currentRowTs={currentRowTs}
        shouldRender={
          isLastPhrase && !(latencyMode === TranscriptLatencyEnum.V2)
        }
      />
    </>
  );
};
