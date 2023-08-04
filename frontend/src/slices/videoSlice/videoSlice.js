import { createSlice } from '@reduxjs/toolkit';
import { joinSession } from './videoThunkActionSlice';

const initialState = {
  join: false,
  roomName: '',
  OV: null,
  session: undefined,
  token: undefined,
  publisher: undefined,
  maxPeople: 8,
  backgroundImage: 1,

  mySessionId: 'Session0',
  myUserName: 'jihyeok',
  subscribers: [],
  isVideoPublished: true,
  isAudioPublished: true,
  roomPassword: null
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setBackgroundImage: (state, action) => {
      state.join = action.payload;
    },
    setMaxPeople: (state, action) => {
      state.join = action.payload;
    },
    setJoin: (state, action) => {
      state.join = action.payload;
    },
    setRoomPassword: (state, action) => {
      state.roomPassword = action.payload.roompassword;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload.roomName;
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
      state.maxPeople = 8;
      state.join = false;
      state.roomName = null;
      state.OV = null;
      state.session = undefined;
      state.token = undefined;
      state.publisher = undefined;
      state.mainStreamManager = undefined;
      state.mySessionId = 'Session0';
      state.myUserName = 'jihyeok';
      state.subscribers = [];
      state.isVideoPublished = true;
      state.isAudioPublished = true;
      state.roomPassword = '';
    },
    enteredSubscriber: (state, action) => {
      // console.log("여기가 문제라고??", action.payload)
      state.subscribers = [...state.subscribers, action.payload];
      // state.subscribers.push(action.payload)
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
      console.log('joinSession rejected');
    });
  }
});

export const {
  setBackgroundImage,
  setMaxPeople,
  setJoin,
  setRoomPassword,
  setRoomName,
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
} = videoSlice.actions;

export default videoSlice.reducer;
