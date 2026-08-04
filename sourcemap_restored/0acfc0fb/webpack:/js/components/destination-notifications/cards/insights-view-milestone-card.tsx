import React from 'react';

import { getMostCompleteNamePossible } from '@js/utilities/user';

import {
  Arrange,
  Container,
  Text,
  Spacer,
  Split,
  SplitSection,
} from '@loomhq/lens';

import { FacePile } from '../../../common/face-pile';
import InsightsHubButton from '../../insights-hub/insightsHubButton';
import InsightsHubIcon from '../../insights-hub/insightsHubIcon';
import { ProfileCard } from '../ProfileCard';
import { InsightViewMilestoneCardProps } from '../types';
import { getUserAvatarThumb } from './../../../utilities/avatar';
const MAX_AVATARS = 3;
const MAX_NAMES = 2;

export const InsightsViewMilestoneCard = ({
  notification,
}: InsightViewMilestoneCardProps): JSX.Element | null => {
  const notificationData = notification?.data;
  const viewers = notification?.data?.viewers.filter(viewer => viewer);
  const totalAnonymousViews = notificationData?.totalAnonymousViews;

  if (!notificationData) {
    return null;
  }

  return (
    <Arrange
      gap="xlarge"
      columns={{
        default: '1fr',
        small: ['minmax(0, 43.25rem)', 'auto'],
      }}
      alignItems="start"
      justifyContent="space-between"
    >
      <Container>
        <Container paddingBottom="medium">
          <Arrange>
            <InsightsHubIcon />
            <Spacer left="small" />
            <Text color="bodyDimmed" isInline>
              New milestone! You received your{' '}
              {notificationData?.totalViewsReceived}th view of all time.
            </Text>
          </Arrange>
        </Container>
        <Arrange columns={['auto', '1fr']} gap={1.5}>
          <FacePile
            avatarSize={4}
            showRemainderAvatar={false}
            showUnRenderedLabel={false}
            maxImages={MAX_AVATARS}
            justify="center"
            userData={viewers?.map(viewer => {
              return {
                name: '',
                avatarSrc: getUserAvatarThumb([viewer?.avatars?.thumb]),
                id: viewer?.id,
              };
            })}
          />

          {viewers.length ? (
            <Split>
              <SplitSection>
                <Text>Views from </Text>
              </SplitSection>
              {viewers?.slice(0, MAX_NAMES)?.map((viewer, key) => (
                <SplitSection key={`${viewer.id}-${key}`}>
                  <ProfileCard
                    avatarMode={false}
                    notificationOwner={{
                      name: getMostCompleteNamePossible(viewer),
                      avatar: viewer?.avatars?.thumb,
                      id: viewer?.id,
                    }}
                  >
                    <Container paddingLeft="xsmall">
                      <Text fontWeight="bold">
                        {getMostCompleteNamePossible(viewer)}
                        {key < viewers.length - 1
                          ? viewers.length === 2 && !totalAnonymousViews
                            ? ' and'
                            : ','
                          : ''}
                      </Text>
                    </Container>
                  </ProfileCard>
                </SplitSection>
              ))}
              {viewers.length > MAX_NAMES ||
              (viewers.length && totalAnonymousViews) ? (
                <SplitSection>
                  <Container paddingLeft="xsmall">
                    <Text>and more</Text>
                  </Container>
                </SplitSection>
              ) : null}
            </Split>
          ) : null}
        </Arrange>
        <Spacer top="medium" />
        <InsightsHubButton
          useLinkStyle
          source={`${notificationData?.totalViewsReceived}-views-milestone-notification`}
        />
      </Container>
    </Arrange>
  );
};
