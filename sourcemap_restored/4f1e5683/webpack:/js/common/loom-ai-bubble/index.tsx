import React from 'react';

import styles from './style.module.css';

interface LoomAiBubbleProps {
  size: number;
  blur?: number;
  position: Array<number>;
  parallax?: number;
  mousePosition?: { x: number; y: number };
}

export const LoomAiBubble = ({
  size,
  blur,
  position,
  parallax,
  mousePosition,
}: LoomAiBubbleProps): JSX.Element => {
  return (
    <div
      className={styles.bubble}
      style={{
        filter: blur ? `blur(${blur}px)` : 'none',
        height: `${size}rem`,
        width: `${size}rem`,
        left: `calc(50% - ${size / 2}rem + ${position[0] / 2}%)`,
        top: `calc(50% - ${size / 2}rem + ${position[1] / 2}%)`,
        transform:
          parallax && mousePosition
            ? `translate(${(mousePosition.x * parallax) / 100}px, ${
                (mousePosition.y * parallax) / 100
              }px)`
            : 'none',
      }}
    />
  );
};
