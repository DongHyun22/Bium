import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  roomTitle: '',
  roomPassword: '',
  mySessionId: '',
  myUserName: 'jihyeok',
  maxPeople: 8,
  backgroundImage: 1
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomTitle: (state, action) => {
      state.roomTitle = action.payload.gameRoomTitle;
    },
    setRoomPassword: (state, action) => {
      state.roomPassword = action.payload.roompassword;
    },
    setMySessionId: (state, action) => {
      console.log('actioooon  실행중', action.payload);
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

export const { setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
