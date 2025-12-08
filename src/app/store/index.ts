import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

import { createApi } from '../../shared/api/api';

export const api = createApi();

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
