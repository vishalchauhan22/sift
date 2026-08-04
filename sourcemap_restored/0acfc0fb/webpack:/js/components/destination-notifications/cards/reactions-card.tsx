import {
  NOTIFICATION_TRANSCRIPT_COLLAPSED,
  NOTIFICATION_TRANSCRIPT_EXPANDED,
} from '@js/constants/events';

import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import UserAvatar from '@js/components/user-avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import _groupBy from 'lodash/groupBy';

import _isNil from 'lodash/isNil';
import pluralize from 'pluralize';

import React, { useMemo, useState } from 'react';

import {
  Align,
  Arrange,
  Container,
  Icon,
  Spacer,
  Tab,
  Tabs,
  Text,
  TextButton,
} from '@loomhq/lens';
import { SvgTranscript } from '@loomhq/lens/icons/transcript';
import { timeUtils } from '@loomhq/shared-utilities';
import {
  EMOJIS,
  EXTENDED,
} from '@loomhq/shared-utilities/constants/emojiReactions';

import * as analytics from '@js/utilities/analytics';

import { ProfileCard } from '../ProfileCard';
import NotificationsVideoPlayer, {
  getSnippetTimestamps,
} from '../notifications-video-player';
import { ReactionsCardProps } from '../types';
import { NotificationLink } from './common';
import styles from './styles.module.less';
import { getNotificationOwner } from './utils';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
const { secondsToVideoTS } = timeUtils;

const EXTENDED_EMOJI_TYPE_PREFIX = `${EXTENDED}:`;

const formatReactionType = (reaction): string => {
  if (reaction.type === EXTENDED) {
    return EXTENDED_EMOJI_TYPE_PREFIX + reaction.extended_reaction;
  }

  return reaction.type;
};

