import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../slices/userSlice';
import videoReducer from '../slices/videoSlice/videoSlice';
import roomReducer from '../slices/roomSlice/roomSlice';

export const store = configureStore(
  {
    reducer: {
      user: userReducer,
      video: videoReducer,
      room: roomReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
