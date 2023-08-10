import { createSlice } from '@reduxjs/toolkit';
import { joinSession } from './videoThunkActionSlice';

const initialState = {
  join: false,
  OV: null,
  session: '',
  token: undefined,
  publisher: undefined,
  subscribers: [],
  isVideoPublished: true,
  isAudioPublished: true
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setJoin: (state, action) => {
      state.join = action.payload;
    },
    initOVSession: (state, action) => {
      state.OV = action.payload.OV;
      state.session = action.payload.session;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setPublisher: (state, action) => {
      state.publisher = action.payload.publisher;
    },
    setSubscribers: (state, action) => {
      state.subscribers = action.payload.subscribers;
    },
    videoMute: (state) => {
      state.publisher.publishVideo(!state.isVideoPublished);
      state.isVideoPublished = !state.isVideoPublished;
      console.log('비디오', state.isVideoPublished);
    },
    audioMute: (state) => {
      state.publisher.publishAudio(!state.isAudioPublished);
      state.isAudioPublished = !state.isAudioPublished;
      console.log('오디오', state.isAudioPublished);
    },
    leaveSession: (state) => {
      const mySession = state.session;
      if (mySession) {
        mySession.disconnect();
      }
      state.join = false;
      state.OV = null;
      state.session = undefined;
      state.token = undefined;
      state.publisher = undefined;
      state.subscribers = [];
      state.isVideoPublished = true;
      state.isAudioPublished = true;
    },
    enteredSubscriber: (state, action) => {
      state.subscribers = [...state.subscribers, action.payload];
    },
    deleteSubscriber: (state, action) => {
      let index = state.subscribers.indexOf(action.payload, 0);
      if (index > -1) {
        state.subscribers.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(joinSession.fulfilled, (state, { payload }) => {
      state.publisher = payload.publisher;
    });
    builder.addCase(joinSession.rejected, (state, { payload }) => {});
  }
});

export const { setJoin, initOVSession, setToken, setPublisher, setMainStreamManager, setSubscribers, videoMute, audioMute, leaveSession, enteredSubscriber, deleteSubscriber } = videoSlice.actions;

export default videoSlice.reducer;
