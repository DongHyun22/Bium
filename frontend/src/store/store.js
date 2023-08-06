import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import userReducer from '../slices/userSlice';
import videoReducer from '../slices/videoSlice/videoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
