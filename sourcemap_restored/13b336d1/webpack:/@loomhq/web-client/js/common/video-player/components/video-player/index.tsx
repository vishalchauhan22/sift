/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';
import classNames from 'classnames';

import {
  useIsDisabledClickInteractions,
  useIsLoopVideo,
  useIsMutedVideo,
} from '../../context/selectors';

import {
  useFullScreenToggle,
  useNewPlayer,
  useOnPlayToggleCallback,
  useFlipVideo,
  usePlayingStatus,
} from '../../hooks';
import { PlayPauseOverlay } from './play-pause-overlay';
import { useExpAnonSharePageGateRefresh } from '@js/hooks/experiments/useExpAnonSharePageGateRefresh';

import styles from './style.module.css';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';

export const BLACK_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

type VideoProps = { videoId: string } & React.ComponentProps<'video'>;

export const VideoPlayer = ({ videoId, ...props }: VideoProps): JSX.Element => {
  const ref = useNewPlayer(videoId);
  const onPlay = useOnPlayToggleCallback(videoId);
  const { onClick: onToggleFullScreen } = useFullScreenToggle(videoId);
  const disableClick = useIsDisabledClickInteractions();
  // Start:EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE
  const { status } = usePlayingStatus(videoId);
  const isPaused = status === 'paused';
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const {
    isExpAnonSharePageGateRefreshVariant1,
    isExpAnonSharePageGateRefreshVariant2,
    isExpAnonSharePageGateRefreshVariant3,
  } = useExpAnonSharePageGateRefresh();
  // End: EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE
  const isMutedVideo = useIsMutedVideo();
  const isLoopVideo = useIsLoopVideo();
  const flipVideo = useFlipVideo(videoId);

  return (
    <div className={styles.wrapper}>
      <PlayPauseOverlay videoId={videoId} />
      {/* Start: EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE */}
      <div
        className={classNames({
          [styles.onSignedOutPauseOverlay]:
            isPaused && isExpAnonSharePageGateRefreshVariant2 && !isLoggedIn,
          [styles.onSignedOutPauseOverlayLight]:
            isPaused &&
            (isExpAnonSharePageGateRefreshVariant1 ||
              isExpAnonSharePageGateRefreshVariant3) &&
            !isLoggedIn,
        })}
      />
      {/* End: EXP_VISUAL_REFRESH_ON_ANON_SHARE_PAGE_GATE */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        id="LoomShakaVideoPlayer"
        ref={ref}
        playsInline
        tabIndex={-1}
        poster={props.poster || BLACK_IMAGE}
        onClick={!disableClick ? onPlay : undefined}
        onDoubleClick={!disableClick ? onToggleFullScreen : undefined}
        crossOrigin="anonymous"
        controlsList="nodownload"
        className={classNames(styles.video, {
          [styles.videoFlipped]: flipVideo,
        })}
        loop={isLoopVideo}
        muted={isMutedVideo}
        {...props}
      >
        <p>Your user agent does not support the HTML5 Video element.</p>
      </video>
    </div>
  );
};
