import React from 'react';

import { useLayer, useHover } from 'react-laag';

import { Arrange, Text, TextButton } from '@loomhq/lens';

import styles from './styles.module.css';

export type MenuTextButtonProps = {
  title: string;
  path: string;
  target?: string;
  icon?: React.ReactNode;
  popover?: React.ReactNode;
  onClick?: () => void;
};

export const MenuTextButton = ({
  item,
}: {
  item: MenuTextButtonProps;
}): JSX.Element => {
  const [isOver, hoverProps] = useHover({ delayEnter: 100 });
  const isOpen = isOver && Boolean(item.popover);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen,
    placement: 'left-center',
    triggerOffset: 0,
    auto: true,
  });

  return (
    <li {...triggerProps} {...hoverProps}>
      <Arrange justifyContent="stretch">
        <TextButton
          htmlTag="a"
          href={item.path}
          target={item.target}
          onClick={item.onClick}
          {...(item.icon ? { icon: item.icon } : null)}
          iconPosition="right"
        >
          <Text>{item.title}</Text>
          {isOpen
            ? renderLayer(
                <div {...layerProps} className={styles.popover}>
                  {item.popover}
                </div>
              )
            : null}
        </TextButton>
      </Arrange>
    </li>
  );
};
