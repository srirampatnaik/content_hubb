import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import contentSlice from './slices/contentSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    content: contentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;