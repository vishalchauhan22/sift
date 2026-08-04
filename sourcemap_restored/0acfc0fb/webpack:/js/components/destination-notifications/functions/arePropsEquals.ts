import isEqual from 'lodash/isEqual';

/**
 * Checks if all properties and values in props2 (the subset) are present and equal in props1 (the original).
 * Ignores the __typename property and performs a deep comparison for nested objects.
 *
 * @param props1 - The original object (should contain at least all fields in props2)
 * @param props2 - The subset object (fields to check for in props1)
 * @returns true if props2 is a deep subset of props1, false otherwise
 */
export function arePropsEqual(
  props1: Record<string, any>,
  props2: Record<string, any>
): boolean {
  if (!props1 || !props2) {
    return false;
  }

  function isSubset(original: any, subset: any, path: string[] = []): boolean {
    // If subset is not an object (primitive or null), compare values directly
    if (typeof subset !== 'object' || subset === null) {
      return isEqual(original, subset);
    }

    for (const key of Object.keys(subset)) {
      if (key === '__typename') {
        continue;
      }
      // If the key is missing in the original, it's not a subset
      if (!(key in original)) {
        return false;
      }
      // Recursively check nested objects/values
      if (!isSubset(original[key], subset[key], path.concat(key))) {
        return false;
      }
    }
    // All keys/values in subset matched in original
    return true;
  }

  return isSubset(props1, props2);
}
