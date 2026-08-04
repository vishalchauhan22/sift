import { useEffect, useRef } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useClickOutside(
  callback: (...args) => void,
  excludesClass?: string,
  passTargetClass = false
): React.MutableRefObject<any> {
  const ref: React.MutableRefObject<any> = useRef(null);

  useEffect(
    () => {
      const handleClickOutside = event => {
        const currentRef = ref.current;

        const hasExcludedClass =
          excludesClass &&
          event.target.className &&
          event.target.className.includes &&
          event.target.className.includes(excludesClass);

        if (
          currentRef &&
          !currentRef.contains(event.target) &&
          !hasExcludedClass
        ) {
          passTargetClass ? callback(event.target.className) : callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, // TODO(next author): Please update this hook to fix dependency issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, callback]
  );

  return ref;
}
