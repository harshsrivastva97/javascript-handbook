import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import topicsDataMapReducer from './slices/topicsDataMapSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    topicsData: topicsDataMapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;