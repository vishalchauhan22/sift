/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import React from 'react';

import { Arrange, Align, Container, Spacer, Text, u } from '@loomhq/lens';

import {
  useVideoContext,
  useHandleCommentFormOpen,
  useCommentsEnabled,
  useReactionsEnabled,
  PlaybarTypes,
  useEnforcedPlaybar,
  isMarketingLoom,
} from '../..';
import {
  useFullScreenToggle,
  usePlayingStatus,
  useQualitySelector,
  useSettingsSelector,
  useShowCollapsedSettings,
} from '../../hooks';
import { useObserveElementSize } from '../../hooks/ui';
import { useIsWatchLaterEnabled } from '../../hooks/watchLater';
import { useCommentPortal } from '../../portal/commentPortalProvider';

import { zIndexes } from '../../utils';
import { colors, playBarHeight } from '../../variables';
import { Show } from '../show';
import { WatchLaterButtonInPlayBar } from '../watch-later-button';
import { AnonNameInput, useShowAnonNameField } from './anon-name-input';
import {
  FullScreenBtn,
  PiPBtn,
  PlayPauseButton,
  ReactionBtns,
  StepButtons,
  TheaterModeBtn,
  CCButton,
  PlayTimeText,
  PlayTimeDuration,
  PlayTimeCurrent,
  useButtonsGap,
} from './buttons';
import { CommentFormInput } from './comment-form';
import { QualityButton } from './quality-button';
import { SettingsButton } from './settings-button';
import { SettingsMenu } from './settings-menu/settings-menu';
import { SpeedButton } from './speed-button';
import { VolumeBtn } from './volume-button';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const playBarXPadding = u(1);

const PlayBarWrapper = styled.div<{ commentformIsOpen: boolean }>`
  z-index: ${zIndexes.playerBackdrop};
  padding: 0 ${playBarXPadding};
  min-height: ${playBarHeight};
  display: grid;
  align-items: center;
  ${props =>
    props.commentformIsOpen && `background-color: ${colors.videoOverlaySoft}`};
`;

const PlaybackComponents = ({
  videoId,
  showCollapsedSettings,
  ...props
}: {
  videoId: string;
  showCollapsedSettings: boolean;
}) => {
  const buttonsGap = useButtonsGap();

  return (
    <Arrange gap={buttonsGap} {...props}>
      <PlayPauseButton videoId={videoId} />
      {!showCollapsedSettings && <StepButtons videoId={videoId} />}
      <VolumeBtn videoId={videoId} />
    </Arrange>
  );
};

const PlaybackAndTimeComponents = ({
  videoId,
  showStepButtons,
  ...props
}: {
  showStepButtons: boolean;
  videoId: string;
}) => {
  const buttonsGap = useButtonsGap();
  const showPlayTime = 730;
  const showDurationAfter = 850;

  return (
    <Arrange gap={buttonsGap} {...props}>
      <PlayPauseButton videoId={videoId} />
      {!showStepButtons && <StepButtons videoId={videoId} />}

      <VolumeBtn videoId={videoId} />
      <Show afterWidth={showPlayTime}>
        <Spacer left="small">
          <PlayTimeText>
            <PlayTimeCurrent videoId={videoId} />
            <Show afterWidth={showDurationAfter}>
              <PlayTimeDuration videoId={videoId} />
            </Show>
          </PlayTimeText>
        </Spacer>
      </Show>
    </Arrange>
  );
};

