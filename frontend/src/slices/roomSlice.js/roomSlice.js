import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomName: '',
  roomPassword: '',
  mySessionId: 'Session0',
  myUserName: 'jihyeok',
  maxPeople: 8,
  backgroundImage: 1
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomName: (state, action) => {
      state.roomName = action.payload.roomName;
    },
    setRoomPassword: (state, action) => {
      state.roomPassword = action.payload.roompassword;
    },
    setMySessionId: (state, action) => {
      state.mySessionId = action.payload.mySessionId;
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

export const { setRoomName, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } = roomSlice.actions;

export default roomSlice.reducer;
