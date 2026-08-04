import { PERSONALIZED_NOTIFICATION_USE_CASE_LINK_CLICKED } from '@js/constants/events';

import { usePersistentRecordAllowed } from '@js/hooks/sdk';
import React, { Suspense } from 'react';

import * as loggerx from '@js/utilities/loggerx';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import {
  Align,
  Arrange,
  Button,
  Container,
  Spacer,
  Text,
  Link,
} from '@loomhq/lens';
import { ReminderToRecordType } from '@loomhq/shared-utilities';
import {
  ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES,
  ONBOARDING_NOTIFICATIONS_REMINDER_ON_JOB_ROLES,
  USE_CASE_LINKS_ON_ROLES,
  MOBILE_ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES,
} from '@loomhq/shared-utilities/constants/employmentRoles';
import { Team } from '@loomhq/shared-utilities/constants/product';
import { REMINDER_TO_RECORD_NOTIFICATION } from '@js/components/record-button';

import * as analytics from '@js/utilities/analytics';

import { ReminderToRecordCardProps } from '../types';
import styles from './reminder-to-record-card.module.less';
const RecordButton = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "RecordButton" */ '@js/components/record-button'
  ).then(module => ({ default: module.RecordButton }))
);

const OTHER = 'Other';

function getReminderContent({
  reminderToRecordType,
  role,
  defaultTitle,
  body,
}: {
  reminderToRecordType: string | undefined;
  role: string | undefined;
  defaultTitle: string | undefined;
  body: string | undefined;
}): {
  heading: string;
  description: string;
  useLink: string | undefined;
} {
  // TODO: add default text; AE-881
  let heading = '';
  let description = '';
  let useLink = '';

  try {
    const userRole = role || OTHER;

    switch (reminderToRecordType) {
      case ReminderToRecordType.SaveMeetingTime:
      case ReminderToRecordType.WordsOfGratitude:
      case ReminderToRecordType.AfterXViewsGiven:
      case ReminderToRecordType.MediumEngagement:
      case ReminderToRecordType.HighEngagement:
        if (!defaultTitle || !body) {
          throw new Error('Missing defaultTitle or body values');
        }

        heading = defaultTitle;
        description = body;
        break;
      case ReminderToRecordType.Personalized1:
        heading = `${ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES[userRole]?.notificationTitle}`;
        description = `${ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES[userRole]?.message}`;
        useLink = `https://loom.com/${USE_CASE_LINKS_ON_ROLES[userRole]}`;
        break;
      case ReminderToRecordType.Personalized2:
        heading = `${ONBOARDING_NOTIFICATIONS_REMINDER_ON_JOB_ROLES[userRole]?.notificationTitle}`;
        description = `${ONBOARDING_NOTIFICATIONS_REMINDER_ON_JOB_ROLES[userRole]?.message}`;
        useLink = `https://loom.com/${USE_CASE_LINKS_ON_ROLES[userRole]}`;
        break;
      case ReminderToRecordType.PersonalizedMobile:
        heading = `${MOBILE_ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES[userRole]?.title}`;
        description = `${MOBILE_ONBOARDING_NOTIFICATIONS_ON_JOB_ROLES[userRole]?.message}`;
        break;
      default:
        throw new Error('Unrecognized reminderToRecordType value');
    }
  } catch (err) {
    loggerx.error(
      err,
      {
        message: 'Error while rendering Reminder to Record notification card',
      },
      {
        team: Team.Outreach,
        reminderToRecordType,
      }
    );
  }

  return { heading, description, useLink };
}

export const ReminderToRecordCard = ({
  notification,
}: ReminderToRecordCardProps): JSX.Element => {
  const persistentRecordAllowed = usePersistentRecordAllowed();

  const {
    reminderToRecordType,
    role,
    defaultTitle,
    content: body,
  } = notification.data;

  const content = getReminderContent({
    reminderToRecordType,
    role,
    defaultTitle,
    body,
  });

  const useCaseLinkClicked = () => {
    analytics.track(PERSONALIZED_NOTIFICATION_USE_CASE_LINK_CLICKED, {
      reminderToRecordType,
      role,
    });
  };

  return (
    <>
      <Text color="bodyDimmed" hasEllipsis htmlTag="h2">
        Reminder to record
      </Text>
      <Spacer top="medium" />
      <Container
        borderSide="all"
        radius="large"
        overflow="hidden"
        maxWidth="43.25rem"
        padding="medium"
      >
        <Arrange
          autoFlow={{ default: 'row', small: 'column' }}
          gap={{ default: 'medium', small: 'xlarge' }}
        >
          <div className={styles.spotIllustration} />
          <Spacer y={{ default: 0, small: 'small' }}>
            <Text fontWeight="bold">{content.heading}</Text>
            <Text color="bodyDimmed">
              {content.description}{' '}
              {content.useLink && (
                <Link onClick={useCaseLinkClicked} href={content.useLink}>
                  here.
                </Link>
              )}
            </Text>
          </Spacer>
          {persistentRecordAllowed && (
            <Align alignment="bottomRight">
              <Suspense fallback={null}>
                <RecordButton source={REMINDER_TO_RECORD_NOTIFICATION}>
                  <Button variant="primary">Record now</Button>
                </RecordButton>
              </Suspense>
            </Align>
          )}
        </Arrange>
      </Container>
    </>
  );
};
