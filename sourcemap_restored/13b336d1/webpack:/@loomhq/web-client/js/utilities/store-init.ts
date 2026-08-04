import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit';

import type { Middleware, Reducer } from 'redux';

export let store: EnhancedStore<any, any, any> | null = null;

export const configure = (
  reducer: Reducer,
  additionalMiddleware: Middleware[] = []
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => {
  const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  });

  if (additionalMiddleware.length > 0) {
    middleware.push(...additionalMiddleware);
  }

  store = configureStore({
    reducer,
    middleware,
  });

  return store;
};
