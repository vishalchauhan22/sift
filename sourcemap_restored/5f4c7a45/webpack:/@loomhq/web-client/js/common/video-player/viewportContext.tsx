import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { getRectSize, debounce } from './hooks';

type ViewportContextValue = {
  width: number;
  height: number;
};

const DEFAULT_CONTEXT_VALUE = {
  width: 0,
  height: 0,
};
const Context = React.createContext<ViewportContextValue>(
  DEFAULT_CONTEXT_VALUE
);

// eslint-disable-next-line  react/display-name
export const ViewportContextProvider = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  const [viewportValue, setViewportValue] =
    React.useState<ViewportContextValue>(DEFAULT_CONTEXT_VALUE);

  React.useLayoutEffect(() => {
    const observed = (ref as React.MutableRefObject<HTMLDivElement>).current;

    if (!observed) {
      return;
    }

    const rect = observed.getBoundingClientRect();

    setViewportValue({
      width: rect.width,
      height: rect.height,
    });

    const onResize = (entries: ResizeObserverEntry[]) => {
      const [entry] = entries || [];
      const { width, height } = getRectSize(entry);

      setViewportValue({ width, height });
    };

    const obs = new ResizeObserver(debounce(onResize, 100));

    obs.observe(observed);

    return () => {
      obs.disconnect();
    };
  }, [ref]);

  return <Context.Provider value={viewportValue}>{children}</Context.Provider>;
});

export const useViewportContext = (): ViewportContextValue => {
  return React.useContext(Context);
};
