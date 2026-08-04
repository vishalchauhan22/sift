// TODO: Move these functions and queries to common folder after rollout
import React, { useState } from 'react';

import {
  Button,
  Container,
  FormField,
  Text,
  TextInput,
  Modal,
} from '@loomhq/lens';
import { ConnectedServiceIntegrationType } from '@loomhq/shared-utilities/constants/calendarMeetings';
import { cleanMeetingUrl } from '@loomhq/shared-utilities/utilities/urlUtils';
import {
  isValidMeetingUrl,
  isKnownUnsupportedMeetingUrl,
} from '@loomhq/shared-utilities/utilities/validateUtils';
import { useConfirmationToast } from '@js/common/confirmation-toast';
import { useModals } from '@js/common/modal-container/useModals';

import { useSpawnMeetingBotMutation } from './SpawnMeetingBot.generated';

export const RecordMeetingModal = (): JSX.Element => {
  const { closeModal } = useModals();
  const [meetingUrl, setMeetingUrl] = useState('');
  const { setShowConfirmationToast } = useConfirmationToast();

  const [spawnMeetingBot, { data: spawnMeetingBotData, loading, error }] =
    useSpawnMeetingBotMutation();

  const handleSendRecordingBot = (newMeetingUrl: string) => {
    spawnMeetingBot({
      variables: {
        meetingUrl: newMeetingUrl,
        integrationType: ConnectedServiceIntegrationType.GOOGLE_CALENDAR,
      },
    });

    setMeetingUrl('');
    setShowConfirmationToast('Sending the Loom Recorder to your meeting');
  };

  const trimmedMeetingUrl = cleanMeetingUrl(meetingUrl);
  const unsupportedMeetingUrlError =
    isKnownUnsupportedMeetingUrl(trimmedMeetingUrl);
  const canSubmit = isValidMeetingUrl(trimmedMeetingUrl) && !loading;

  const onCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    closeModal();
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (canSubmit) {
      handleSendRecordingBot(trimmedMeetingUrl);
    }
    return false;
  };

  if (
    (spawnMeetingBotData &&
      spawnMeetingBotData.spawnMeetingBot?.__typename !==
        'SpawnMeetingBotPayload') ||
    error
  ) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <Modal
      mainButton={
        <Button
          variant="primary"
          onClick={e => onSubmit(e)}
          disabled={!canSubmit}
        >
          Record meeting
        </Button>
      }
      secondaryButton={<Button onClick={onCancel}>Cancel</Button>}
      title="Record a meeting with Loom now"
      isOpen={true}
      onCloseClick={onCancel}
    >
      <FormField label="Enter your meeting’s URL" labelFor="meeting_url">
        <TextInput
          id="meeting_url"
          placeholder="e.g. https://meet.google.com/xyz-abcd-abc"
          value={meetingUrl}
          onChange={e => setMeetingUrl(e.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !canSubmit) {
              event.preventDefault();
            }
          }}
        />
      </FormField>

      {unsupportedMeetingUrlError && (
        <Container
          marginTop="medium"
          borderColor="danger"
          contentColor="danger"
          backgroundColor="white"
          borderSide="all"
          padding="medium"
          radius="medium"
        >
          <Text size="body-sm">{unsupportedMeetingUrlError}</Text>
        </Container>
      )}
      <Container
        marginTop="medium"
        backgroundColor="backgroundSecondary"
        padding="medium"
        radius="medium"
      >
        <Text size="body-sm" color="bodyDimmed">
          Loom supports Zoom, Google Meet and Teams meetings
        </Text>
      </Container>
    </Modal>
  );
};
