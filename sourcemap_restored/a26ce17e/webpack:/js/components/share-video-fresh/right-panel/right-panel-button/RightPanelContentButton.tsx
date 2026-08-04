import React from 'react';

import { Arrange, Button, Icon, Text } from '@loomhq/lens';

import styles from './styles.module.css';

type RightPanelContentButtonProps = {
  onClick: () => void;
  buttonIcon: React.ReactElement;
  buttonText: React.ReactElement | string;
  onMouseEnter?: () => void;
  isNewStyle?: boolean;
  isDisabled?: boolean;
};

export const RightPanelContentButton = ({
  onClick,
  buttonIcon,
  buttonText,
  onMouseEnter,
  isNewStyle,
  isDisabled = false,
}: RightPanelContentButtonProps): React.ReactElement => {
  return (
    <Button
      className={
        isNewStyle ? styles.newRightPanelButton : styles.rightPanelButton
      }
      isDisabled={isDisabled}
      size="small"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <Arrange gap="xsmall">
        <Icon
          icon={buttonIcon}
          size={2}
          color={isDisabled ? 'disabledContent' : undefined}
        />
        <Text fontWeight="bold" size="body-sm">
          {buttonText}
        </Text>
      </Arrange>
    </Button>
  );
};
