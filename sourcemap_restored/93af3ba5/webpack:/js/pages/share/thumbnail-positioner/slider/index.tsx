import _isNumber from 'lodash/isNumber';
import React, { useEffect, useState, useRef } from 'react';

import { getPointerPosition } from '@js/utilities/dom';

import './styles.css';

type SliderProps = {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  minZoom: number;
  maxZoom: number;
};

const handleMouseDown = (e, sliderRef, minZoom, maxZoom, setScale) => {
  const handleMouseMove = (
    e:
      | React.MouseEvent<Node, MouseEvent>
      | React.TouchEvent<Node>
      | TouchEvent
      | MouseEvent
  ) => {
    sliderRef.current?.focus();
    const { x: newZoom } = getPointerPosition(sliderRef.current, e);
    setScale(minZoom + newZoom * (maxZoom - minZoom));
  };

  const handleMouseUp = (_e: MouseEvent | TouchEvent) => {
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('touchmove', handleMouseMove, true);
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('touchend', handleMouseUp, true);

    sliderRef.current?.blur();
  };

  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('mouseup', handleMouseUp, true);
  document.addEventListener('touchmove', handleMouseMove, true);
  document.addEventListener('touchend', handleMouseUp, true);

  handleMouseMove(e);
};

// this component was heavily inspired by the video-react Slider component
// https://github.com/video-react/video-react
export const Slider = ({
  scale,
  setScale,
  minZoom,
  maxZoom,
}: SliderProps): React.ReactElement => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  let scaleProgress = (scale - minZoom) / (maxZoom - minZoom);
  // Protect against no duration and other division issues
  if (!_isNumber(scaleProgress) || scaleProgress < 0) {
    scaleProgress = 0;
  }
  const scalePercentage = Math.floor(scaleProgress * 100);

  const clientWidth = sliderRef.current?.clientWidth || 0;
  useEffect(() => {
    // We do this to ensure we always get the correct clientWidth
    // post render of this component
    // https://www.loom.com/share/e9a43a836e5c427fba9762ee89d2c2c4
    if (currentWidth !== clientWidth) {
      setCurrentWidth(clientWidth);
    }
  }, [currentWidth, clientWidth]);

  return (
    //eslint-disable-next-line  @atlassian/a11y/interactive-element-not-keyboard-focusable,  jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={sliderRef}
      className="slider relative block bgc:grey4"
      onMouseDown={e =>
        handleMouseDown(e, sliderRef, minZoom, maxZoom, setScale)
      }
      onTouchStart={e =>
        handleMouseDown(e, sliderRef, minZoom, maxZoom, setScale)
      }
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.preventDefault()
      }
      aria-label="Zoom slider"
      aria-valuenow={scalePercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="relative height:100 bgc:white"
        style={{ width: `${scalePercentage}%` }}
      >
        <span className="zoom absolute bgc:white" />
      </div>
    </div>
  );
};
