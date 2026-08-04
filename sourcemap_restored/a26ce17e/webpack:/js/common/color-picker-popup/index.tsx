import React, { useState } from 'react';
import { useLayer } from 'react-laag';

import { PlacementType } from 'react-laag/dist/PlacementType';

import { Button, ColorPicker } from '@loomhq/lens';

type ColorPickerPopupProps = {
  addButton?: boolean;
  children: React.ReactNode;
  colorSelected: (color: string) => void;
  defaultColor?: string;
  forceClose?: boolean;
  id?: string;
  position?: PlacementType;
  rootContainer?: HTMLElement;
  swatches?: string[];
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorPickerPopup({
  addButton = true,
  children,
  colorSelected,
  defaultColor = '#ffffff',
  forceClose = false,
  id = '',
  position = 'top-center',
  rootContainer,
  swatches,
}: ColorPickerPopupProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isOpen && !forceClose,
    triggerOffset: 10,
    placement: position,
    onOutsideClick: () => {
      setIsOpen(false);
    },
    onParentClose: () => {
      setIsOpen(false);
    },
    auto: true,
    snap: true,
    container: rootContainer,
  });

  const [color, setColor] = useState(defaultColor);

  const pickerWrapperProps = {
    ...layerProps,
    style: {
      ...layerProps.style,
      zIndex: 1,
    },
  };

  return (
    <>
      <span {...triggerProps}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
        <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      </span>
      {isOpen && !forceClose
        ? renderLayer(
            <div {...pickerWrapperProps}>
              <ColorPicker
                id={id}
                onChange={(newColor: string) =>
                  addButton ? setColor(newColor) : colorSelected(newColor)
                }
                defaultColor={defaultColor}
                confirmButton={
                  addButton && (
                    <Button
                      variant="primary"
                      size="small"
                      hasFullWidth
                      onClick={() => {
                        colorSelected(color);
                        setIsOpen(false);
                      }}
                    >
                      Use this color
                    </Button>
                  )
                }
                swatches={swatches as []}
              />
            </div>
          )
        : null}
    </>
  );
}
