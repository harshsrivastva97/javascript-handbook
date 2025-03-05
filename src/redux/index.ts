import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import topicsReducer from './slices/topicsSlice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    topicsData: topicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;