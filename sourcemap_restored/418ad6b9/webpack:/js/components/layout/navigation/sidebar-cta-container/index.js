/* eslint-disable @loomhq/loom/no-js-extension */
import cn from 'classnames';
import React from 'react';

import { IconButton } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import { useNavigationStore } from '@js/components/layout/navigation/navigation-store';

import styles from './styles.module.less';

function SidebarCtaContainer({
  className = 'items:center',
  color = 'var(--lns-color-body)',
  backgroundColor = 'var(--lns-color-highlight)',
  onDismiss,
  children,
  onClick,
  width = 'var(--navSidebarInnerWidth)',
}) {
  const { toggleSidebar, isCollapsed } = useNavigationStore();
  const Element = onClick ? 'button' : 'aside';

  return (
    <Element
      onClick={() => isCollapsed && toggleSidebar()}
      style={{ width, backgroundColor, color }}
      className={cn(
        'flex flexDirection:column relative items:center radius:large p:medium mt:auto',
        className,
        styles.sidebarCtaContainer,
        isCollapsed && styles.isCollapsed
      )}
    >
      {!isCollapsed && onDismiss && (
        <div className="absolute top:xsmall right:xsmall">
          <IconButton
            altText="Dismiss"
            icon={<SvgClose />}
            onClick={event => onDismiss(event)}
          />
        </div>
      )}

      {children}
    </Element>
  );
}

// eslint-disable-next-line import/no-default-export
export default SidebarCtaContainer;
