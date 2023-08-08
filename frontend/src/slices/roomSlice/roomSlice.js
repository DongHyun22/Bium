import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomTitle: '',
  roomPassword: '',
  mySessionId: '',
  myUserName: 'jihyeok',
  maxPeople: 8,
  backgroundImage: 1,
  start: false,
  host: false,
  gameRoomId: '',
  gameFallCount: 0
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setGameFallCount: (state, action) => {
      console.log('fallCount Action !!!!!', action.payload);
      state.gameFallCount = action.payload;
    },
    setGameRoomId: (state, action) => {
      console.log('gameroom Action !!!!!', action.payload);
      state.gameRoomId = action.payload;
    },
    setHost: (state, action) => {
      console.log('host Action !!!!!', action.payload);
      state.host = action.payload;
    },
    setStart: (state, action) => {
      console.log('start Action!!!!!!', action.payload);
      state.start = action.payload;
    },
    setRoomTitle: (state, action) => {
      state.roomTitle = action.payload.gameRoomTitle;
    },
    setRoomPassword: (state, action) => {
      state.roomPassword = action.payload.roompassword;
    },
    setMySessionId: (state, action) => {
      state.mySessionId = action.payload;
    },
    setMyUserName: (state, action) => {
      state.myUserName = action.payload.myUserName;
    },
    setMaxPeople: (state, action) => {
      state.join = action.payload;
    },
    setBackgroundImage: (state, action) => {
      state.join = action.payload;
    }
  }
});

export const { setGameFallCount, setGameRoomId, setHost, setStart, setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
