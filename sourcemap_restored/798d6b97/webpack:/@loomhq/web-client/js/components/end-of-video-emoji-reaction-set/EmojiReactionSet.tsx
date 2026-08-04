import { LOOM_URI } from '@js/constants/routes';

import { useModals } from '@js/common/modal-container/useModals';
import {
  useEmojiReactionListStore,
  usePlayer,
  useVideoContext,
  VideoPlatform,
} from '@js/common/video-player';
import { PlayerButton } from '@js/common/video-player/components/play-bar/player-button';
import { useEmojiData } from '@js/common/video-player/emoji-picker/useEmojiData';
import { useSkinTone } from '@js/common/video-player/emoji-picker/useSkinTone';
import { EmojiReactionType } from '@js/common/video-player/emoji-reaction-list/types';
import { getEmojiNameWithSkinTone } from '@js/pages/share/comments/common/grouped-comments/comment-thread/common/getEmojiNameWithSkinTone';
import React, { useState } from 'react';
import { Arrange, Container } from '@loomhq/lens';
import styles from './EmojiReactionSet.module.css';
import { openEmojiReactionAnonModal } from '@js/common/anon-share-gate-helpers';
const reactionsWithSkinTones = ['raised_hands', '+1', '-1'];

function ReactionButton({ reaction, skinTone, onClick, hideLabel }) {
  const { getEmojiUnicodeByName } = useEmojiData();

  let type = reaction.name;
  const label = reaction.label;
  const hotkey = reaction.hotkey;

  // attach skin tone preference to the emojis
  if (reactionsWithSkinTones.includes(type)) {
    type = getEmojiNameWithSkinTone({ type, skinTone });
  }

  const onEmojiClick = () => onClick(type);

  return (
    <PlayerButton
      label={hideLabel ? '' : label}
      shortcut={hotkey}
      size="medium"
      icon={getEmojiUnicodeByName(type)}
      onClick={onEmojiClick}
    />
  );
}

export const EmojiReactionSet = ({
  videoId,
  isLoggedUser,
  isEmbed = false,
  isAnimated = false,
}: {
  videoId: string;
  isLoggedUser: boolean;
  isEmbed?: boolean;
  isAnimated?: boolean;
}): JSX.Element => {
  const [hasEmojiReacted, setHasEmojiReacted] = useState(false);
  const { openModal } = useModals();
  const player = usePlayer(videoId);
  const { skinTone } = useSkinTone();
  const { video } = useVideoContext();
  const videoOwnerName = video?.owner?.displayName
    ? ` ${video.owner.displayName}`
    : '';

  const videoTimestamp = Math.round(player?.currentTime || 0);

  const { emojiReactionList } = useEmojiReactionListStore();

  const handleReactionClick = reaction => {
    if (isEmbed && !isLoggedUser) {
      window.open(
        `${LOOM_URI}/share/${video.modelId}?asg_reaction=true&reaction=${reaction}&video_time_stamp=${videoTimestamp}`,
        '_blank',
        'noopener'
      );

      return;
    }

    const shouldOpenAnonShareGateModal = !isLoggedUser && !hasEmojiReacted;

    if (shouldOpenAnonShareGateModal) {
      setHasEmojiReacted(true);
      openEmojiReactionAnonModal({
        openModal,
        emojiReaction: reaction,
        videoId,
        currentTime: player?.currentTime || 0,
        videoOwnerName: videoOwnerName || '',
      });
    } else {
      player?.submitNewReaction(reaction, VideoPlatform.sharePagePlayer);
    }
  };

  return (
    <div className={styles.endOfVideoNudgeEmojis}>
      <Arrange gap="small" autoFlow="column" htmlTag="ul">
        {emojiReactionList.map((reaction: EmojiReactionType, i: number) => (
          <li
            key={reaction.name}
            className={isAnimated ? styles.animatedEmojiContainer : ''}
            style={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              'animation-delay': `${75 + i * 75}ms`,
            }}
          >
            <Container
              borderSide="all"
              borderColor="grey6"
              radius="full"
              backgroundColor="grey7"
            >
              <ReactionButton
                reaction={reaction}
                onClick={reaction => handleReactionClick(reaction)}
                skinTone={skinTone}
                data-testid={`${reaction}-reaction-button`}
                hideLabel={true}
              />
            </Container>
          </li>
        ))}
      </Arrange>
    </div>
  );
};
