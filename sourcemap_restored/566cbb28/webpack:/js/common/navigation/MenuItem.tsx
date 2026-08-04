import cn from 'classnames';
import React from 'react';

import { useLayer, useHover } from 'react-laag';

import { Container, Icon, Spacer, Text } from '@loomhq/lens';

// Not a fan of importing distant styles, but I'd rather not duplicate them
// If/when navigation moves entirely to /common, we can reference the local styles here
import styles from '@js/components/layout/navigation/styles.module.less';

export type MenuItemProps = {
  title: string;
  path: string;
  target?: string;
  icon?: React.ReactNode;
  popover?: React.ReactNode;
  onClick: () => void;
};

export const MenuItem = ({ item }: { item: MenuItemProps }): JSX.Element => {
  const isActive = window.location.pathname.startsWith(item.path);

  const [isOver, hoverProps] = useHover({ delayEnter: 100 });
  const isOpen = isOver && Boolean(item.popover);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen,
    placement: 'right-center',
    triggerOffset: 0,
    auto: true,
  });

  return (
    <li {...triggerProps} {...hoverProps}>
      <a
        key={item.path}
        href={item.path}
        target={item.target ? item.target : '_self'}
        onClick={item.onClick}
        aria-current={
          window.location.pathname.startsWith(String(item.path))
            ? 'page'
            : undefined
        }
      >
        <div
          className={cn(
            'flex flexDirection:row items:center',
            styles.menuItem,
            isActive && styles.active
          )}
        >
          <div className={cn(styles.vl)}></div>
          <Spacer right="small" />
          <Text fontWeight="bold">{item.title}</Text>
          {item.icon && (
            <Container position="absolute" right="small">
              <Icon icon={item.icon} color="currentColor" />
            </Container>
          )}
          {isOpen
            ? renderLayer(
                <div {...layerProps} className={styles.popover}>
                  {item.popover}
                </div>
              )
            : null}
        </div>
      </a>
    </li>
  );
};
