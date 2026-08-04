import copy from 'copy-to-clipboard';
import React from 'react';

/**
 * Copies text to clipboard
 */
export function useClipboard(
  text: string,
  options: {
    successDuration?: number;
    format?: string;
  }
): [boolean, () => void] {
  const [isCopied, setIsCopied] = React.useState(false);
  const successDuration = options?.successDuration;
  const format = options?.format || 'text/plain';

  React.useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    () => {
      const didCopy = copy(text, { format });

      setIsCopied(didCopy);
    },
  ];
}
