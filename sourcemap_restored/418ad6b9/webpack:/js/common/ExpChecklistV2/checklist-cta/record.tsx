import {
  GET_STARTED_CHECKLIST_LEARN_HOW_TO_RECORD_CLICKED,
  GET_STARTED_CHECKLIST_START_RECORDING_CLICKED,
} from '@js/constants/events';

import { useGetCheckListStatus } from '@js/hooks/getStartedChecklist';
import { useRecordLoom } from '@js/hooks/useRecordLoom';
import React from 'react';

import { Button, Spacer, Text, Tooltip } from '@loomhq/lens';
import { DOWNLOAD_RECORDER } from '@loomhq/shared-utilities/constants/checklist';
import {
  ONBOARDING_CHECKLIST,
  RecordButton,
} from '@js/components/record-button';

import * as analytics from '@js/utilities/analytics';

import { ChecklistV2DisplayContext } from '../types';

export const RecordCta = ({
  buttonSize,
  displayContext,
}: {
  displayContext: ChecklistV2DisplayContext | null;
  buttonSize?: 'small' | 'medium';
}): JSX.Element => {
  const { recorder } = useRecordLoom();
  const checklistStatus = useGetCheckListStatus();

  const hasRecorder = recorder.chrome || recorder.desktop;
  const isDisabled = !hasRecorder && !checklistStatus[DOWNLOAD_RECORDER];

  const tooltipText = !hasRecorder
    ? 'Download Loom, then start recording!'
    : null;

  return (
    <>
      <Text color={'bodyDimmed'}>
        Record a short video to share with your teammates. Try introducing
        yourself or replacing a meeting.
      </Text>
      <Spacer top="small" />
      <Button
        hasFullWidth={true}
        size={buttonSize}
        href="https://www.loom.com/share/99d30063c8874f87b004d53b8099befd?t=0"
        target="_blank"
        htmlTag="a"
        onClick={() =>
          analytics.track(GET_STARTED_CHECKLIST_LEARN_HOW_TO_RECORD_CLICKED, {
            displayContext,
          })
        }
      >
        Learn how to record
      </Button>
      <Spacer top="small" />
      <Tooltip
        isInline={false}
        tabIndex={-1}
        content={tooltipText}
        placement="bottomCenter"
        maxWidth={32}
      >
        <RecordButton source={ONBOARDING_CHECKLIST}>
          <Button
            hasFullWidth={true}
            variant="primary"
            disabled={isDisabled}
            size={buttonSize}
            onClick={() => {
              analytics.track(GET_STARTED_CHECKLIST_START_RECORDING_CLICKED, {
                displayContext,
              });
            }}
          >
            Start Recording
          </Button>
        </RecordButton>
      </Tooltip>
    </>
  );
};
