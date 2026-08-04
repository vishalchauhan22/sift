import React from 'react';

export const useUnmount = (fn: () => void): void => {
  const refFn = React.useRef(fn);

  // update the ref each render so if it change the newest callback will be invoked
  refFn.current = fn;

  React.useEffect(() => {
    return () => refFn.current();
  }, []);
};
