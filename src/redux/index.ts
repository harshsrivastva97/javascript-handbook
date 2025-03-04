import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import topicsReducer from './slices/topicsSlice';
import userProgressReducer from './slices/userProgressSlice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    topicsData: topicsReducer,
    userProgressData: userProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;