export function objectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Compare two objects for equality, comparing their keys, values, and value types for equality.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 */
export function areObjectsEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Compare two lists of objects for equality.
 * Checks if they have the same length and if each object in the list is equal,
 * comparing their keys, values, value types, and order for equality.
 * @param list1 The first list of objects to compare.
 * @param list2 The second list of objects to compare.
 */
export function areListsOfObjectsEqual<T extends object>(
  list1: T[],
  list2: T[]
): boolean {
  if (list1.length !== list2.length) {
    return false;
  }

  for (let i = 0; i < list1.length; i++) {
    if (!areObjectsEqual(list1[i], list2[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Comparison function for FtuxStore objects.
 * Compares two FtuxStore objects by comparing their three arrays without caring about order.
 * @param previousStore The previous state object.
 * @param nextStore The next state object.
 * @returns true if the objects are equal, false otherwise.
 */
export function compareFtuxStore<T extends object>(
  previousStore: T,
  nextStore: T
): boolean {
  const prev = previousStore as any;
  const next = nextStore as any;

  return (
    areArraysEqualUnordered(
      prev.availableFtuxAnonymous,
      next.availableFtuxAnonymous
    ) &&
    areArraysEqualUnordered(prev.ftuxTriggered, next.ftuxTriggered) &&
    areArraysEqualUnordered(prev.visibleFtux, next.visibleFtux)
  );
}

/**
 * Compare two arrays for equality (to check if they contain the same items regardless of order).
 * Uses a Map to count occurrences of each item.
 * @param arr1 The first array to compare.
 * @param arr2 The second array to compare.
 * @returns true if the arrays contain the same items, false otherwise.
 */
function areArraysEqualUnordered<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (arr1.length === 0 && arr2.length === 0) {
    return true;
  }

  const countMap = new Map<string, number>();

  for (const item of arr1) {
    try {
      const key = JSON.stringify(item);
      countMap.set(key, (countMap.get(key) || 0) + 1);
    } catch (error) {
      console.error('Error stringifying item:', item);
      console.error('Error:', error);
    }
  }

  for (const item of arr2) {
    try {
      const key = JSON.stringify(item);
      const itemCount = countMap.get(key);
      if (itemCount === undefined || itemCount === 0) {
        return false;
      }
      countMap.set(key, itemCount - 1);
    } catch (error) {
      console.error('Error stringifying item:', item);
      console.error('Error:', error);
      return false;
    }
  }

  return Array.from(countMap.values()).every(itemCount => itemCount === 0);
}
