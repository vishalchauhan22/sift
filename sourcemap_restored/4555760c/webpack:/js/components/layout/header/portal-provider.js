/* eslint-disable @loomhq/loom/no-js-extension */
import React, { createContext, useState } from 'react';

export const HeaderPortalContext = createContext(null);

// eslint-disable-next-line import/no-default-export
export default function HeaderPortalProvider({ children }) {
  const [headerPortalContext, setHeaderPortalContext] = useState({
    children: null,
  });

  const context = { headerPortalContext, setHeaderPortalContext };

  return (
    <HeaderPortalContext.Provider value={context}>
      {children}
    </HeaderPortalContext.Provider>
  );
}
