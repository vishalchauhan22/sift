/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { u } from '@loomhq/lens';
import { SvgSmileSelect } from '@loomhq/lens/icons/smile-select';

import { track, VideoPlatform } from '../..';
import { Events } from '../../api/analytics';
import { useReactionsPopover, useHandleReaction } from '../../hooks';
import { hotKeys } from '../../hotkeys';

import { useViewportContext } from '../../viewportContext';
import { PlayerButton } from './player-button';
import { SettingsPopover } from './settings-popover';

const EmojiPicker = reactLazyRetry(() =>
  import(/* webpackChunkName: "emoji-picker" */ '../../emoji-picker').then(
    module => ({
      default: module.EmojiPicker,
    })
  )
);

const PICKER_CLOSE_DELAY_MS = 700;

const EmojiPickerContainer = styled.div<{ height: number; width: number }>`
  height: min(
    ${u(34)},
    calc(
      ${props => props.height}px - var(--lvp-playBar-height) - var(
          --lns-space-medium
        )
    )
  );
  width: min(
    ${u(44)},
    calc(${props => props.width}px - var(--lns-space-small))
  );
`;

const EmojiPickerWrapper: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { height, width } = useViewportContext();

  return (
    <EmojiPickerContainer width={width} height={height}>
      {children}
    </EmojiPickerContainer>
  );
};

// eslint-disable-next-line  react/display-name
export const ReactionsPopover = React.memo(
  ({ videoId }: { videoId: string }) => {
    const [reactionPickerPopupOpen, onReactionKey, reactionPickerPopupRef] =
      useReactionsPopover({ videoId, disabled: false });
    const onEmojiClick = useHandleReaction();

    const timeoutRef = React.useRef<number>();

    const onExtendedReactionButtonClicked = () => {
      onReactionKey();

      if (!reactionPickerPopupOpen) {
        track({
          event: Events.EXTENDED_REACTION_BUTTON_CLICKED,
          payload: {
            video_id: videoId,
          },
        });
      }
    };

    const onExtendedReactionClick = (name: string) => {
      // handle emoji submission and track event
      onEmojiClick(name);

      // handle reset timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // handle init timeout and close picker
      timeoutRef.current = window.setTimeout(() => {
        onReactionKey();
      }, PICKER_CLOSE_DELAY_MS);
    };

    return (
      <div ref={reactionPickerPopupRef}>
        <SettingsPopover
          zIndex={400}
          isOpen={reactionPickerPopupOpen}
          content={
            <React.Suspense fallback={null}>
              <EmojiPickerWrapper>
                <EmojiPicker
                  onClick={onExtendedReactionClick}
                  videoId={videoId}
                  placeUsed={VideoPlatform.embedPlayer}
                  isOpen={reactionPickerPopupOpen}
                />
              </EmojiPickerWrapper>
            </React.Suspense>
          }
          paddingTop="0"
          paddingBottom="0"
          paddingLeft="0"
          paddingRight="0"
        >
          <PlayerButton
            key={reactionPickerPopupOpen ? 'o' : 'c'}
            label={reactionPickerPopupOpen ? '' : 'More reactions'}
            shortcut={hotKeys.toggleReactionPicker.label}
            icon={<SvgSmileSelect />}
            onClick={onExtendedReactionButtonClicked}
          />
        </SettingsPopover>
      </div>
    );
  }
);
