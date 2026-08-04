import React from 'react';

export const useMount = (fn: () => void): void => {
  React.useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
