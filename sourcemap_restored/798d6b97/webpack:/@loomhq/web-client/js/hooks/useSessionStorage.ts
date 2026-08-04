import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useSessionStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [T, (value: T) => void] => {
  if (!isBrowser) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return [initialValue as T, () => {}];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);

      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue)
        );

        return initialValue;
      }

      return raw
        ? sessionStorageValue
        : // eslint-disable-next-line no-restricted-properties
          JSON.parse(sessionStorageValue || 'null');
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);

      sessionStorage.setItem(key, serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
  });

  return [state, setState];
};
