import { SelectedBackground } from '@js/common/background-picker/types';
import React, { useState } from 'react';
import $ from './styles.module.css';
import { PRESET_BACKGROUND_NAME_TO_SRC_MAP } from '@js/common/background-picker/image-background-picker/presets';
import cn from 'classnames';
import { BackgroundType } from '@loomhq/shared-utilities';

export const MiniBackgroundIcon = ({
  background,
  onClick,
  isSelected,
}: {
  background: SelectedBackground;
  onClick?: () => void;
  isSelected?: boolean;
}): JSX.Element | null => {
  const [imageError, setImageError] = useState(false);

  if (background.type === 'custom' && (!background.src || imageError)) {
    return null;
  }

  return (
    <button
      tabIndex={0}
      className={cn($.backgroundIcon, $.interactive, {
        [$.selected]: isSelected,
      })}
      onClick={onClick}
    >
      {background.type === BackgroundType.HEX && (
        <div
          className="height:full width:full"
          style={{ backgroundColor: background.hexValue }}
        />
      )}
      {background.type === BackgroundType.PRESET && (
        <img
          src={
            PRESET_BACKGROUND_NAME_TO_SRC_MAP[background.presetBackgroundName]
          }
          alt={background.presetBackgroundName}
        />
      )}
      {background.type === BackgroundType.CUSTOM && (
        <img
          src={background.src}
          alt="Custom Background"
          onError={() => setImageError(true)}
        />
      )}
    </button>
  );
};
