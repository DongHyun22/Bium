import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../slices/userSlice';
import videoReducer from '../slices/video/videoAction';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    video: videoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
