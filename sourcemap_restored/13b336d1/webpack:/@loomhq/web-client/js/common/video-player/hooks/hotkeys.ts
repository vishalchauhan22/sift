import { isKeyboardFocusOnInput } from '@js/common/isKeyboardFocusOnInput';
import { useModals } from '@js/common/modal-container/useModals';
import { useIsEmailGatingIncomplete } from '@js/common/video-player/components/email-gating/useIsEmailGatingIncomplete';
import { useIsVideoEmbedded } from '@js/components/video-player-fresh/hooks';
import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { COMMENT_KEYBOARD_SHORTCUT } from '../common';

import {
  useIsLoggedUser,
  useReactionsEnabled,
  useVideoPlatform,
} from '../context/selectors';
import { useVideoContext } from '../context/provider';
import { useEmojiWithSkinTone } from '../emoji-picker/useEmojiWithSkinTone';
import { useEmojiReactionListStore } from '../emoji-reaction-list';
import { EmojiReactionHotkeysList, hotKeys } from '../hotkeys';
import { useCommentPortal } from '../portal';
import { usePlayer } from './player';
import { useAnonNameRequired } from './ui';
import { useIsWatchLaterEnabled, useToggleWatchLater } from './watchLater';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';
import { openEmojiReactionAnonModal } from '@js/common/anon-share-gate-helpers';

export type UseInstallHotkeysOptions = {
  isActive?: boolean;
  stepIntervalSecondsOnArrowKey?: number;
  stepIntervalSecondsOnShiftArrowKey?: number;
  stepIntervalSecondsOnAngleBracketKey?: number;
};

export function useInstallHotKeys(
  videoId: string,
  {
    isActive = false,
    stepIntervalSecondsOnAngleBracketKey = 1,
    stepIntervalSecondsOnArrowKey = 5,
    stepIntervalSecondsOnShiftArrowKey = 10,
  }: UseInstallHotkeysOptions = {}
): void {
  const player = usePlayer(videoId);
  const { isOpen } = useCommentPortal();
  const { getEmojiNameWithSkinTone } = useEmojiWithSkinTone();
  const isAnonNameRequired = useAnonNameRequired();
  const reactionsEnabled = useReactionsEnabled();
  const isLoggedUser = useIsLoggedUser();
  const videoPlatform = useVideoPlatform();
  const isWatchLaterEnabled = useIsWatchLaterEnabled();
  const toggleWatchLater = useToggleWatchLater(videoId);
  const { openModal } = useModals();
  const { video } = useVideoContext();

  const isEmailGatingIncomplete = useIsEmailGatingIncomplete();

  const { emojiReactionList } = useEmojiReactionListStore();

  const isEmbed = useIsVideoEmbedded();

  React.useEffect(() => {
    if (!player || isEmailGatingIncomplete) {
      return;
    }

    player.media.setAttribute('data-active', isActive ? 'true' : '');
  }, [player, isEmailGatingIncomplete, isActive]);

  React.useEffect(() => {
    if (!player || isEmailGatingIncomplete) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!player.media.getAttribute('data-active')) {
        return;
      }

      const modifierKeysPressed = e.ctrlKey || e.metaKey;
      const focusedOnInput = isKeyboardFocusOnInput();

      if (modifierKeysPressed || focusedOnInput) {
        return;
      }

      if (
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(
          e.code
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (e.code) {
        case 'Space':
          player.togglePlay();
          break;
        case 'ArrowUp':
          player.increaseVolume();
          break;
        case 'ArrowDown':
          player.decreaseVolume();
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            player.forward(stepIntervalSecondsOnShiftArrowKey);
          } else {
            player.forward(stepIntervalSecondsOnArrowKey);
          }

          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            player.backward(stepIntervalSecondsOnShiftArrowKey);
          } else {
            player.backward(stepIntervalSecondsOnArrowKey);
          }

          break;
        default:
          break;
      }

      switch (e.key) {
        case hotKeys.play.key:
          player.togglePlay();
          break;
        case hotKeys.stepBackward.key:
          if (e.shiftKey) {
            player.backward(stepIntervalSecondsOnShiftArrowKey);
          } else {
            player.backward(stepIntervalSecondsOnArrowKey);
          }
          break;
        case hotKeys.stepForward.key:
          if (e.shiftKey) {
            player.forward(stepIntervalSecondsOnShiftArrowKey);
          } else {
            player.forward(stepIntervalSecondsOnArrowKey);
          }
          break;
        case hotKeys.decrementBackward.key:
          player.backward(stepIntervalSecondsOnAngleBracketKey);
          break;
        case hotKeys.incrementForward.key:
          player.forward(stepIntervalSecondsOnAngleBracketKey);
          break;
        case hotKeys.mute.key:
          player.toggleMute();
          break;
        case hotKeys.speed.key:
          player.toggleRate();
          player.rateChangeClicked();
          break;
        case hotKeys.fullscreen.key:
          player.toggleFullscreen();
          break;
        case hotKeys.closeCaptions.key:
          player.toggleClosedCaptions();
          break;
        case hotKeys.theater.key:
          player.toggleTheaterMode();
          break;
        case hotKeys.pip.key:
          player.togglePictureInPicture();
          break;
        case hotKeys.toggleComments.key:
          analytics.track(
            COMMENT_KEYBOARD_SHORTCUT,
            withIdentifiers(
              COMMENT_KEYBOARD_SHORTCUT,
              AnalyticsEntityId.video(videoId, 'videoId')
            )
          );

          e.preventDefault();

          player.commentFormToggle(!isOpen);
          break;
        case hotKeys.toggleWatchLater.key:
          if (isWatchLaterEnabled) {
            toggleWatchLater();
          }

          break;
        default:
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!player.media.getAttribute('data-active')) {
        return;
      }

      const modifierKeysPressed = e.ctrlKey || e.metaKey;
      const focusedOnInput = isKeyboardFocusOnInput();

      if (modifierKeysPressed || focusedOnInput) {
        return;
      }

      if (reactionsEnabled && EmojiReactionHotkeysList.includes(e.key)) {
        const name = getEmojiNameWithSkinTone(
          emojiReactionList[Number(e.key) - 1]?.name
        );

        if (!name) {
          return;
        }

        const isSalesTargetedVideo =
          video.salesforceEngagementTracking ||
          video.emailGateVideoType !== EmailGatingSetting.None;

        if (isAnonNameRequired && !isSalesTargetedVideo) {
          player.pause();

          openEmojiReactionAnonModal({
            openModal,
            emojiReaction: name,
            videoId,
            currentTime: player?.currentTime || 0,
            videoOwnerName: '', // Add if available
          });
        } else {
          player.submitNewReaction(name, videoPlatform);
        }
      }

      switch (e.key) {
        case hotKeys.toggleReactionPicker.key:
          if (reactionsEnabled) {
            player.toggleReactionPicker();
          }

          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [
    player,
    videoId,
    isOpen,
    getEmojiNameWithSkinTone,
    isAnonNameRequired,
    reactionsEnabled,
    isLoggedUser,
    videoPlatform,
    emojiReactionList,
    isWatchLaterEnabled,
    toggleWatchLater,
    isEmailGatingIncomplete,
    isEmbed,
    stepIntervalSecondsOnArrowKey,
    stepIntervalSecondsOnShiftArrowKey,
    stepIntervalSecondsOnAngleBracketKey,
    openModal,
    video.salesforceEngagementTracking,
    video.emailGateVideoType,
  ]);
}
