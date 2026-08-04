/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { SHOW_CAPTIONS } from '@js/constants/localStorage';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

import { Arrange, Logo, u } from '@loomhq/lens';
import { SvgApple } from '@loomhq/lens/icons/apple';
import { SvgBack5 } from '@loomhq/lens/icons/back5';
import { SvgCCOff } from '@loomhq/lens/icons/cc-off';
import { SvgCCOn } from '@loomhq/lens/icons/cc-on';
import { SvgComment } from '@loomhq/lens/icons/comment';
import { SvgCrop169 } from '@loomhq/lens/icons/crop-16-9';
import { SvgForward5 } from '@loomhq/lens/icons/forward5';
import { SvgMaximize } from '@loomhq/lens/icons/maximize';
import { SvgMinimize } from '@loomhq/lens/icons/minimize';
import { SvgPause } from '@loomhq/lens/icons/pause';
import { SvgPictureInPicture } from '@loomhq/lens/icons/picture-in-picture';
import { SvgPlay } from '@loomhq/lens/icons/play';
import { SvgReplay } from '@loomhq/lens/icons/replay';
import { SvgSmile } from '@loomhq/lens/icons/smile';

import { setLocalStorageKey } from '@js/utilities/localStorage';

import { useCommentsEnabled, useReactionsEnabled } from '../..';
import { useDisplayTimeOverride, useModelId } from '../../context';
import {
  useCurrentTime,
  useFullScreenToggle,
  usePictureInPicture,
  usePlayer,
  usePlayingStatus,
  useTheaterMode,
  useToggleCaptions,
  usePopoverHandler,
} from '../../hooks';
import { hotKeys } from '../../hotkeys';

import { formatTime } from '../../utils';
import { useViewportContext } from '../../viewportContext';
import { EmojiReactionGroup } from '../emoji-reaction-group';
import { Show } from '../show';

import { ReactionsPopover } from './emoji-picker';
import { PlayerButton } from './player-button';
import { PlayerButtonTooltip } from './player-button/player-button-tooltip';
import { SettingsPopover } from './settings-popover';
import { useTranscript } from '@js/common/transcripts';

const statusToButtonMap: Record<
  string,
  { label: string; shortcut: string; icon: React.ReactNode }
> = {
  playing: {
    label: `Pause`,
    shortcut: hotKeys.play.label,
    icon: <SvgPause />,
  },
  paused: {
    label: `Play`,
    shortcut: hotKeys.play.label,
    icon: <SvgPlay />,
  },
  ended: {
    label: `Watch again`,
    shortcut: hotKeys.play.label,
    icon: <SvgReplay />,
  },
};

export const useButtonsGap = (): 'small' | 'xsmall' => {
  const { width } = useViewportContext();
  const buttonsGap = width > 650 ? 'small' : 'xsmall';

  return buttonsGap;
};

export const PlayPauseButton = ({
  videoId,
  backgroundColor,
}: {
  videoId: string;
  backgroundColor?: string;
}): JSX.Element => {
  const { status, onPlay } = usePlayingStatus(videoId);
  const item = statusToButtonMap[status as string];

  return (
    <PlayerButton
      label={item.label}
      shortcut={item.shortcut}
      icon={item.icon}
      onClick={onPlay}
      backgroundColor={backgroundColor}
      data-name="PlayPauseButton"
    />
  );
};

