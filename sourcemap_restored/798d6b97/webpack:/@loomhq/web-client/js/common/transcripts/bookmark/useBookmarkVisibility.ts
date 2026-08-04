// Shows whether a bookmark is visible and allows passing in a callback to update the visibility

import { useEffect, RefCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const VISIBILITY_THRESHOLD = 0.1;

type UseBookmarkVisibilityProps = {
  onVisibilityChange: (isVisible: boolean) => void;
  initialInView?: boolean;
};

export const useBookmarkVisibility = ({
  onVisibilityChange,
  initialInView = false,
}: UseBookmarkVisibilityProps): RefCallback<Element> => {
  const { ref, inView } = useInView({
    threshold: VISIBILITY_THRESHOLD,
    triggerOnce: false,
    initialInView,
  });

  useEffect(() => {
    onVisibilityChange(inView);
  }, [inView, onVisibilityChange]);

  return ref;
};
