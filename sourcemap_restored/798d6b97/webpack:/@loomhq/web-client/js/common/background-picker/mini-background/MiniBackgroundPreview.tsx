import { SelectedBackground } from '@js/common/background-picker/types';
import React, { useState } from 'react';
import $ from './styles.module.css';
import { PRESET_BACKGROUND_NAME_TO_SRC_MAP } from '@js/common/background-picker/image-background-picker/presets';
import { Icon } from '@loomhq/lens';
import { SvgImage1 } from '@loomhq/lens/icons/image1';

export const MiniBackgroundPreview = ({
  selectedBackground,
}: {
  selectedBackground: SelectedBackground;
}): JSX.Element => {
  const [imageError, setImageError] = useState(false);
  if (selectedBackground.type === 'hex') {
    return (
      <div
        className={$.backgroundIcon}
        style={{ backgroundColor: selectedBackground.hexValue }}
      />
    );
  }

  if (selectedBackground.type === 'preset') {
    const src =
      PRESET_BACKGROUND_NAME_TO_SRC_MAP[
        selectedBackground.presetBackgroundName
      ];

    return (
      <div className={$.backgroundIcon}>
        <img src={src} alt={selectedBackground.presetBackgroundName} />
      </div>
    );
  }

  if (
    selectedBackground.type === 'custom' &&
    selectedBackground.src &&
    !imageError
  ) {
    return (
      <div className={$.backgroundIcon}>
        <img
          src={selectedBackground.src}
          alt="Custom Background"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return <Icon icon={<SvgImage1 />} />;
};
