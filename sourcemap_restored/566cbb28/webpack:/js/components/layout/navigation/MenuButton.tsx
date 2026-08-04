import { SETTINGS } from '@js/constants/routes';

import cn from 'classnames';
import { MenuItem, MenuItemProps } from '@js/common/navigation/MenuItem';
import React, { useEffect, useRef, useState } from 'react';

import { Dropdown } from '@loomhq/lens';

import styles from './styles.module.less';

function MenuButton({
  name,
  items,
  children,
  collapsed,
}: {
  name: string;
  items: MenuItemProps[];
  children: JSX.Element;
  collapsed: boolean;
}): JSX.Element {
  const isActive = window.location.pathname.startsWith(SETTINGS);

  const [open, setOpen] = useState(isActive);
  const panelId = `${name}-panel`;

  const triggerRef = useRef<HTMLButtonElement>(null);

  const buttonTrigger = (
    <button
      className={cn(
        styles.menuItem,
        isActive && (!open || collapsed) && styles.active
      )}
      aria-expanded={collapsed ? undefined : open}
      aria-haspopup={collapsed ? 'true' : undefined}
      aria-controls={panelId}
      onClick={() => setOpen(!open)}
      ref={triggerRef}
    >
      {children}
    </button>
  );

  // Since the dropdown isn't opened with a trigger that detects clicks outside of it automatically
  // and close the dropdown, we need to add a click handler to handle this case explicitly
  useEffect(() => {
    if (!collapsed) {
      return;
    }

    function handleClickOutside(event) {
      if (
        open &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open, collapsed]);

  // For the collapsed state, the dropdown is rendered without a trigger and managed
  // by the button trigger. This is to keep the settings sidebar item visually consistent with other
  // menu links when it is collapsed or expanded. In addition, dropdowns do not yet support positioning icons and
  // default positioning is inconsistent with the expanded state, so we will pass the items without icons.
  const itemsWithoutIcons = items.map(item => ({
    ...item,
    icon: null,
  }));

  return (
    <div className="relative">
      {collapsed && (
        <Dropdown
          trigger={buttonTrigger}
          options={itemsWithoutIcons}
          menuPosition="right"
        />
      )}
      {!collapsed && (
        <>
          {buttonTrigger}
          <ul id={panelId} hidden={!open}>
            {items.map(item => (
              <MenuItem key={item.path} item={item} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default MenuButton;
