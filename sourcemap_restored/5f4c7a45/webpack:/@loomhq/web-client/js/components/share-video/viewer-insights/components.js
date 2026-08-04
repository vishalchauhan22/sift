/* eslint-disable @loomhq/loom/no-js-extension */

import classnames from 'classnames';
import { usePlayerFromContext } from '@js/common/video-player';
import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import Scopes from '@js/components/scopes';
import UserAvatar from '@js/components/user-avatar';
import React from 'react';
import { getAvatarFromPath } from '@js/utilities/avatar';

import { safeDateFormat } from '@js/utilities/datetime';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgComment } from '@loomhq/lens/icons/comment';
import { SvgSmile } from '@loomhq/lens/icons/smile';
import { timeUtils } from '@loomhq/shared-utilities';
import { ENGAGEMENT_INSIGHTS_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { ANONYMOUS_NAME } from '@loomhq/shared-utilities/constants/userAppSettings';

import styles from './styles.module.less';
const { secondsToVideoTS } = timeUtils;

function EmojiWrapper({ content, label }) {
  const { getEmojiUnicodeByName } = useEmojiData();

  return (
    <span className={styles.emoji} aria-label={label}>
      {getEmojiUnicodeByName(content)}
    </span>
  );
}

const toPercentOfDuration = (ts, videoDuration) =>
  (ts * 100) / videoDuration + '%';

export const Reaction = ({ type, ts, content, onClick, videoDuration }) => {
  const ref = React.useRef();
  const className = type + ' opaque';
  const isCommentType = type === 'comment';

  const style = { left: toPercentOfDuration(ts, videoDuration) };

  React.useLayoutEffect(() => {
    const el = ref?.current;
    const parentRect = el.parentElement?.getBoundingClientRect();
    const childRect = el.getBoundingClientRect();
    const pushedOut = childRect.right - parentRect.right;

    if (pushedOut > 0) {
      // if emoji is partially or fully out of the container box
      // push it back in
      el.style.transform = `translateX(${-1 * pushedOut}px)`;
    }
  });

  let title = '';

  if (isCommentType) {
    title = content;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div
      className={className}
      style={style}
      title={title}
      onClick={onClick}
      ref={ref}
    >
      <EmojiWrapper content={content} label={content} />
    </div>
  );
};

export const ViewerInfo = ({
  user = { avatar: null, name: null },
  events = [],
}) => {
  const comments = events.filter(evt =>
    ['comment', 'reply'].includes(evt.type)
  );
  const reactions = events.filter(evt => evt.type === 'reaction');

  return (
    <article className={styles.viewerInfo}>
      <ViewerAvatar avatar={user.avatar} name={user.name} />
      <div>
        <ViewerName {...user} />
        <Scopes name={ENGAGEMENT_INSIGHTS_ACCESS}>
          <Arrange gap="medium">
            <ViewerEventCounter type="comment" items={comments || []} />
            <ViewerEventCounter type="reaction" items={reactions || []} />
          </Arrange>
        </Scopes>
      </div>
    </article>
  );
};

const ViewerEventCounter = ({ type, items = [] }) => {
  const tot = items.length;
  const Ico = type === 'comment' ? SvgComment : SvgSmile;

  return (
    <Arrange gap="xsmall">
      <Icon icon={<Ico />} size={2} color="bodyDimmed" />
      <Text color="bodyDimmed">{tot}</Text>
    </Arrange>
  );
};

export const ViewerAvatar = props => {
  const imageSrc = props.avatar && getAvatarFromPath(props.avatar);
  const nameProp = name;
  const avatarName = nameProp !== ANONYMOUS_NAME && nameProp;

  return (
    <UserAvatar
      avatarSize={props.size ?? 4}
      avatarSrc={imageSrc}
      name={avatarName}
      data-test-id={!imageSrc && !avatarName ? 'test-anonAvatar' : undefined}
      data-lens-theme="light" // Force avatars to be light mode
    />
  );
};

export const ViewerName = props => (
  <div>
    <Text fontWeight="bold" htmlTag="h3">
      {props.name ? props.name : 'Anonymous'}
    </Text>
  </div>
);

export const ViewsList = props => {
  return (
    <>
      {props.views.map((ts, i) => {
        const timestamp = Number(ts);
        const date = safeDateFormat(timestamp, 'MMMM do, yyyy h:mma');

        return (
          <Text variant="body" key={i}>
            <time>{date}</time>
          </Text>
        );
      })}
    </>
  );
};

const EventsWrapper = ({ emojiIcon, evt, action, playVideoAt }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div
      className={classnames(styles.eventItem, styles.isClickable)}
      onClick={playVideoAt(evt.ts)}
    >
      {emojiIcon}
      {action}
      <time>{secondsToVideoTS(evt.ts)}</time>
    </div>
  );
};

const ExtendedEmojiWrapper = ({ label, emojiUnicode }) => {
  return (
    <span className={styles.emoji} aria-label={label}>
      {emojiUnicode}
    </span>
  );
};

function getEmojiIcon({ getEmojiUnicodeByName, action, evt }) {
  const emojiType = evt.content;

  const label = `${action} ${secondsToVideoTS(evt.ts)}`;

  return (
    <ExtendedEmojiWrapper
      label={label}
      emojiUnicode={getEmojiUnicodeByName(emojiType)}
    />
  );
}

export const EventsList = ({ events = [] }) => {
  const player = usePlayerFromContext();

  const { getEmojiUnicodeByName } = useEmojiData();

  const actions = {
    comment: 'Commented at',
    reaction: 'Reacted at',
    reply: 'Replied at',
  };

  if (!events.length) {
    return null;
  }

  // TODO: useSetPlayerTime instead of player.currentTime
  const requestPlayVideoAt = ts => () => {
    if (player) {
      player.currentTime = ts;
    }
  };

  return (
    <div className="px:small py:medium bgc:backgroundSecondary radius:medium">
      <div className="px:small mb:small">
        <Text fontWeight="bold">Activity</Text>
      </div>
      {[...events].sort(sortCompareByTimestamp).map((evt, i) => {
        const action = actions[evt.type];
        const isReaction = action === actions.reaction;
        const emojiIcon = isReaction
          ? getEmojiIcon({
              getEmojiUnicodeByName,
              action,
              evt,
            })
          : null;

        // TODO: remove below check after extended emoji rollout
        // does not render event if extended emoji is not viewable when FF is off
        if (isReaction && emojiIcon === null) {
          return null;
        }

        return (
          <EventsWrapper
            key={i}
            emojiIcon={emojiIcon}
            evt={evt}
            action={action}
            playVideoAt={requestPlayVideoAt}
          />
        );
      })}
    </div>
  );
};

function sortCompareByTimestamp({ ts }, { ts: ts2 }) {
  if (ts > ts2) {
    return 1;
  }

  if (ts2 > ts) {
    return -1;
  }

  return 0;
}
