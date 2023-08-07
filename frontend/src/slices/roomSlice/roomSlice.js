import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomTitle: '',
  roomPassword: '',
  mySessionId: '',
  myUserName: 'jihyeok',
  maxPeople: 8,
  backgroundImage: 1,
  start: false
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setStart: (state, action) => {
      console.log('actrionㅅ;ㄹ헹', action.payload);
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

export const { setStart, setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
