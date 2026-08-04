/* eslint-disable @loomhq/loom/no-js-extension */
import { useEffect } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useOnClickOutside(
  ref,
  handler,
  ignoreDropdownClicks = false
) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // when enabled, this checks if the event came from the dropdown component
      // from lens, and if so it exits and doesn't trigger the useOnClickOutside
      // handler
      if (ignoreDropdownClicks) {
        const dropdowns = document.querySelectorAll('ul[role="listbox"]');

        for (let i = 0; i < dropdowns.length; i++) {
          if (
            dropdowns[i].parentNode.style.position === 'fixed' &&
            dropdowns[i].contains(event.target)
          ) {
            return;
          }
        }
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, ignoreDropdownClicks]);
}