export const StepButtons = ({ videoId }: { videoId: string }): JSX.Element => {
  const player = usePlayer(videoId);
  const { currentTime, duration } = useCurrentTime(videoId);
  const buttonsGap = useButtonsGap();
  const onStepForward = (step = 5) => {
    if (!player) {
      return;
    }

    player.forward(step);
  };

  const onStepBack = (step = 5) => {
    if (!player) {
      return;
    }

    player.backward(step);
  };

  const margin = 0.01;
  const isAtStart = currentTime <= margin;
  const isAtEnd = duration > 0 && currentTime >= Math.max(0, duration - margin);

  return (
    <Arrange gap={buttonsGap}>
      <PlayerButton
        label="Step Back"
        shortcut={hotKeys.stepBackward.label}
        icon={<SvgBack5 />}
        onClick={() => onStepBack()}
        data-name="StepBackBtn"
        isDisabled={isAtStart}
      />

      <PlayerButton
        label="Step Forward"
        shortcut={hotKeys.stepForward.label}
        icon={<SvgForward5 />}
        onClick={() => onStepForward()}
        data-name="StepForwardBtn"
        isDisabled={isAtEnd}
      />
    </Arrange>
  );
};

export const PlayTimeText = styled.span`
  color: var(--lns-color-body);
  font-feature-settings: 'tnum';
  white-space: nowrap;
`;

export const PlayTimeCurrent = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { currentTime } = useCurrentTime(videoId);
  const displayTimeOverride = useDisplayTimeOverride();

  const currentToUse = displayTimeOverride
    ? displayTimeOverride.currentTime
    : currentTime;

  return <PlayTimeText>{formatTime(currentToUse)}</PlayTimeText>;
};

export const PlayTimeDuration = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  const { duration } = useCurrentTime(videoId);
  const displayTimeOverride = useDisplayTimeOverride();

  const durationToUse = displayTimeOverride
    ? displayTimeOverride.duration
    : duration;

  return (
    <PlayTimeText>
      {' / '} {formatTime(durationToUse)}
    </PlayTimeText>
  );
};