const PlayBarContent = ({ videoId }: { videoId: string }) => {
  const buttonsGap = useButtonsGap();
  const isWatchLaterEnabled = useIsWatchLaterEnabled();
  const { shouldDisplaySettingsSelector } = useSettingsSelector(videoId);
  const { showCollapsedSettings } = useShowCollapsedSettings(videoId);
  const showPlayTimeAfter = 350;
  const rolloutTranslateCaptions = useFlagIsActivated({
    flag: FEATURE_GATES.ROLLOUT_TRANSLATE_CAPTIONS,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  let settingsBlock: JSX.Element | null = null;
  if (shouldDisplaySettingsSelector && rolloutTranslateCaptions !== undefined) {
    settingsBlock = rolloutTranslateCaptions ? (
      <SettingsMenu
        videoId={videoId}
        rolloutTranslateCaptions={rolloutTranslateCaptions}
      />
    ) : (
      <SettingsButton videoId={videoId} />
    );
  }

  return (
    <Arrange columns={['1fr', 'auto', '1fr']}>
      <PlaybackAndTimeComponents
        showStepButtons={showCollapsedSettings}
        data-hide-ifnot-fullscreen
        videoId={videoId}
      />
      <PlaybackComponents
        showCollapsedSettings={showCollapsedSettings}
        data-hide-if-fullscreen
        videoId={videoId}
      />

      <Align>
        <ReactionBtns data-hide-ifnot-fullscreen videoId={videoId} />
        <Show afterWidth={showPlayTimeAfter}>
          <Container paddingX="medium" data-hide-if-fullscreen>
            <PlayTimeText>
              <PlayTimeCurrent videoId={videoId} />
              <PlayTimeDuration videoId={videoId} />
            </PlayTimeText>
          </Container>
        </Show>
      </Align>

      <Arrange gap={buttonsGap} justifyContent="end">
        {showCollapsedSettings ? (
          <SettingsMenu
            videoId={videoId}
            rolloutTranslateCaptions={rolloutTranslateCaptions}
          />
        ) : (
          <>
            {isWatchLaterEnabled && (
              <WatchLaterButtonInPlayBar videoId={videoId} />
            )}
            <CCButton videoId={videoId} />
            <SpeedButton
              videoId={videoId}
              rolloutTranslateCaptions={rolloutTranslateCaptions}
            />
            {settingsBlock}
            <div data-hide-if-fullscreen>
              <TheaterModeBtn videoId={videoId} />
            </div>
            <PiPBtn videoId={videoId} />
          </>
        )}

        <FullScreenBtn videoId={videoId} />
      </Arrange>
    </Arrange>
  );
};

const PlayBarContentEmbed = ({ videoId }: { videoId: string }) => {
  const buttonsGap = useButtonsGap();
  const { status } = usePlayingStatus(videoId);
  const isEnded = status === 'ended';
  const commentsEnabled = useCommentsEnabled();
  const reactionsEnabled = useReactionsEnabled();
  const { isFullScreen } = useFullScreenToggle(videoId);
  const commentsOrReactions = commentsEnabled || reactionsEnabled;
  const { shouldDisplaySettingsSelector } = useSettingsSelector(videoId);
  const rolloutTranslateCaptions = useFlagIsActivated({
    flag: FEATURE_GATES.ROLLOUT_TRANSLATE_CAPTIONS,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  const ccAndSpeedButtons =
    rolloutTranslateCaptions === false ? (
      <>
        <CCButton videoId={videoId} />
        <SpeedButton videoId={videoId} />
      </>
    ) : null;

  let settingsBlock: JSX.Element | null = null;
  if (shouldDisplaySettingsSelector && rolloutTranslateCaptions !== undefined) {
    settingsBlock = rolloutTranslateCaptions ? (
      <SettingsMenu
        videoId={videoId}
        rolloutTranslateCaptions={rolloutTranslateCaptions}
      />
    ) : (
      <SettingsButton videoId={videoId} />
    );
  }

  const { showCollapsedSettings } = useShowCollapsedSettings(videoId);

  if (isEnded && commentsOrReactions) {
    return <ReplySection isFullScreen={isFullScreen} />;
  }

  return (
    <Arrange columns={['1fr', 'auto', '1fr']}>
      <PlaybackAndTimeComponents
        showStepButtons={showCollapsedSettings}
        videoId={videoId}
      />

      <Align>
        <ReactionBtns videoId={videoId} />
      </Align>

      <Arrange gap={buttonsGap} justifyContent="end">
        {showCollapsedSettings ? (
          <SettingsMenu
            videoId={videoId}
            rolloutTranslateCaptions={rolloutTranslateCaptions}
          />
        ) : (
          <>
            {ccAndSpeedButtons}
            {settingsBlock}
            <PiPBtn videoId={videoId} />
          </>
        )}
        <FullScreenBtn videoId={videoId} />
      </Arrange>
    </Arrange>
  );
};

export const MinimalPlayBarContentEmbed = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element => {
  return (
    <Container className="flex justify:spaceBetween px:large mb:xlarge">
      <Arrange gap="small">
        <PlayPauseButton videoId={videoId} backgroundColor="background" />
        <VolumeBtn videoId={videoId} isMinimal />
      </Arrange>
      <FullScreenBtn videoId={videoId} backgroundColor="background" />
    </Container>
  );
};

const PlayBarContentTrim = ({ videoId }: { videoId: string }) => {
  const buttonsGap = useButtonsGap();
  const { shouldDisplayQualitySelector } = useQualitySelector(videoId);

  return (
    <Arrange columns={['1fr', 'auto', '1fr']}>
      <PlaybackComponents showCollapsedSettings={false} videoId={videoId} />

      <Align>
        <Container paddingX="medium" data-hide-if-fullscreen>
          <PlayTimeText>
            <PlayTimeCurrent videoId={videoId} />
            <PlayTimeDuration videoId={videoId} />
          </PlayTimeText>
        </Container>
      </Align>

      <Arrange gap={buttonsGap} justifyContent="end">
        <SpeedButton videoId={videoId} />
        {shouldDisplayQualitySelector && <QualityButton videoId={videoId} />}
        <TheaterModeBtn videoId={videoId} isDisabled />
        <PiPBtn videoId={videoId} isDisabled />
        <FullScreenBtn videoId={videoId} isDisabled />
      </Arrange>
    </Arrange>
  );
};

export const PlayBar = ({
  type = PlaybarTypes.Default,
  videoId,
}: {
  type?: PlaybarTypes;
  videoId: string;
}): JSX.Element => {
  const enforcedPlaybar = useEnforcedPlaybar();
  const selectedPlaybar = enforcedPlaybar || type;

  switch (selectedPlaybar) {
    case PlaybarTypes.Embed:
      return <EmbedPlayBar videoId={videoId} />;
    default:
      return <DefaultPlayBar videoId={videoId} />;
  }
};

export const DefaultPlayBar = React.memo(({ videoId }: { videoId: string }) => {
  useHandleCommentFormOpen();
  const { isOpen } = useCommentPortal();
  const ref = useObserveElementSize('playBar');
  const { showAnonNameField, anonReactionCreatedType } = useShowAnonNameField();

  const isLoggedIn = useIsCurrentUserLoggedIn();

  const hideCommentInputForAnonMarketingLoom =
    !isLoggedIn && isMarketingLoom(videoId);

  const showCommentForm =
    !showAnonNameField && isOpen && !hideCommentInputForAnonMarketingLoom;
  const showPlayBarContent =
    !showAnonNameField && (!isOpen || hideCommentInputForAnonMarketingLoom);

  return (
    <PlayBarWrapper
      ref={ref}
      commentformIsOpen={!hideCommentInputForAnonMarketingLoom && isOpen}
    >
      {showAnonNameField && (
        <AnonNameInput anonReactionCreatedType={anonReactionCreatedType} />
      )}
      {showCommentForm && <CommentFormInput videoId={videoId} />}
      {showPlayBarContent && <PlayBarContent videoId={videoId} />}
    </PlayBarWrapper>
  );
});

DefaultPlayBar.displayName = 'DefaultPlayBar';

export const EmbedPlayBar = React.memo(({ videoId }: { videoId: string }) => {
  useHandleCommentFormOpen();
  const { isOpen } = useCommentPortal();
  const ref = useObserveElementSize('playBar');
  const { showAnonNameField, anonReactionCreatedType } = useShowAnonNameField();

  return (
    <PlayBarWrapper ref={ref} commentformIsOpen={isOpen}>
      {showAnonNameField && (
        <AnonNameInput anonReactionCreatedType={anonReactionCreatedType} />
      )}
      {!showAnonNameField && isOpen && <CommentFormInput videoId={videoId} />}
      {!showAnonNameField && !isOpen && (
        <PlayBarContentEmbed videoId={videoId} />
      )}
    </PlayBarWrapper>
  );
});

EmbedPlayBar.displayName = 'EmbedPlayBar';

export const TrimPlayBar = React.memo(({ videoId }: { videoId: string }) => {
  const ref = useObserveElementSize('playBar');

  return (
    <PlayBarWrapper ref={ref} commentformIsOpen={false}>
      <PlayBarContentTrim videoId={videoId} />
    </PlayBarWrapper>
  );
});

TrimPlayBar.displayName = 'TrimPlayBar';

const ReplySection = ({ isFullScreen }: { isFullScreen: boolean }) => {
  const { video } = useVideoContext();

  return (
    <>
      <Arrange justifyContent="center">
        <Show afterWidth={300}>
          <Text hasEllipsis fontWeight="bold">
            <Container htmlTag="span" paddingLeft="small" paddingRight="xsmall">
              Reply to {video.owner.displayName}:
            </Container>
          </Text>
        </Show>
        <ReactionBtns videoId={video.id} />
      </Arrange>
      {isFullScreen && (
        <Container right={playBarXPadding} position="absolute">
          <FullScreenBtn videoId={video.id} />
        </Container>
      )}
    </>
  );
};
