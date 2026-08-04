import cx from 'classnames';
import React from 'react';

import { Align, Text } from '@loomhq/lens';

import $ from './styles.module.css';

export const NoBackgroundOptionButton = ({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={cx({
        [$.optionButton]: true,
        [$.noneGradientButton]: true,
        [$.isSelected]: isSelected,
      })}
    >
      <div className={$.noneGradientTextDiv}>
        <Align alignment="center">
          <Text fontWeight="bold" color="background">
            None
          </Text>
        </Align>
      </div>
    </button>
  );
};
