import { useEffect } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useKeyDown(
  keyOrKeys: string | string[],
  callback: () => void,
  metaKeyRequired = false
): void {
  useEffect(() => {
    const keyArray = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

    function onKeyDown(event: KeyboardEvent) {
      if (keyArray.includes(event.key) && (!metaKeyRequired || event.metaKey)) {
        callback();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });
}
