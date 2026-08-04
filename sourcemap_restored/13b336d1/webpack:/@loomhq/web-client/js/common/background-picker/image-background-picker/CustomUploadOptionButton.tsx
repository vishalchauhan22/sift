import cx from 'classnames';
import React from 'react';

import { Align, Text, Icon, Tooltip } from '@loomhq/lens';
import { SvgUpload } from '@loomhq/lens/icons/upload';

import $ from './styles.module.css';

export const CustomUploadOptionButton = ({
  isSelected,
  onClick,
  isDisabled,
  disabledReason,
}: {
  isSelected: boolean;
  onClick: () => void;
  isDisabled: boolean;
  disabledReason?: string;
}): JSX.Element => {
  const iconAndTextColor = isDisabled ? 'disabledContent' : 'body';

  return (
    <Tooltip
      content={disabledReason}
      isDisabled={!isDisabled || !disabledReason}
      placement="bottomCenter"
      maxWidth="23"
    >
      <button
        onClick={onClick}
        className={cx({
          [$.optionButton]: true,
          [$.uploadButton]: true,
          [$.isSelected]: isSelected,
          [$.isDisabled]: isDisabled,
        })}
        disabled={isDisabled}
      >
        <div className={$.uploadContent}>
          <Align alignment="center">
            <Icon icon={<SvgUpload />} color={iconAndTextColor} />
            <Text fontWeight="bold" color={iconAndTextColor}>
              Upload
            </Text>
          </Align>
        </div>
      </button>
    </Tooltip>
  );
};
