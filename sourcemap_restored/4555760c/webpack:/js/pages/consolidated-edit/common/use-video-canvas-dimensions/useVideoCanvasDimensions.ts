import { usePlayer, useVideoContext } from '@js/common/video-player';
import { useEffect, useMemo, useState } from 'react';

import {
  getClipDimensionsAtTime,
  ClipDimensions,
  useClipsDimensions,
} from '..';

type VideoCanvasDimensions = {
  canvasHeight: number;
  canvasWidth: number;
  leftLetterBoxWidth: number;
  topLetterBoxHeight: number;
  currentClipToCanvasScale: number;
};

const calculateVideoCanvasDimensions = ({
  playerElementWidth,
  playerElementHeight,
  currentClipDimensions,
}: {
  playerElementWidth: number;
  playerElementHeight: number;
  currentClipDimensions: ClipDimensions;
}) => {
  // Ratio of the video's intrisic dimensions
  const clipAspectRatio =
    currentClipDimensions.width / currentClipDimensions.height;

  // The ratio of the element's width to its height
  const elementAspectRatio = playerElementWidth / playerElementHeight;

  let canvasWidth = 0;
  let canvasHeight = 0;

  // Calculate the actual width and height of the video's content (i.e adjust to
  // exclude the black bars)
  if (elementAspectRatio > clipAspectRatio) {
    canvasWidth = playerElementHeight * clipAspectRatio;
    canvasHeight = playerElementHeight;
  } else {
    canvasHeight = playerElementWidth / clipAspectRatio;
    canvasWidth = playerElementWidth;
  }

  // Calculate the position of the video within the bounding rectangle
  const leftLetterBoxWidth = (playerElementWidth - canvasWidth) / 2;
  const topLetterBoxHeight = (playerElementHeight - canvasHeight) / 2;

  const currentClipToCanvasScale = canvasWidth / currentClipDimensions.width;

  return {
    canvasHeight,
    canvasWidth,
    topLetterBoxHeight,
    leftLetterBoxWidth,
    currentClipToCanvasScale,
  };
};

type UseVideoCanvasDimensionsResult = VideoCanvasDimensions & {
  currentClipDimensions: ClipDimensions | null;
  clipsDimensions: ClipDimensions[];
};

type UseVideoCanvasDimensionsArgs = {
  videoId: string;
  currentPlayTimeMs: number;
};

export const useVideoCanvasDimensions = ({
  videoId,
  currentPlayTimeMs,
}: UseVideoCanvasDimensionsArgs): UseVideoCanvasDimensionsResult => {
  const {
    video: { id: videoPlayerId },
  } = useVideoContext();
  const player = usePlayer(videoPlayerId);
  const clipsDimensions = useClipsDimensions({ videoId });
  const currentClipDimensions = useMemo(
    () =>
      getClipDimensionsAtTime({
        clipsDimensions,
        timeMs: currentPlayTimeMs,
      }),
    [clipsDimensions, currentPlayTimeMs]
  );

  const [canvasDimensions, setCanvasDimensions] =
    useState<VideoCanvasDimensions>({
      canvasHeight: 0,
      canvasWidth: 0,
      leftLetterBoxWidth: 0,
      topLetterBoxHeight: 0,
      currentClipToCanvasScale: 0,
    });

  useEffect(() => {
    const handleResize = () => {
      const boundingRect = player?.media.getBoundingClientRect();

      if (!boundingRect || !currentClipDimensions) {
        return;
      }

      const playerElementWidth = boundingRect.width;
      const playerElementHeight = boundingRect.height;

      const newCanvasDimensions = calculateVideoCanvasDimensions({
        currentClipDimensions,
        playerElementWidth,
        playerElementHeight,
      });

      setCanvasDimensions(newCanvasDimensions);
    };

    if (player?.media) {
      // Resize observer to update dimensions if the player's media element changes
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(player.media);

      // Initial load of dimensions
      player.media.addEventListener('loadedmetadata', handleResize);

      return () => {
        resizeObserver.disconnect();
        player.media.removeEventListener('loadedmetadata', handleResize);
      };
    }
  }, [currentClipDimensions, player?.media]);

  return {
    ...canvasDimensions,
    currentClipDimensions,
    clipsDimensions,
  };
};
