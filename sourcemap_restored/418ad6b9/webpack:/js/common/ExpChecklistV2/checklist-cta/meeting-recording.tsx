import { GET_STARTED_CHECKLIST_MEETING_RECORDING_CLICKED } from '@js/constants/events';

import React from 'react';

import { Button, Spacer, Text } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';

import { ChecklistV2DisplayContext } from '../types';
import { useCompleteChecklistItem } from '@js/hooks/checklist';
import { ChecklistItem } from '@js/globalTypes.generated';

export const MeetingRecordingCta = ({
  displayContext,
  buttonSize = 'medium',
}: {
  displayContext: ChecklistV2DisplayContext | null;
  buttonSize?: 'medium' | 'small';
}): JSX.Element | null => {
  const { completeChecklistItem } = useCompleteChecklistItem(
    ChecklistItem.MeetingRecording
  );
  return (
    <>
      <Text color={'bodyDimmed'}>
        Manage which meetings will be automatically recorded and who has access
        to the recordings.
      </Text>
      <Spacer bottom="small" />
      <Button
        data-testid="meeting-recording-settings-button"
        variant="primary"
        hasFullWidth={true}
        size={buttonSize}
        onClick={async () => {
          analytics.track(GET_STARTED_CHECKLIST_MEETING_RECORDING_CLICKED, {
            displayContext,
          });
          await completeChecklistItem();
          window.location.href = '/meetings';
        }}
      >
        Meeting recording settings
      </Button>
    </>
  );
};
