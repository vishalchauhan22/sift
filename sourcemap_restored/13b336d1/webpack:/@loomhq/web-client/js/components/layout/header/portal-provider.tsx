import React, { createContext, useState } from 'react';

type HeaderPortalContextType = { children: any };
export const HeaderPortalContext = createContext<{
  headerPortalContext: HeaderPortalContextType;
  setHeaderPortalContext: React.Dispatch<
    React.SetStateAction<HeaderPortalContextType>
  >;
} | null>(null);

// eslint-disable-next-line import/no-default-export
export default function HeaderPortalProvider({
  children,
}: React.PropsWithChildren): React.ReactElement {
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
