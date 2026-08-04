import FocusTrap from 'focus-trap-react';
import React, { useEffect, useRef } from 'react';

import { Popover } from '@loomhq/lens';

type PopoverProps = Parameters<typeof Popover>[0];

type StackablePopoverProps = { onClose: () => void } & Omit<
  PopoverProps,
  // Excluding rootId and childrenZIndex as StackablePopover only supports portal-based rendering,
  // and we also want to ensure the Popover's children are not rendered with an unnecessary z-index.
  'rootId' | 'childrenZIndex'
>;

export const StackablePopover = ({
  onClose,
  isOpen,
  children,
  content,
  ...popoverProps
}: StackablePopoverProps): JSX.Element => {
  // focus-trap-react's onDeactivate callback is only initialized on mount,
  // so in order to not have a stale function reference called onClose we'll
  // maintain a ref to the latest onClose function passed in.
  const onCloseRef = useRef(onClose);

  // We need to store the trigger element ref so we can check if the click is
  // outside the trigger element before deactivating the focus trap. If the click
  // _is_ within the trigger element, we'll allow the click to propagate.
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  return (
    <Popover
      {...popoverProps}
      childrenZIndex={0}
      rootId="container"
      isOpen={isOpen}
      content={
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            onDeactivate: () => {
              if (onCloseRef.current) {
                onCloseRef.current();
              }
            },
            escapeDeactivates: true,
            allowOutsideClick: true,
            clickOutsideDeactivates: (e: MouseEvent | TouchEvent) => {
              // Don't deactivate if clicking the trigger element,
              // allow the click event to propagate, and let the consumer handle
              // toggling isOpen
              const target = e.target as HTMLElement;
              const clickContainsTrigger = triggerRef.current?.contains(target);
              return !clickContainsTrigger;
            },
            // We often spawn popovers using a button with a tooltip, and restoring focus to
            // that button shows the tooltip again which feels janky.
            returnFocusOnDeactivate: false,
            tabbableOptions: {
              // Disable for tests since this blows up in JSDOM https://github.com/focus-trap/focus-trap-react/issues/1002#issuecomment-1564573419
              displayCheck: process.env.NODE_ENV === 'test' ? 'none' : 'full',
            },
          }}
        >
          {/* FocusTrap requires a wrapper element that accepts a ref to inject */}
          <div style={{ all: 'unset' }}>{content}</div>
        </FocusTrap>
      }
    >
      {/* We want to retain a ref to the trigger to detect clicks that happen within there */}
      <div style={{ all: 'unset' }} ref={triggerRef}>
        {children}
      </div>
    </Popover>
  );
};
