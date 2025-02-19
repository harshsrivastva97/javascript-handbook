import { configureStore } from '@reduxjs/toolkit';
import topicsDataMapReducer from './slices/topicsDataMapSlice';

const store = configureStore({
  reducer: {
    topicsData: topicsDataMapReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;