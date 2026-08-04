import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';

import { useLayer, useMousePositionAsTrigger } from 'react-laag';

import { TooltipBox, Text, Arrange, Container, Align } from '@loomhq/lens';

import { useToggleRightPanel, Z_INDICES } from '@js/pages/share/common';

import {
  DEFAULT_RIGHT_PANEL_WIDTH,
  MAX_RIGHT_PANEL_WIDTH,
  MIN_RIGHT_PANEL_WIDTH,
  RIGHT_PANEL_SNAP_OFFSET,
} from '@js/pages/share/right-panel/common';

import styles from './styles.module.css';

const ResizerTooltip = () => {
  return (
    <TooltipBox>
      <Container paddingX="xsmall">
        <Arrange autoFlow="row">
          <Arrange gap="xsmall">
            <Text size="body-sm" fontWeight="bold">
              Drag
            </Text>
            <Text size="body-sm">to resize</Text>
          </Arrange>
          <Arrange gap="xsmall">
            <Text size="body-sm" fontWeight="bold">
              Click
            </Text>
            <Text size="body-sm">to collapse</Text>
            <Container className={styles.shortcutWrapper}>
              <Align alignment="center">
                <Text size="body-sm" fontWeight="bold" color="grey3">
                  T
                </Text>
              </Align>
            </Container>
          </Arrange>
        </Arrange>
      </Container>
    </TooltipBox>
  );
};

export const RightPanelResizer = ({
  setWidth,
  disabled,
}: {
  setWidth: (width: number) => void;
  disabled: boolean;
}): JSX.Element => {
  const [active, setActive] = useState(false);
  const [timestampMouseDown, setTimestampMouseDown] = useState(0);
  const [hovering, setHovering] = useState(false);
  const togglePanel = useToggleRightPanel();

  const { hasMousePosition, resetMousePosition, handleMouseEvent, trigger } =
    useMousePositionAsTrigger();

  const { layerProps, renderLayer } = useLayer({
    isOpen: hasMousePosition,
    onOutsideClick: resetMousePosition,
    trigger,
    placement: 'right-center',
    triggerOffset: 8,
  });

  layerProps.style = { ...layerProps.style, zIndex: Z_INDICES.RESIZER };

  const handleMouseDown = e => {
    setTimestampMouseDown(e.timeStamp);
    resetMousePosition();
    setActive(true);
  };

  const handleMouseMove = useCallback(
    (e: any) => {
      if (active) {
        e.preventDefault();
        const windowWidth = window.innerWidth;
        const newWidth = windowWidth - e.clientX;

        if (
          MIN_RIGHT_PANEL_WIDTH < newWidth &&
          newWidth < MAX_RIGHT_PANEL_WIDTH
        ) {
          const snapWidth = DEFAULT_RIGHT_PANEL_WIDTH;

          if (
            snapWidth - RIGHT_PANEL_SNAP_OFFSET < newWidth &&
            newWidth < snapWidth + RIGHT_PANEL_SNAP_OFFSET
          ) {
            setWidth(snapWidth);
          } else {
            setWidth(newWidth);
          }
        } else if (newWidth < MIN_RIGHT_PANEL_WIDTH) {
          setWidth(MIN_RIGHT_PANEL_WIDTH);
        } else if (MAX_RIGHT_PANEL_WIDTH < newWidth) {
          setWidth(MAX_RIGHT_PANEL_WIDTH);
        }
      }
    },
    [active, setWidth]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleMouseMove, false);
        setActive(false);
      },
      false
    );
  }, [active, handleMouseMove]);

  const handleMouseUp = e => {
    const diff = e.timeStamp - timestampMouseDown;

    // if the time between mouse down and mouse up is less than 200ms, close sidebar
    if (diff < 200) {
      togglePanel(false);
      setHovering(false);
    }
  };

  useEffect(() => {
    const container = document.getElementById('container');

    if (container) {
      if (active) {
        container.style.cursor = 'col-resize';
      } else {
        container.style.cursor = 'unset';
      }
    }
  }, [active]);

  const onHover = e => {
    if (!active) {
      handleMouseEvent(e);
      setHovering(true);
    } else {
      setHovering(false);
    }
  };

  const onHoverLeave = () => {
    resetMousePosition();
    setHovering(false);
  };

  if (disabled) {
    return <></>;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.resizeBarContainer}
      style={{ zIndex: Z_INDICES.RESIZER }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
    >
      <div
        className={classNames(
          styles.resizeBar,
          hovering || active ? styles.highlight : undefined
        )}
      />
      {renderLayer(
        <div
          {...layerProps}
          className={classNames(
            styles.tooltipWrapper,
            hasMousePosition ? styles.showTooltipWrapper : undefined
          )}
        >
          <ResizerTooltip />
        </div>
      )}
    </div>
  );
};
