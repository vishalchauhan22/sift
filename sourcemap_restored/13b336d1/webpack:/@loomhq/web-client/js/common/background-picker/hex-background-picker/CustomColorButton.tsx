import { StackablePopover } from '@js/common/stackable-popover';
import React, { useCallback, useState } from 'react';

import { Button, ColorPicker, Container } from '@loomhq/lens';

import { HexColor } from '@loomhq/shared-utilities';

import { ColorOptionButton } from './ColorOptionButton';

export const GRADIENT_BACKGROUND = `
  conic-gradient(from 180deg at 50% 50%,
  #FF0000 0deg, #FFE600 56.25deg, #05FF00 118.12deg,
  #00FFFF 180deg, #001AFF 245.62deg,#DB00FF 307.5deg,
  #FF0000 360deg)`;

type CustomColorButtonProps = {
  isSelected: boolean;
  selectedColor: HexColor | null;
  onSelectedColorChange: (color: HexColor) => void;
};

export const CustomColorButton = ({
  isSelected,
  selectedColor,
  onSelectedColorChange,
}: CustomColorButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  // We don't want to spam changes to the selectedColor while the user is
  // dragging around on the color picker, so instead we'll maintain a temporary
  // copy of the color and only update the selectedColor when the custom picker is
  // closed
  const [tempColor, setTempColor] = useState<string | null>(selectedColor);

  const handleTempColorChange = useCallback(
    (color: string) => {
      setTempColor(color);
    },
    [setTempColor]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (tempColor && tempColor !== selectedColor) {
      onSelectedColorChange(tempColor as HexColor);
    }

    setIsOpen(false);
  }, [onSelectedColorChange, selectedColor, tempColor]);

  const handleButtonClick = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      setTempColor(selectedColor);
      setIsOpen(true);
    }
  }, [isOpen, handleClose, selectedColor]);

  return (
    <StackablePopover
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottomCenter"
      offset={1}
      content={
        <ColorPicker
          defaultColor={tempColor ?? undefined}
          onChange={handleTempColorChange}
          confirmButton={
            <Button
              variant="primary"
              size="small"
              hasFullWidth
              onClick={handleConfirm}
            >
              Apply color
            </Button>
          }
        />
      }
    >
      <Container height={3} width={3}>
        <ColorOptionButton
          key="custom-color-picker-button"
          color={GRADIENT_BACKGROUND}
          name="custom color picker"
          onClick={handleButtonClick}
          isSelected={isSelected}
        />
      </Container>
    </StackablePopover>
  );
};
