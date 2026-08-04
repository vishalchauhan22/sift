import { RefObject, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useIsVisible(): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // we use an intersection observer to figure out whether or not we have scrolled past a ref
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      // threshold is set to 1 (or 100%), which means that the intersection observer returns true
      // only when you can see the whole element the ref is pointing to
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return [ref, visible];
}
