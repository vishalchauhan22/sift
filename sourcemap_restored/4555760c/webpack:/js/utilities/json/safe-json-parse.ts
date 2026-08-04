export type ParsedJsonValidator<T> = (parsedValue: unknown) => parsedValue is T;

interface BaseParseResult<T> {
  value?: T;
  error?: Error;
}

interface ErrorParseResult<T> extends BaseParseResult<T> {
  error: Error;
  value: undefined;
}

interface SuccessfulParseResult<T> extends BaseParseResult<T> {
  value: T;
  error: undefined;
}

export type ParseResult<T> = SuccessfulParseResult<T> | ErrorParseResult<T>;

/**
 * JSON.parse but instead of throwing an error it will return that error.
 * Please note that you still need to safely access the jsonString, e.g. if it is coming from localStorage.
 * This function does not validate that your data is the correct type or shape unless you provide an isValid fn
 * @param jsonString The input string to parse
 * @param isValid optional function retruning a type predicate indicating if the parsed json matches the expected return type
 */
export function jsonParse<T>(
  jsonString: string,
  isValid: ParsedJsonValidator<T> = (
    _parsedValue: unknown
  ): _parsedValue is T => true
): ParseResult<T> {
  try {
    // eslint-disable-next-line no-restricted-properties
    const parsedValue = JSON.parse(jsonString);

    if (isValid(parsedValue)) {
      return { value: parsedValue, error: undefined };
    }

    return {
      value: undefined,
      error: new Error('Parsed value was not valid'),
    };
  } catch (error) {
    return { value: undefined, error };
  }
}

/**
 * JSON.parse but instead of throwing an error it will return a provided value.
 * Please note that you still need to safely access the jsonString, e.g. if it is coming from localStorage.
 * This function does not validate that your data is the correct type or shape unless you provide an isValid fn
 * @param defaultValue The value to return if the json string is not parseable
 * @param jsonString The input string to parse
 * @param isValid optional function returning a type predicate indicating if the parsed json matches the expected return type
 */
export function jsonParseOrDefault<T>(
  jsonString: string,
  defaultValue: T,
  isValid?: ParsedJsonValidator<T>
): T {
  const parsed = jsonParse<T>(jsonString, isValid);

  if (parsed.error) {
    return defaultValue;
  }

  return parsed.value;
}

/**
 * For use only within code that has separate error handling
 * @param jsonString The input string to parse
 * @returns the parse result
 * @throws SyntaxError if the provided string is not parseable as json
 */
export function jsonParseUnsafeThrows<T>(jsonString: string): T {
  // eslint-disable-next-line no-restricted-properties
  return JSON.parse(jsonString);
}
