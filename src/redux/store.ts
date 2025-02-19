import { configureStore } from '@reduxjs/toolkit';
import topicsDataReducer from './slices/topicsDataMap.slice';

export const store = configureStore({
  reducer: {
    topicsData: topicsDataReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 