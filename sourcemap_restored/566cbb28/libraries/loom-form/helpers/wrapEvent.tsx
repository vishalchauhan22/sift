type HandlerFn<E> = (event: E) => void;

export function wrapEvent<E>(
  theirHandler?: HandlerFn<E>,
  ourHandler?: HandlerFn<E>
): (event: E) => void {
  return event => {
    try {
      ourHandler && ourHandler(event);
    } finally {
      theirHandler && theirHandler(event);
    }
  };
}
