import cn from 'classnames';
import React from 'react';

import { useLayer, useHover } from 'react-laag';

import { Arrange, Container, Text, Icon, Tooltip } from '@loomhq/lens';

import $ from './styles.module.css';

export const EditItem = ({
  icon,
  title,
  rightOption,
  textOption,
  onClick,
  isDisabled,
  disabledTooltipText,
  popoverContent,
}: {
  icon: React.ReactNode;
  title: string;
  textOption?: React.ReactNode;
  rightOption?: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean; // indicate whether the button is disabled and grayed out
  disabledTooltipText?: string;
  popoverContent?: React.ReactNode;
}): JSX.Element => {
  const [isOver, hoverProps] = useHover({ delayEnter: 100 });

  const isOpen = isOver && !isDisabled;

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen,
    placement: 'left-center',
    triggerOffset: 12,
    auto: true,
  });
  return (
    <>
      <Tooltip
        tabIndex={-1}
        content={disabledTooltipText}
        isDisabled={!isDisabled || !disabledTooltipText}
        placement="bottomCenter"
        isInline={false}
      >
        <span {...triggerProps} {...hoverProps}>
          <Container
            className={cn({
              [$.editItemButton]: true,
              [$.isDisabled]: isDisabled,
            })}
            onClick={isDisabled ? undefined : onClick}
            padding="small"
          >
            <Arrange columns={['auto', '1fr', 'auto']} gap="medium">
              <Icon icon={icon} />
              <Arrange gap="xsmall">
                <Text fontWeight="medium">
                  <div className={$.shorterLineHeight}>{title}</div>
                </Text>
                {textOption}
              </Arrange>
              {rightOption}
            </Arrange>
          </Container>
        </span>
      </Tooltip>
      {isOpen
        ? renderLayer(
            <div {...layerProps} className={$.popover}>
              {popoverContent}
            </div>
          )
        : null}
    </>
  );
};
