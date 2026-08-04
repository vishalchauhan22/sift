/* eslint-disable @loomhq/loom/no-js-extension */
import { useEffect } from 'react';

// eslint-disable-next-line import/no-default-export
export default function useInfiniteScroll(ref, fetchMore, threshold = 0.1) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const options = {
      threshold,
    };
    const callback = entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        fetchMore();
      }
    };

    const io = new IntersectionObserver(callback, options);

    ref.current && io.observe(ref.current);

    return () => io.disconnect();
  }, [ref, fetchMore, threshold]);
}
