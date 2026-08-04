import cn from 'classnames';

import React from 'react';

import { Container, Link, Spacer, Text } from '@loomhq/lens';

import { PLANS_AND_BILLING_ALL_PLANS_SECTION } from '../../../constants/routes';
import { BusinessTrialWelcomeCardProps } from '../types';
import listStyles from './list.module.css';
import { useGetBusinessTrialWelcomeCardProps } from '../hooks/useGetBusinessTrialWelcomeCardProps';
import { arePropsEqual } from '../functions/arePropsEquals';
import * as logger from '@js/utilities/loggerx';
import { Feature } from '@loomhq/shared-utilities/constants/product';

export const BusinessTrialWelcomeCard = ({
  notification,
}: BusinessTrialWelcomeCardProps): JSX.Element | null => {
  const { workspace } = notification;

  const { notification: queriedNotification, loading } =
    useGetBusinessTrialWelcomeCardProps(notification.id);

  const queriedWorkspace = queriedNotification?.notification?.workspace;

  if (!loading && queriedWorkspace) {
    if (arePropsEqual(notification, queriedNotification.notification)) {
      logger.info('Business trial welcome card displayed', {
        feature: Feature.Notifications,
      });
    } else {
      logger.info('Business trial welcome card not displayed', {
        feature: Feature.Notifications,
        originalNotification: notification,
        queriedNotification: queriedNotification?.notification,
      });
    }
  }

  return (
    <Container paddingBottom="medium" data-testid="business-trial-welcome-card">
      <Text color="bodyDimmed" isInline>
        Welcome to your trial 🔮
      </Text>
      <Spacer bottom="small" />
      <Container>
        <Text color="body">
          For the next 14 days, <strong>{workspace.name}</strong> includes a{' '}
          <strong>free trial</strong>. Your trial unlocks an unlimited recording
          length alongside an unlimited number of videos. Plus when you{' '}
          <Link href="https://www.loom.com/looms/videos?reminderToRecord=trialWelcome">
            record and share
          </Link>
          , you&apos;re able to access:
        </Text>
      </Container>
      <Spacer bottom="small" />
      <Container>
        <ul className={cn(listStyles['list'])}>
          <li>
            <Link href="https://support.loom.com/hc/en-us/articles/360002241117-How-to-add-a-call-to-action-button">
              Embedded CTA buttons
            </Link>{' '}
            to connect your viewers to more information
          </li>
          <li>
            <Link href="https://support.loom.com/hc/en-us/articles/360007980598-How-we-calculate-Engagement-Insights">
              Engagement Insights
            </Link>{' '}
            to learn <i>how people engage</i> with your videos, not just who
            viewed them
          </li>
          <li>
            Secure your videos with{' '}
            <Link href="https://support.loom.com/hc/en-us/articles/360002235698-How-to-protect-your-videos-with-a-password">
              password protection
            </Link>
            , keeping your content for selected eyes only
          </li>
          <li>
            Your own{' '}
            <Link href="https://support.loom.com/hc/en-us/articles/360006122198-How-to-configure-custom-branding-for-your-videos">
              logo and custom color scheme
            </Link>{' '}
            (without our branding)
          </li>
          <li>
            Plus, <i>everything</i> in{' '}
            <Link href="https://www.loom.com/pricing#compare-plans">
              this middle column
            </Link>
            !
          </li>
        </ul>
      </Container>
      <Spacer bottom="small" />
      <Container>
        <Text color="body" isInline>
          <Link href={PLANS_AND_BILLING_ALL_PLANS_SECTION}>
            Upgrade any time
          </Link>{' '}
          to keep all the power features of Loom Business.
        </Text>
      </Container>
    </Container>
  );
};
