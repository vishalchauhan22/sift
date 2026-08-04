import { keyframes } from '@emotion/react';
// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React, { useRef } from 'react';

import { useHideBackgroundPreview, Video as VideoType } from '../context';
import { usePrefersReducedMotion } from '../hooks';
import { zIndexes } from '../utils';
import { BLACK_IMAGE } from './video-player';
import { MeetingInProgressBackground } from '../../meeting-recordings';
import { SuccessMarker, useMarkRUMSuccess } from '@js/utilities/rum/markers';
import { SuccessMarkers } from '@js/utilities/rum/constants';
import { useUnmount } from '@js/hooks/useUnmount';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Wrapper = styled.div<{ flipped?: boolean }>`
  max-width: 100%;
  height: 100%;
  z-index: ${zIndexes.posterVideo};
  align-items: stretch;
  grid-template-rows: minmax(0, 1fr);
  overflow: hidden;
  display: grid;
  animation: ${fadeIn} 0.3s forwards;

  img,
  video {
    height: 100%;
  }

  ${props => props.flipped && `transform: scaleX(-1);`}
`;

const Image = styled.img`
  width: 100%;
  animation: ${fadeIn} 0.3s forwards;
  max-height: 100%;
  z-index: ${zIndexes.posterVideo};
  display: block;
  object-fit: contain;
`;

const DefaultBlackBackground = styled.div`
  width: 100%;
  z-index: ${zIndexes.posterVideo};
  display: block;
  background-color: black;
`;

const Video = Image.withComponent('video');

export const PosterVideo = ({
  video,
  thumbnails,
}: {
  video: VideoType;
  thumbnails: VideoType['thumbnails'];
}): JSX.Element => {
  const hasPreview = Boolean(thumbnails.previewFullUrl);
  const hasDefault = Boolean(thumbnails.defaultFullUrl);
  const isDefaultStatic = Boolean(
    thumbnails.defaultFullUrl === thumbnails.staticFullUrl
  );
  const reducedMotion = usePrefersReducedMotion();
  const hideBackgroundPreview = useHideBackgroundPreview();
  const hasMarkedSuccess = useRef<boolean>(false);
  const markSuccess = useMarkRUMSuccess();

  const onError: React.ReactEventHandler<HTMLImageElement> = e => {
    (e.target as HTMLImageElement).src = BLACK_IMAGE;
  };

  const markThumbnailLoaded = () => {
    if (!hasMarkedSuccess.current) {
      markSuccess(SuccessMarkers.ThumbnailLoaded);
      hasMarkedSuccess.current = true;
    }
  };

  useUnmount(markThumbnailLoaded);

  const isMeeting = video?.videoProperties?.recordingClient === 'meeting_bot';
  const isVideoComplete = video.complete;
  const hasPlayableDuration = Boolean(
    video?.videoProperties?.playableDuration &&
      video?.videoProperties?.playableDuration > 0
  );
  const isMeetingComplete =
    isMeeting && (isVideoComplete || hasPlayableDuration);

  return (
    <Wrapper flipped={video.flipThumbnail}>
      {isMeeting && !isMeetingComplete ? (
        <>
          <SuccessMarker name={SuccessMarkers.ThumbnailLoaded} />
          <MeetingInProgressBackground />
        </>
      ) : (isDefaultStatic && hasDefault) || hideBackgroundPreview ? (
        <>
          <Image
            src={
              hideBackgroundPreview
                ? thumbnails.staticFullUrl
                : thumbnails.defaultFullUrl
            }
            alt=""
            onError={onError}
            onLoad={markThumbnailLoaded}
          />
        </>
      ) : hasPreview ? (
        <Video
          src={thumbnails.previewFullUrl}
          playsInline
          loop
          muted
          autoPlay={!reducedMotion}
          poster={thumbnails.staticFullUrl}
          onCanPlay={markThumbnailLoaded}
        />
      ) : hasDefault ? (
        <Image
          src={thumbnails.defaultFullUrl}
          alt=""
          onError={onError}
          onLoad={markThumbnailLoaded}
        />
      ) : (
        <>
          <SuccessMarker name={SuccessMarkers.ThumbnailLoaded} />
          <DefaultBlackBackground />
        </>
      )}
    </Wrapper>
  );
};
