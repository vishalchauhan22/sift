/* eslint-disable @loomhq/loom/no-js-extension */
import React, { useEffect } from 'react';

import { HeaderPortalContext } from './portal-provider';

const PortalDestination = ({ children, setHeaderPortalContext }) => {
  useEffect(() => {
    setHeaderPortalContext({
      children,
    });

    return () =>
      setHeaderPortalContext({
        children: null,
      });
  }, [children, setHeaderPortalContext]);

  return null;
};

// eslint-disable-next-line import/no-default-export
export default function HeaderPortal({ children }) {
  return (
    <HeaderPortalContext.Consumer>
      {({ setHeaderPortalContext }) => (
        <PortalDestination setHeaderPortalContext={setHeaderPortalContext}>
          {children}
        </PortalDestination>
      )}
    </HeaderPortalContext.Consumer>
  );
}
