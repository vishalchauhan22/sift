/* eslint-disable @loomhq/loom/limit-parent-import-depth */

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

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
} from '../../hooks';
import { PlayPauseOverlay } from './play-pause-overlay';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Video = styled.video<{ flipped?: boolean }>`
  width: 100%;
  height: 100%;
  &::-webkit-media-text-track-display {
    display: none;
  }
  ${props => props.flipped && `transform: scaleX(-1);`}
`;

export const BLACK_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

type VideoProps = { videoId: string } & React.ComponentProps<typeof Video>;

export const VideoPlayer = ({ videoId, ...props }: VideoProps): JSX.Element => {
  const ref = useNewPlayer(videoId);
  const onPlay = useOnPlayToggleCallback(videoId);
  const { onClick: onToggleFullScreen } = useFullScreenToggle(videoId);
  const disableClick = useIsDisabledClickInteractions();

  const isMutedVideo = useIsMutedVideo();
  const isLoopVideo = useIsLoopVideo();
  const flipVideo = useFlipVideo(videoId);

  return (
    <Wrapper>
      <PlayPauseOverlay videoId={videoId} />
      {/* eslint-disable-next-line styled-components-a11y/media-has-caption */}
      <Video
        id="LoomShakaVideoPlayer"
        ref={ref}
        playsInline
        tabIndex={-1}
        poster={props.poster || BLACK_IMAGE}
        onClick={!disableClick ? onPlay : undefined}
        onDoubleClick={!disableClick ? onToggleFullScreen : undefined}
        crossOrigin="anonymous"
        controlsList="nodownload"
        flipped={flipVideo}
        loop={isLoopVideo}
        muted={isMutedVideo}
        {...props}
      >
        <p>Your user agent does not support the HTML5 Video element.</p>
      </Video>
    </Wrapper>
  );
};
