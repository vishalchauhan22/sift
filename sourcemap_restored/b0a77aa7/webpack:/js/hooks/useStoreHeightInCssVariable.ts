import { useEffect } from 'react';
import useResizeObserver from 'use-resize-observer';

export const useStoreHeightInCssVariable = (
  ref: React.RefObject<HTMLHeadElement>,
  propName: string
): void => {
  const { height } = useResizeObserver<HTMLElement>({ ref });

  useEffect(() => {
    document.body.style.setProperty(propName, `${height || 0}px`);
  }, [height, propName]);
};
