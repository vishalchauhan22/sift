import { nanoid } from 'nanoid';

import {
  DEFAULT_ARROW_OVERLAY_VIDEO_ATTRIBUTES,
  DEFAULT_BOX_OVERLAY_ATTRIBUTES,
  DEFAULT_TEXT_OVERLAY_ATTRIBUTES,
} from '@loomhq/shared-utilities/constants/overlays';

import { VideoArrowOverlay, VideoBoxOverlay, VideoTextOverlay } from './types';

const DEFAULT_OVERLAY_DURATION_MS = 20000;

export const newTextOverlay = ({
  currentClipHeight,
  currentClipWidth,
  currentPlayTimeMs,
  maxUpperMs,
}: {
  currentClipHeight: number;
  currentClipWidth: number;
  currentPlayTimeMs: number;
  maxUpperMs: number;
}): VideoTextOverlay => {
  // Carefully chosen text size based on the 'Add text' placeholder and its padding
  const textSizeX = 290;
  const textSizeY = 128;
  const desiredTextWidth = 237;

  return {
    ...DEFAULT_TEXT_OVERLAY_ATTRIBUTES,

    __typename: 'VideoCanvasTextOverlay',
    canvasOverlayId: nanoid(),

    lowerMs: Math.floor(currentPlayTimeMs),
    upperMs: Math.min(
      Math.floor(currentPlayTimeMs + DEFAULT_OVERLAY_DURATION_MS),
      maxUpperMs
    ),

    textSizeX,
    textSizeY,
    desiredTextWidth,
    textOffsetX: currentClipWidth / 2 - textSizeX / 2,
    textOffsetY: currentClipHeight / 2 - textSizeY / 2,
  };
};

export const newArrowOverlay = ({
  currentClipHeight,
  currentClipWidth,
  currentPlayTimeMs,
  maxUpperMs,
}: {
  currentClipHeight: number;
  currentClipWidth: number;
  currentPlayTimeMs: number;
  maxUpperMs: number;
}): VideoArrowOverlay => {
  const arrowLength = Math.max(currentClipWidth, currentClipHeight) / 6;

  return {
    ...DEFAULT_ARROW_OVERLAY_VIDEO_ATTRIBUTES,

    __typename: 'VideoCanvasArrowOverlay',
    canvasOverlayId: nanoid(),

    lowerMs: Math.floor(currentPlayTimeMs),
    upperMs: Math.min(
      Math.floor(currentPlayTimeMs + DEFAULT_OVERLAY_DURATION_MS),
      maxUpperMs
    ),

    arrowBaseOffsetX: currentClipWidth / 2 - arrowLength / 2,
    arrowBaseOffsetY: currentClipHeight / 2 + arrowLength / 2,
    arrowHeadOffsetX: currentClipWidth / 2 + arrowLength / 2,
    arrowHeadOffsetY: currentClipHeight / 2 - arrowLength / 2,
  };
};

export const newBoxOverlay = ({
  currentClipHeight,
  currentClipWidth,
  currentPlayTimeMs,
  maxUpperMs,
}: {
  currentClipHeight: number;
  currentClipWidth: number;
  currentPlayTimeMs: number;
  maxUpperMs: number;
}): VideoBoxOverlay => {
  const boxSizeX = currentClipWidth / 4;
  const boxSizeY = currentClipHeight / 4;

  return {
    ...DEFAULT_BOX_OVERLAY_ATTRIBUTES,

    __typename: 'VideoCanvasBoxOverlay',
    canvasOverlayId: nanoid(),

    lowerMs: Math.floor(currentPlayTimeMs),
    upperMs: Math.min(
      Math.floor(currentPlayTimeMs + DEFAULT_OVERLAY_DURATION_MS),
      maxUpperMs
    ),

    boxSizeX,
    boxSizeY,
    boxOffsetX: currentClipWidth / 2 - boxSizeX / 2,
    boxOffsetY: currentClipHeight / 2 - boxSizeY / 2,
  };
};
