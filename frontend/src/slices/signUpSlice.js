import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  passwordConfirm: '',
  name: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => { state.username = action.payload; },
    setPassword: (state, action) => { state.password = action.payload; },
    setPasswordConfirm: (state, action) => { state.passwordConfirm = action.payload; },
    setName: (state, action) => { state.name = action.payload; },
    setNickname: (state, action) => { state.nickname = action.payload; },
  },
});

export const { setUsername, setPassword, setPasswordConfirm, setName, setNickname } = userSlice.actions;

export default userSlice.reducer;
