export function readFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    // TODO(next author): Please use getLocalStorageKey from utilities/localStorage instead
    // eslint-disable-next-line no-restricted-properties
    const jsonData = window.localStorage.getItem(key);

    if (jsonData === null) {
      return defaultValue;
    }

    // eslint-disable-next-line no-restricted-properties
    return JSON.parse(jsonData) as T;
  } catch (err) {
    // Potential errors:
    //   * localStorage access may throw a SecurityError
    //   * bad JSON currently stored and fails to parse
  }

  return defaultValue;
}

export function readSavedArray<T>(key: string): T[] {
  const arr = readFromLocalStorage<T[]>(key, []);

  // in case the stored data was valid JSON but not an array
  if (Array.isArray(arr)) {
    return arr;
  }

  return [];
}

export function writeToLocalStorage<T>(key: string, value: T): void {
  const storedValue = JSON.stringify(value);

  try {
    // TODO(next author): Please use setLocalStorageKey from utilities/localStorage instead
    // eslint-disable-next-line no-restricted-properties
    window.localStorage.setItem(key, storedValue);
  } catch {
    // localStorage access may throw a SecurityError
  }
}

export function deleteFromLocalStorage(key: string): void {
  try {
    // TODO(next author): Please use clearLocalStorageKey from utilities/localStorage instead
    // eslint-disable-next-line no-restricted-properties
    window.localStorage.removeItem(key);
  } catch {
    // localStorage access may throw a SecurityError
  }
}
