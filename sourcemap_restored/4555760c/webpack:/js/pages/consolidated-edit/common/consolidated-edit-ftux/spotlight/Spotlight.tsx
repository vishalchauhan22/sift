import FocusTrap from 'focus-trap-react';
import React from 'react';
import { useLayer } from 'react-laag';
import useResizeObserver from 'use-resize-observer';

const DEFAULT_SPOTLIGHT_Z_INDEX = 10;
const DEFAULT_HIGHLIGHTED_ELEMENT_PADDING_PX = 4;
const DEFAULT_HIGHLIGHTED_ELEMENT_POPOVER_OFFSET_PX = 16;
const DEFAULT_BACKDROP_COLOR = 'var(--lns-color-backdrop)';
const DEFAULT_BORDER_RADIUS = 'var(--lns-radius-large)';

type SpotlightProps = {
  popoverContent: JSX.Element;
  highlightedElement: HTMLElement;

  highlightPaddingTop?: number;
  highlightPaddingRight?: number;
  highlightPaddingBottom?: number;
  highlightPaddingLeft?: number;

  triggerOffset?: number;
  zIndex?: number;
  backdropColor?: string;
  highlightBorderRadius?: string;
};

export const Spotlight = ({
  highlightedElement,
  popoverContent,

  highlightPaddingTop = DEFAULT_HIGHLIGHTED_ELEMENT_PADDING_PX,
  highlightPaddingRight = DEFAULT_HIGHLIGHTED_ELEMENT_PADDING_PX,
  highlightPaddingBottom = DEFAULT_HIGHLIGHTED_ELEMENT_PADDING_PX,
  highlightPaddingLeft = DEFAULT_HIGHLIGHTED_ELEMENT_PADDING_PX,
  triggerOffset = DEFAULT_HIGHLIGHTED_ELEMENT_POPOVER_OFFSET_PX,
  zIndex = DEFAULT_SPOTLIGHT_Z_INDEX,
  backdropColor = DEFAULT_BACKDROP_COLOR,
  highlightBorderRadius = DEFAULT_BORDER_RADIUS,
}: SpotlightProps): JSX.Element => {
  const rect = highlightedElement.getBoundingClientRect();
  const backdropRef = React.useRef<HTMLDivElement>(null);

  // Trigger a re-render any time the backdrop resizes
  useResizeObserver({ ref: backdropRef });

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: true,
    auto: true,
    triggerOffset,
  });

  return (
    <>
      {/* Invisible overlay to block pointer events */}
      <div
        style={{
          zIndex,
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        }}
        ref={backdropRef}
      >
        {/* The highlighted element */}
        <div
          {...triggerProps}
          style={{
            position: 'absolute',
            top: rect.top - highlightPaddingTop,
            left: rect.left - highlightPaddingLeft,
            width: rect.width + highlightPaddingLeft + highlightPaddingRight,
            height: rect.height + highlightPaddingTop + highlightPaddingBottom,
            backgroundColor: 'transparent',
            zIndex: zIndex - 1,
            borderRadius: highlightBorderRadius,

            // Use a box-shadow to cover the rest of the screen outside of the highlighted element
            boxShadow: `0 0 0 200vmax ${backdropColor}`,
          }}
        />
      </div>

      {/* The popover */}
      {renderLayer(
        <div
          {...layerProps}
          style={{ ...layerProps.style, zIndex: zIndex + 1 }}
        >
          <FocusTrap>
            <div>{popoverContent}</div>
          </FocusTrap>
        </div>
      )}
    </>
  );
};
