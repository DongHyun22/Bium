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
  gameFallCount: 0,
  biumSecond: 0
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setBiumSecond: (state, action) => {
      state.biumSecond = state.biumSecond + action.payload;
    },
    setGameFallCount: (state, action) => {
      state.gameFallCount = state.gameFallCount + action.payload;
    },
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setGameRoomId: (state, action) => {
      state.gameRoomId = action.payload;
    },
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setStart: (state, action) => {
      console.log('타이머 바뀜', action.payload);
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

export const { setBiumSecond, setGameFallCount, setGameId, setGameRoomId, setHost, setStart, setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } =
  roomSlice.actions;

export default roomSlice.reducer;
