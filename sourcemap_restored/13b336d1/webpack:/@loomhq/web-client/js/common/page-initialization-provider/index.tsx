// Include ONLY services that are necessary for the app to start on every single page (e.g., auth or user-related). Services specific to a page (e.g., videos or screenshots) should be handled at the page level. Do not include services that are optional or can be rendered later in the lifecycle.
import { isProduction, SENTRY_ENABLED } from '@js/constants/environment';

import { EnhancedStore } from '@reduxjs/toolkit';

import { loadTheme } from '@js/common/themes';
import { createBrowserHistory } from 'history';
import { useGetUserCreator } from '@js/hooks/useGetUserCreator';
import React, { FC, createContext, useContext, useEffect } from 'react';
import * as logger from '@js/utilities/loggerx';

import { init as sentryInit } from '@js/utilities/sentry';
import { configure } from '@js/utilities/store-init';
import { getCookie } from '@js/utilities/cookieUtils';

import { routingUtils } from '@loomhq/shared-utilities';
import { Team } from '@loomhq/shared-utilities/constants/product';
import {
  EntityRoutingSessionCookie,
  SiteEntityId,
  SiteEntityType,
} from '@loomhq/shared-utilities/constants/siteEntities';
import sentryActionState from '@js/middleware/sentry';
import { createRootReducer } from '@js/reducers';

import { GraphQlProvider } from './GraphQlProvider';

import type { Middleware } from 'redux';
import { RequireCurrentUserLoaded } from '../current-user';

interface PageInitializationContextProps {
  // Intentional use of any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: EnhancedStore<any, any, any> | null;
  history?: ReturnType<typeof createBrowserHistory>;
  Sentry?: ReturnType<typeof sentryInit>;
}

const initialContextValue: PageInitializationContextProps = {
  store: null,
  history: undefined,
  Sentry: undefined,
};

const getEntityLookupMetadata = (
  entityType: SiteEntityType | undefined | null,
  entityId: SiteEntityId | undefined | null
):
  | { entityType: SiteEntityType; entityId: SiteEntityId | null }
  | undefined => {
  if (entityType && entityId !== undefined) {
    return { entityType, entityId };
  }

  // For non-production environment
  //  - This is to make sure that after initial login,
  //   all calls will have this look up but can be overriden by
  //   the parameters passed (see next line of code).
  //   We will remove this check once the global session storage is in place.
  if (!isProduction) {
    const entityRoutingSession = getCookie(EntityRoutingSessionCookie) as
      | string
      | undefined;

    if (entityRoutingSession) {
      try {
        return routingUtils.decodeEntityRoutingMetadata(entityRoutingSession);
      } catch (error) {
        logger.error(
          error,
          {
            message: 'Error while parsing entityRoutingSession',
          },
          {
            team: Team.EnterpriseReadiness,
          }
        );
      }
    }
  }

  return undefined;
};

export const PageInitializationContext =
  createContext<PageInitializationContextProps>(initialContextValue);

export const PageInitializationProvider: FC<
  React.PropsWithChildren<{
    entityType?: SiteEntityType | undefined | null;
    entityId?: SiteEntityId | undefined | null;
  }>
> = ({ entityType, entityId, children }) => {
  const Sentry = React.useRef(sentryInit());
  const history = React.useRef(createBrowserHistory());
  const middleware: Middleware[] = [];

  const entityLookupMetadata = getEntityLookupMetadata(entityType, entityId);

  if (SENTRY_ENABLED) {
    middleware.push(sentryActionState(Sentry.current));
  }

  const store = configure(createRootReducer(), middleware);
  const getUserCreator = useGetUserCreator();

  useEffect(() => {
    getUserCreator();
  }, [getUserCreator]);

  loadTheme();

  const setupData: PageInitializationContextProps = {
    store,
    history: history.current,
  };

  return (
    <PageInitializationContext.Provider value={setupData}>
      <GraphQlProvider entityLookupMetadata={entityLookupMetadata}>
        <RequireCurrentUserLoaded>{children}</RequireCurrentUserLoaded>
      </GraphQlProvider>
    </PageInitializationContext.Provider>
  );
};

type PageInitializationContextReturnType = {
  // Intentional use of any here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: EnhancedStore<any, any, any> | null;
  history: any;
};

export function usePageInitializationContext(): PageInitializationContextReturnType {
  const { store, history } = useContext(PageInitializationContext);

  return { store, history };
}
