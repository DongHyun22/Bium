import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomTitle: '',
  roomPassword: '',
  mySessionId: '',
  myUserName: '',
  maxPeople: '8',
  backgroundImage: '1',
  start: false,
  host: false,
  gameId: null,
  gameRoomId: '',
  gameFallCount: 0,
  biumSecond: 0,
  gameRankList: null,
  rankModal: false
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRankModal: (state, action) => {
      state.rankModal = action.payload;
    },
    setGameRankList: (state, action) => {
      state.gameRankList = action.payload;
    },
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
      state.maxPeople = action.payload;
    },
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    }
  }
});

export const {
  setRankModal,
  setGameRankList,
  setBiumSecond,
  setGameFallCount,
  setGameId,
  setGameRoomId,
  setHost,
  setStart,
  setRoomTitle,
  setRoomPassword,
  setMySessionId,
  setMyUserName,
  setMaxPeople,
  setBackgroundImage
} = roomSlice.actions;

export default roomSlice.reducer;
