import { createSlice } from '@reduxjs/toolkit';
import { joinSession } from './videoThunkAction';

const initialState = {
  OV: {},
  session: undefined,
  token: undefined,
  publisher: undefined,
  mainStreamManager: undefined,
  mySessionId: 'Session0',
  myUserName: 'jihyeok',
  subscribers: [],
  isVideoPublished: true,
  isAudioPublished: true
};

export const video = createSlice({
  name: 'video',
  initialState,
  reducers: {
    initOVSession: (state, action) => {
      console.log('action 찍기', action);
      state.OV = action.payload.OV;
      state.session = action.payload.session;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setPublisher: (state, action) => {
      state.publisher = action.payload.publisher;
    },
    setMySessionId: (state, action) => {
      state.mySessionId = action.payload.mySessionId;
    },
    setMyUserName: (state, action) => {
      state.myUserName = action.payload.myUserName;
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
      state.OV = null;
      state.session = undefined;
      state.subscribers = [];
      state.mySessionId = 'SessionO';
      state.myUserName = 'Leave';
      state.mainStreamManager = undefined;
      state.publisher = undefined;
    },
    enteredSubscriber: (state, action) => {
      // console.log("여기가 문제라고??", action.payload)
      state.subscribers.push(action.payload);
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
      console.log('joinSession fulfilled', payload);

      state.mainStreamManager = payload.publisher;
      state.publisher = payload.publisher;
    });
    builder.addCase(joinSession.rejected, (state, { payload }) => {
      console.log('joinSession fulfilled');
    });
  }
});

export const {
  initOVSession,
  setToken,
  setPublisher,
  setMainStreamManager,
  setMySessionId,
  setMyUserName,
  setSubscribers,
  videoMute,
  audioMute,
  leaveSession,
  enteredSubscriber,
  deleteSubscriber
} = video.actions;

export default video.reducer;
