// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { u } from '@loomhq/lens';

import { zIndexes } from '../utils';
import {
  colors,
  stylizedCaptionsRadius,
  transportIsOpenClassName,
  videoMouseIsActiveClassName,
} from '../variables';
import { useViewportContext } from '../viewportContext';

const BoundingBox = styled.div`
  --commentInfoOffset: ${u(6)};

  --heightBottomOffset: calc(
    100% - var(--lvp-reactionsBar-height) - var(--lvp-progress-height) - var(
        --commentInfoOffset
      )
  );

  height: calc(100% - var(--lvp-playBar-height));
  z-index: ${zIndexes.closedCaptions};
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  .${videoMouseIsActiveClassName} &,
  .${transportIsOpenClassName} & {
    height: calc(var(--heightBottomOffset) - var(--lvp-reactionsBar-height));
  }
`;

const Caption = styled.div`
  background-color: ${colors.captionsBackground};
  border-radius: var(--lns-radius-medium);
  padding: 0.4em 0.7em;
  color: var(--lns-color-body);
  text-align: center;
  width: fit-content;
  max-width: 80%;
  cursor: grab;
  user-select: none;
  display: inline-block;
  font-weight: var(--lns-fontWeight-book);
  opacity: 0;
  position: relative;

  &.active {
    opacity: 1;
    pointer-events: initial;
  }

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 0 0 3px var(--lns-color-blurpleMedium);
  }
`;

const StylizedCaption = styled.div`
  background-color: ${colors.stylizedCaptionsBackground};
  border-radius: ${stylizedCaptionsRadius};
  padding: 0.4em 1em;
  color: var(--lns-color-white);
  text-align: center;
  width: fit-content;
  max-width: 80%;
  cursor: grab;
  user-select: none;
  display: inline-block;
  font-weight: var(--lns-fontWeight-medium);
  box-shadow: 0px 4px 10px 0px #00000047;
  opacity: 0;
  position: relative;

  &.active {
    opacity: 95%;
    pointer-events: initial;
  }

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 0 0 3px var(--lns-color-blurpleMedium);
  }
`;

export const Captions = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { width } = useViewportContext();

  const slope = width / 51;
  const minFontSize = 14;
  const maxFontSize = 32;

  return (
    <BoundingBox data-name="ClosedCaptions">
      <Caption
        ref={ref}
        style={{
          fontSize: `clamp(${minFontSize}px, ${slope}px, ${maxFontSize}px)`,
          lineHeight: `clamp(${minFontSize * 1.5}px, 140%, ${
            maxFontSize * 1.3
          }px)`,
        }}
      />
    </BoundingBox>
  );
});

Captions.displayName = 'Captions';

export const StylizedCaptions = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const { width } = useViewportContext();

    const slope = width / 51;
    const minFontSize = 14;
    const maxFontSize = 32;

    return (
      <BoundingBox data-name="StylizedClosedCaptions">
        <StylizedCaption
          ref={ref}
          style={{
            fontSize: `clamp(${minFontSize}px, ${slope}px, ${maxFontSize}px)`,
            lineHeight: `clamp(${minFontSize * 1.5}px, 140%, ${
              maxFontSize * 1.3
            }px)`,
          }}
        />
      </BoundingBox>
    );
  }
);

StylizedCaptions.displayName = 'Captions';
