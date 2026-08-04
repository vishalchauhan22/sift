import { ExtendedReactionType, ReactionType } from '@js/common/video-player';
import { defaultEmojiReactionList } from '@js/common/video-player/emoji-reaction-list/constants';
import pluralize from 'pluralize';

// Format the reaction announcement for screen readers to be 'Like added at 3 seconds' or 'Like added at 1 minute' or 'Like added at 1:30 minutes'
export function formatReactionAnnouncement(
  reactionType: ExtendedReactionType,
  timestamp: number
): string {
  if (!reactionType || !timestamp) {
    return '';
  }

  const time = Math.floor(timestamp);

  let timeString: string;
  if (time < 60) {
    timeString = `${time} ${pluralize('second', time)}`;
  } else {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeString = `${minutes}:${seconds.toString().padStart(2, '0')} ${pluralize('minute', minutes)}`;
  }

  const emojiName = getEmojiName(reactionType);
  return `${emojiName} added at ${timeString}`;
}

function getEmojiName(
  reactionType: ExtendedReactionType
): string | Omit<string, ReactionType> {
  const standardReaction = defaultEmojiReactionList.find(
    reaction =>
      reaction.name === reactionType || reaction.label === reactionType
  );

  if (standardReaction) {
    return standardReaction.label;
  }

  return reactionType;
}
