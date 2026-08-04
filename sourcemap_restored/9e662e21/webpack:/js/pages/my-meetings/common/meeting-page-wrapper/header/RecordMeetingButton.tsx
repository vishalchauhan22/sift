// TODO: Move these functions and queries to common folder after rollout
import React from 'react';

import { Button, SkeletonContainer } from '@loomhq/lens';
import { calendarMeetingsRange } from '@loomhq/shared-utilities/utilities/calendarMeetings';

import { ModalTypeEnum } from '@js/common/modal-container/modal-components/enums';
import { useModals } from '@js/common/modal-container/useModals';
import { useGetCalendarMeetingsQuery } from '@js/pages/my-meetings/GetCalendarMeetings.generated';
import { parseDataFromCalendarMeetingsQuery } from '@js/pages/my-meetings/utils';
const RECORD_BUTTON_COPY = `Record a meeting`;

export const RecordMeetingButton = (): JSX.Element => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const { openModal } = useModals();

  const { rangeStart, rangeEnd } = calendarMeetingsRange(timeZone);

  const { data: getCalendarMeetingsData, loading: loadingMeetingsData } =
    useGetCalendarMeetingsQuery({
      variables: { rangeStart, rangeEnd },
      fetchPolicy: 'cache-and-network',
    });

  if (loadingMeetingsData) {
    <SkeletonContainer width="150px" height="36px" />;
  }

  const { googleCalendar, microsoftOutlook } =
    parseDataFromCalendarMeetingsQuery(getCalendarMeetingsData);
  const googleCalendarConnected = Boolean(googleCalendar);
  const microsoftOutlookConnected = Boolean(microsoftOutlook);

  const openRecordMeetingModal = () => {
    openModal({
      modalType: ModalTypeEnum.RECORD_MEETING_MODAL,
    });
  };

  return (
    <>
      <Button
        variant={
          !googleCalendarConnected && !microsoftOutlookConnected
            ? 'neutral'
            : 'primary'
        }
        onClick={openRecordMeetingModal}
      >
        {RECORD_BUTTON_COPY}
      </Button>
    </>
  );
};
