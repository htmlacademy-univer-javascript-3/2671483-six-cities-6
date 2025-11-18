import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const setupStore = () => configureStore({
  reducer: rootReducer
});

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
