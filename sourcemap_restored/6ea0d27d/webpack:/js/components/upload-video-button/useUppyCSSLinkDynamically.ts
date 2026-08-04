import { useEffect, useState } from 'react';

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const useUppyCSSLinkDynamically = (): string => {
  const UPPY_URL = 'https://releases.transloadit.com/uppy/v3.14.0/uppy.min.css';

  const url = UPPY_URL;

  const [state, setState] = useState(url ? 'loading' : 'idle');

  useEffect(() => {
    if (!url) {
      setState('idle');

      return;
    }

    let link = document.querySelector(
      `link[href="${url}"]`
    ) as HTMLLinkElement | null;

    const handleLink = (e: Event) => {
      setState(e.type === 'load' ? 'ready' : 'error');
    };

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('href', url);
      link.setAttribute('rel', 'stylesheet');
      document.head.prepend(link);
    }

    link.addEventListener('load', handleLink);
    link.addEventListener('error', handleLink);

    return () => {
      if (link) {
        link.removeEventListener('load', handleLink);
        link.removeEventListener('error', handleLink);
      }
    };
  }, [url]);

  return state;
};
