import { BetaPill } from '@js/pages/common/BetaPill';
import React from 'react';

import { Container, Arrange, Radio, Text, Icon } from '@loomhq/lens';

import $ from './styles.module.css';
import {
  BulkTrimOperations,
  FillerWordAppliedTypes,
  OFF,
  FILLER_WORDS,
  FILLER_WORDS_PLUS,
  REMOVE_FILLER_WORDS,
  REMOVE_FILLER_WORDS_PLUS,
  UNDO_REMOVE_FILLER_WORDS,
} from '../constants';
import { SvgAiGenerativeAudio } from '@loomhq/lens/icons/ai-generative-audio';

const FillerWordAppliedTypesToBulkTrimTypeMap = {
  [FILLER_WORDS]: REMOVE_FILLER_WORDS as BulkTrimOperations,
  [FILLER_WORDS_PLUS]: REMOVE_FILLER_WORDS_PLUS as BulkTrimOperations,
  [OFF]: UNDO_REMOVE_FILLER_WORDS as BulkTrimOperations,
};

const RadioOption = ({
  radioName,
  content,
  isRadioChecked,
  onClick,
  onRadioChange,
}: {
  radioName: FillerWordAppliedTypes;
  content: React.ReactNode;
  isRadioChecked: boolean;
  onClick: () => void;
  onRadioChange: () => void;
}): JSX.Element => {
  return (
    <Container>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
      <div
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        className={$.sectionContainer}
      >
        <Arrange
          gap={1.5}
          columns={['auto', '1fr']}
          alignItems="start"
          alignContent="center"
        >
          <Container paddingTop="2px">
            <Radio
              name={radioName}
              isChecked={isRadioChecked}
              onChange={onRadioChange}
            />
          </Container>
          {content}
        </Arrange>
      </div>
    </Container>
  );
};

export const RemoveFillerWordsPopover = ({
  onClose,
  bulkTrim,
  appliedFillerWordRemoval,
  showOffOption,
  showEditTtsInfoPanel,
}: {
  onClose: () => void;
  bulkTrim: (type: BulkTrimOperations) => void;
  appliedFillerWordRemoval: FillerWordAppliedTypes;
  showOffOption: boolean;
  showEditTtsInfoPanel: boolean;
}): JSX.Element => {
  const onSectionClick = ({ value }: { value: FillerWordAppliedTypes }) => {
    if (value === appliedFillerWordRemoval) {
      return;
    }
    const bulkTrimOperation: BulkTrimOperations =
      FillerWordAppliedTypesToBulkTrimTypeMap[value];

    bulkTrim(bulkTrimOperation);

    onClose();
  };

  return (
    <Container
      contentColor="body"
      backgroundColor="overlay"
      radius="250"
      shadow="large"
      borderSide="all"
      width={44}
    >
      {showOffOption && (
        <Container>
          <RadioOption
            radioName={OFF}
            content={<Text>Off</Text>}
            isRadioChecked={appliedFillerWordRemoval === OFF}
            onClick={() => onSectionClick({ value: OFF })}
            onRadioChange={() =>
              bulkTrim(FillerWordAppliedTypesToBulkTrimTypeMap[OFF])
            }
          />
        </Container>
      )}
      <Container borderSide={showOffOption ? 'top' : undefined}>
        <RadioOption
          radioName={FILLER_WORDS}
          content={<Text>Trim out just the um&apos;s and ah&apos;s</Text>}
          isRadioChecked={appliedFillerWordRemoval === FILLER_WORDS}
          onClick={() => onSectionClick({ value: FILLER_WORDS })}
          onRadioChange={() =>
            bulkTrim(FillerWordAppliedTypesToBulkTrimTypeMap[FILLER_WORDS])
          }
        />
      </Container>
      <Container borderSide="top">
        <RadioOption
          radioName={FILLER_WORDS_PLUS}
          content={
            <Arrange justifyContent="space-between" gap="xsmall">
              <Text>
                Trim out the um&apos;s, ah&apos;s, rambles, and repeats
              </Text>
              <BetaPill />
            </Arrange>
          }
          isRadioChecked={appliedFillerWordRemoval === FILLER_WORDS_PLUS}
          onClick={() => onSectionClick({ value: FILLER_WORDS_PLUS })}
          onRadioChange={() =>
            bulkTrim(FillerWordAppliedTypesToBulkTrimTypeMap[FILLER_WORDS_PLUS])
          }
        />
      </Container>
      {showEditTtsInfoPanel && (
        <div className={$.aiInfoPanel}>
          <Arrange autoFlow="column" gap="small" alignItems="start">
            <Icon icon={<SvgAiGenerativeAudio />} />
            <Container>
              <Text fontWeight="bold">Edit voice like text</Text>
              <Text>
                Highlight words in your transcript and hit &apos;replace&apos;.
                No re-recording needed.
              </Text>
            </Container>
          </Arrange>
        </div>
      )}
    </Container>
  );
};
