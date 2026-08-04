import cx from 'classnames';
import React from 'react';

import $ from './styles.module.css';
import { PresetOption } from './presets';

export const PresetOptionButton = ({
  presetOption,
  isSelected,
  onClick,
}: {
  presetOption: PresetOption;
  isSelected: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={cx({ [$.optionButton]: true, [$.isSelected]: isSelected })}
    >
      <img
        alt={`${presetOption.presetBackgroundName}`}
        src={presetOption.src}
        className={$.optionImage}
      />
    </button>
  );
};
