import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import topicsReducer from './slices/librarySlice';
import snippetsReducer from './slices/snippetsSlice';
import blogsReducer from './slices/blogsSlice';
import progressReducer from './slices/progressSlice';

const store = configureStore({
  reducer: {
    userData: userReducer,
    topicsData: topicsReducer,
    snippets: snippetsReducer,
    blogs: blogsReducer,
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;