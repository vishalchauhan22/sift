import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';
import { useOnDismissFtux } from '@js/hooks/ftux';
import React, { useEffect } from 'react';
import { useFtuxStore } from '@js/common/ftux/ftuxStore';

import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

import {
  Align,
  Arrange,
  Container,
  Icon,
  IconButton,
  Spacer,
  Text,
} from '@loomhq/lens';

import { SvgClose } from '@loomhq/lens/icons/close';

import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

import styles from './styles.module.css';

export enum MeetingRecordingsSetupFinishedFtuxSource {
  LoomMeetings = 'loomMeetings',
}

export const MeetingRecordingsSetupFinishedFtux = ({
  source,
}: {
  source: MeetingRecordingsSetupFinishedFtuxSource;
}): JSX.Element => {
  const onDismissFtux = useOnDismissFtux();
  const { sendScreenEvent } = useAnalytics();
  const { removeVisibleFtux } = useFtuxStore();

  useEffect(() => {
    sendScreenEvent({
      name: 'meetingNotesSpotlight',
      attributes: {
        nudgeSource: source,
      },
    });
  }, [source, sendScreenEvent]);

  useEffect(() => {
    const ftux = getLocalStorageKey(
      UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX
    );

    if (ftux && !ftux.show) {
      removeVisibleFtux({
        name: UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX,
      });
    }
  }, [removeVisibleFtux]);

  return (
    <div className={styles.bubble}>
      <Arrange autoFlow="column" columns={['1fr', '3em']}>
        <Container paddingTop="22px" paddingBottom="18px" paddingLeft="large">
          <Text size="body-lg" fontWeight="bold">
            You’re all set up 🎉
          </Text>
          <Spacer top="xsmall" />
          <Text size="body-md" color="bodyDimmed">
            Manage your connected calendars and meeting recording settings here.
          </Text>
        </Container>
        <Align alignment="topRight">
          <Container paddingRight="4px" paddingTop="4px">
            <IconButton
              icon={<Icon size="medium" icon={<SvgClose />} />}
              altText="Close tooltip"
              onClick={() => {
                onDismissFtux(
                  UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX
                );
                setLocalStorageKey(
                  UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX,
                  { show: false }
                );
              }}
            />
          </Container>
        </Align>
      </Arrange>
    </div>
  );
};
