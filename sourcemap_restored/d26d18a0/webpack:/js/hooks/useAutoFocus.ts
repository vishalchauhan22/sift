import { useEffect } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useAutoFocus(
  ref: React.RefObject<HTMLInputElement>,
  setCursorToEnd = false
): void {
  useEffect(() => {
    if (ref.current) {
      if (setCursorToEnd) {
        const length = ref.current.value.length;

        ref.current.setSelectionRange(length, length);
      }

      ref.current.focus();
    }
  }, [ref, setCursorToEnd]);
}
