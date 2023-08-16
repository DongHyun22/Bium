import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomTitle: '',
  roomPassword: '',
  mySessionId: '',
  myUserName: '',
  maxPeople: '4',
  backgroundImage: '1',
  start: false,
  host: false,
  gameId: null,
  gameRoomId: '',
  gameFallCount: 0,
  biumSecond: 0,
  gameRankList: null,
  rankModal: false,
  errorSolve: false,
  disturb: false
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    leaveRoom: (state) => {
      console.log('실행완료욤');
      state.start = false;
      state.mySessionId = '';
      state.gameId = null;
      state.token = undefined;
      state.host = false;
      state.gameFallCount = 0;
      state.biumSecond = 0;
      state.gameRankList = 0;
      state.rankModal = false;
      state.errorSolve = false;
      state.disturb = false;
    },
    setDisturb: (state, action) => {
      state.disturb = action.payload;
    },
    setErrorSolve: (state, action) => {
      state.errorSolve = action.payload;
    },
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
      state.roomTitle = action.payload;
    },
    setRoomPassword: (state, action) => {
      state.roomPassword = action.payload;
    },
    setMySessionId: (state, action) => {
      state.mySessionId = action.payload;
    },
    setMyUserName: (state, action) => {
      state.myUserName = action.payload;
    },
    setMaxPeople: (state, action) => {
      state.maxPeople = action.payload;
    },
    setBackgroundImage: (state, action) => {
      console.log('백이미지 당장당장 확인', action.payload);
      state.backgroundImage = action.payload;
    }
  }
});

export const { setDisturb, leaveRoom, setErrorSolve, setRankModal, setGameRankList, setBiumSecond, setGameFallCount, setGameId, setGameRoomId, setHost, setStart, setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
