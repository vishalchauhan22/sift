import { useCallback, useState } from 'react';

// Toggle a boolean to true, and have it automatically flip back to false after a timeout.
// Useful for temporarily showing a message on the screen, like a confirmation or a toast.
// eslint-disable-next-line import/no-default-export
export default function useBooleanTimeoutState(
  timeoutMs = 2000
): [boolean, () => void] {
  const [value, setValue] = useState(false);

  return [
    value,
    useCallback(() => {
      setValue(true);
      setTimeout(() => setValue(false), timeoutMs);
    }, [timeoutMs]),
  ];
}