export const ReactionsCard = ({
  notification,
}: ReactionsCardProps): JSX.Element | null => {
  const [activeReactionType, setActiveReactionType] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const reactions = notification.data?.reactions ?? [];

  // get first reaction timestamp
  let startTimestamp = reactions[0]?.time;
  let stopTimestamp;

  [startTimestamp, stopTimestamp] = getSnippetTimestamps(startTimestamp);

  const reactionLength = reactions.length;

  // if there is more than 1 reaction, get last reaction timestamp
  if (reactionLength > 1) {
    stopTimestamp = reactions[reactionLength - 1]?.time || stopTimestamp;
  }

  const reactionsSerialized = JSON.stringify(reactions);

  const reactionsTypeMap = useMemo(
    () => _groupBy(reactions, formatReactionType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactionsSerialized]
  );

  if (!reactions) {
    return null;
  }

  const reactionsMapEntries = Object.entries(reactionsTypeMap);

  const notificationOwner = getNotificationOwner(notification.user);

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
          <Text color="bodyDimmed" isInline htmlTag="h2">
            {notification.data?.reactionsCount}{' '}
            {pluralize('reaction', notification.data?.reactionsCount)} to{' '}
          </Text>
          <NotificationLink url={notification.url}>
            {notification.video?.name}
          </NotificationLink>
        </Container>
        <Container>
          <Arrange gap={1.5} alignItems="center">
            <ProfileCard
              avatarMode={true}
              notificationOwner={notificationOwner}
            >
              <UserAvatar
                avatarSize={4}
                avatarSrc={notificationOwner.avatar}
                name={notificationOwner.name}
              />
            </ProfileCard>
            <Arrange>
              <ProfileCard
                avatarMode={false}
                notificationOwner={notificationOwner}
              >
                <Text fontWeight="bold" isInline>
                  {notificationOwner.name}
                </Text>
              </ProfileCard>
              <Text color="bodyDimmed" isInline>
                ・
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </Text>
            </Arrange>
          </Arrange>
        </Container>
        {!_isNil(reactions?.[0]?.time) && (
          <>
            <Spacer top="medium" />
            <Container borderSide="all" radius="large" overflow="hidden">
              <Spacer x="medium">
                <Arrange justifyContent="space-between">
                  <div>
                    {/* Top spacing to match spacing on bottom of Tabs */}
                    <Spacer top=".6875rem" />
                    <Tabs>
                      {reactionsMapEntries.map(([type, value]) => {
                        const reactionCount = value.length;

                        return (
                          <Tab
                            className={
                              !activeReactionType
                                ? styles.reactionCardTab
                                : undefined
                            }
                            key={type}
                            isActive={activeReactionType === type}
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();

                              if (reactionsMapEntries.length === 1) {
                                !showTranscript && setShowTranscript(true);

                                return;
                              }

                              // Un-toggle the tab to return showing ALL emoji transcriptions
                              const newType =
                                activeReactionType === type ? '' : type;

                              setActiveReactionType(newType);
                              !showTranscript && setShowTranscript(true);
                            }}
                          >
                            <Arrange gap="small">
                              <Emoji type={type} value={value[0]} />
                              <Text>{reactionCount}</Text>
                            </Arrange>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </div>
                  <TextButton
                    iconPosition="right"
                    icon={
                      <div>
                        <Icon color="primary" icon={<SvgTranscript />} />
                      </div>
                    }
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (showTranscript) {
                        analytics.track(NOTIFICATION_TRANSCRIPT_COLLAPSED, {
                          ...withIdentifiers(
                            NOTIFICATION_TRANSCRIPT_COLLAPSED,
                            AnalyticsEntityId.notification(
                              reactions?.[0]?.id,
                              'string',
                              'notificationId'
                            )
                          ),
                          notificationType: reactions?.[0]?.type,
                        });
                      } else {
                        analytics.track(NOTIFICATION_TRANSCRIPT_EXPANDED, {
                          ...withIdentifiers(
                            NOTIFICATION_TRANSCRIPT_EXPANDED,
                            AnalyticsEntityId.notification(
                              reactions?.[0]?.id,
                              'string',
                              'notificationId'
                            )
                          ),
                          notificationType: reactions?.[0]?.type,
                        });
                      }

                      setShowTranscript(!showTranscript);
                    }}
                  >
                    <Text color="primary" fontWeight="bold">
                      Transcript
                    </Text>
                  </TextButton>
                </Arrange>
              </Spacer>
              {showTranscript && (
                <Container
                  padding="medium"
                  backgroundColor="backgroundSecondary"
                  borderSide="top"
                >
                  <Arrange
                    columns="auto auto 1fr"
                    alignItems="start"
                    gap="medium"
                  >
                    {reactions
                      .filter(
                        reaction =>
                          !activeReactionType ||
                          formatReactionType(reaction).includes(
                            activeReactionType
                          )
                      )
                      .map(reaction => (
                        <React.Fragment key={reaction.id}>
                          <Spacer top="6px">
                            <Text color="primary">
                              {secondsToVideoTS(reaction.time)}
                            </Text>
                          </Spacer>
                          <Emoji
                            type={formatReactionType(reaction)}
                            value={reaction}
                          />

                          <Spacer top="6px">
                            <Text hasEllipsis ellipsisLines={3}>
                              {reaction.transcript?.current?.value || (
                                <Text color="bodyDimmed">
                                  [No transcript available at this time]
                                </Text>
                              )}
                            </Text>
                          </Spacer>
                        </React.Fragment>
                      ))}
                  </Arrange>
                </Container>
              )}
            </Container>
          </>
        )}
      </Container>
      <div className="none sm-block">
        <Align alignment="topCenter">
          <Container radius="large" borderSide="all" overflow="hidden">
            <NotificationsVideoPlayer
              startTimestamp={startTimestamp}
              stopTimestamp={stopTimestamp}
              title={notification.video?.name}
              url={notification.url}
              videoModel={notification.video.enhancedVideo}
            />
          </Container>
        </Align>
      </div>
    </Arrange>
  );
};

function Emoji({ type, value }) {
  const { getEmojiUnicodeByName } = useEmojiData();

  if (type.startsWith(EXTENDED_EMOJI_TYPE_PREFIX)) {
    const reaction = value.extended_reaction;

    return (
      <span className={styles.emoji}>{getEmojiUnicodeByName(reaction)}</span>
    );
  }

  return <span className={styles.emoji}>{EMOJIS[type]}</span>;
}
