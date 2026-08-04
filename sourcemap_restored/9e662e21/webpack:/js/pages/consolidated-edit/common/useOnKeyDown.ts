import { isKeyboardFocusOnInput } from '@js/common/isKeyboardFocusOnInput';
import { useEffect } from 'react';

export const useOnKeyDown = (
  keyDownHandler: (event: KeyboardEvent) => void
): void => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const focusedOnInput = isKeyboardFocusOnInput();

      // Ignore keyboard shortcuts if we're focused on an input, or currently editing an overlay
      if (focusedOnInput) {
        return;
      }

      event.stopPropagation();
      keyDownHandler(event);
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [keyDownHandler]);
};
