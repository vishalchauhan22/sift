import React, { ReactNode, createContext } from 'react';

import { useSharePageRumContext } from '@js/utilities/rum/ShareVideoFreshRUMWrapper';

import { PageNames } from './constants';

type PageContextType = {
  pageName: PageNames;
  defaultLoggingValues: Record<string, any>;
};

export const PageContext = createContext<PageContextType | undefined>({
  pageName: PageNames.UNDETERMINED,
  defaultLoggingValues: {},
});

interface PageContextProviderProps {
  children: ReactNode;
  pageName: PageNames;
}

export const PageContextProvider = ({
  children,
  pageName,
}: PageContextProviderProps): JSX.Element => {
  const shareDefaultLoggingValues = useSharePageRumContext();
  let defaultLoggingValues: Record<string, any>;

  switch (pageName) {
    case PageNames.SHARE:
      defaultLoggingValues = shareDefaultLoggingValues;
      break;

    default:
      defaultLoggingValues = {};
  }

  return (
    <PageContext.Provider value={{ pageName, defaultLoggingValues }}>
      {children}
    </PageContext.Provider>
  );
};