export const FullScreenBtn = ({
  videoId,
  isDisabled,
  backgroundColor,
}: {
  videoId: string;
  isDisabled?: boolean;
  backgroundColor?: string;
}): JSX.Element | null => {
  const { onClick, isEnabled } = useFullScreenToggle(videoId);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div data-hide-ifnot-fullscreen>
        <PlayerButton
          label="Exit Full Screen"
          shortcut={hotKeys.fullscreen.label}
          icon={<SvgMinimize />}
          data-name="FullScreenBtn"
          onClick={onClick}
          isDisabled={isDisabled}
          backgroundColor={backgroundColor}
        />
      </div>
      <div data-hide-if-fullscreen>
        <PlayerButton
          label="Enter Full Screen"
          shortcut={hotKeys.fullscreen.label}
          icon={<SvgMaximize />}
          data-name="FullScreenBtn"
          onClick={onClick}
          isDisabled={isDisabled}
          backgroundColor={backgroundColor}
        />
      </div>
    </>
  );
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const PiPBtn = ({
  videoId,
  isDisabled,
}: {
  videoId: string;
  isDisabled?: boolean;
}): JSX.Element | null => {
  const { onClick, isEnabled } = usePictureInPicture(videoId);

  if (!isEnabled) {
    return null;
  }

  return (
    <PlayerButton
      label="Toggle PIP"
      shortcut={hotKeys.pip.label}
      icon={<SvgPictureInPicture />}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
};

export const LogoButtonWrapper = styled.div<{
  isCollapsed: boolean;
}>`
  height: ${u(4)};
  ${props => `width: ${props.isCollapsed ? u(2.6) : u(8.2)}`};
  ${props => props.isCollapsed && `margin-left: var(--lns-space-xsmall);`};
  margin-right: var(--lns-space-small);
  margin-top: ${u(1.5)};
  cursor: pointer;
`;

export const LogoBtn = ({
  isCollapsed,
}: {
  isCollapsed: boolean;
}): JSX.Element => {
  const modelId = useModelId();

  return (
    <LogoButtonWrapper isCollapsed={isCollapsed}>
      <PlayerButtonTooltip label="Watch on Loom.com">
        <Logo
          variant={isCollapsed ? 'symbol' : 'combined'}
          onClick={() => {
            window.open(
              `/share/${modelId}?playbar_logo_cta=true`,
              '_blank',
              'noopener'
            );
          }}
        />
      </PlayerButtonTooltip>
    </LogoButtonWrapper>
  );
};

// this toggle is handled by a .theaterMode class present somewhere in the tree
export const TheaterModeBtn = ({
  videoId,
  isDisabled,
}: {
  videoId: string;
  isDisabled?: boolean;
}): JSX.Element => {
  const onClick = useTheaterMode(videoId);

  return (
    <>
      <div data-hide-ifnot-theater>
        <PlayerButton
          label="Default Mode"
          shortcut={hotKeys.theater.label}
          onClick={onClick}
          icon={<SvgCrop169 />}
          isDisabled={isDisabled}
        />
      </div>
      <div data-hide-if-theater>
        <PlayerButton
          label="Theatre Mode"
          shortcut={hotKeys.theater.label}
          onClick={onClick}
          isDisabled={isDisabled}
          icon={<SvgCrop169 />}
        />
      </div>
    </>
  );
};

export const AirPlayBtn = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  return <PlayerButton label="Airplay" onClick={onClick} icon={<SvgApple />} />;
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const CCButton = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element | null => {
  const { onToggle, captionsActive } = useToggleCaptions(videoId);
  const onOrOff = captionsActive ? 'off' : 'on';

  const { captionsUrl: url, isCaptionsTranslationInProgress } = useTranscript();

  if (!url && !isCaptionsTranslationInProgress) {
    return null;
  }

  return (
    <PlayerButton
      label={`Turn ${onOrOff} closed captions`}
      shortcut={hotKeys.closeCaptions.label}
      icon={captionsActive ? <SvgCCOn /> : <SvgCCOff />}
      onClick={() => {
        onToggle();
        setLocalStorageKey(SHOW_CAPTIONS, !captionsActive);
      }}
      data-name="CloseCaptionsBtn"
    />
  );
};

export const ReactionBtns = ({
  videoId,
  ...props
}: {
  videoId: string;
}): JSX.Element => {
  const { width } = useViewportContext();
  const [reactionsPopupOpen, setReactionsPopupOpen, reactionsPopupRef] =
    usePopoverHandler();

  const commentsEnabled = useCommentsEnabled();
  const reactionsEnabled = useReactionsEnabled();

  const expandedReactionsBreakpoint = 400;
  const showCompactReactions = width <= expandedReactionsBreakpoint;
  const showExpandedReactions = width > expandedReactionsBreakpoint;

  const handleReactionGroupClick = () => {
    setReactionsPopupOpen(false);
  };

  const player = usePlayer(videoId);
  const setCommentFormIsOpen = (flag: boolean) => {
    if (!player) {
      return;
    }

    player.commentFormToggle(flag);
  };

  return (
    <Show afterWidth={310}>
      <Arrange {...props} htmlTag="ul">
        {reactionsEnabled && (
          <>
            {showExpandedReactions && (
              <li>
                <EmojiReactionGroup onClick={handleReactionGroupClick} />
              </li>
            )}

            {showCompactReactions && (
              <li ref={reactionsPopupRef}>
                <SettingsPopover
                  isOpen={reactionsPopupOpen}
                  content={
                    <EmojiReactionGroup onClick={handleReactionGroupClick} />
                  }
                >
                  <PlayerButton
                    label={reactionsPopupOpen ? '' : 'Reactions'}
                    icon={<SvgSmile />}
                    onClick={() => setReactionsPopupOpen(!reactionsPopupOpen)}
                  />
                </SettingsPopover>
              </li>
            )}
          </>
        )}

        {reactionsEnabled && <ReactionsPopover videoId={videoId} />}

        {commentsEnabled && (
          <li>
            <PlayerButton
              label="Comment"
              shortcut={hotKeys.toggleComments.label}
              icon={<SvgComment />}
              onClick={() => setCommentFormIsOpen(true)}
              data-name="CreateCommentButton"
            />
          </li>
        )}
      </Arrange>
    </Show>
  );
};
