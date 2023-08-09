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
  gameId: null,
  gameRoomId: '',
  gameFallCount: 6
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setGameFallCount: (state, action) => {
      state.gameFallCount = action.payload;
    },
    setGameRoomId: (state, action) => {
      state.gameRoomId = action.payload;
    },
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setStart: (state, action) => {
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

export const { setGameId, setGameFallCount, setGameRoomId, setHost, setStart, setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
