import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userMail: '',
  password: '',
  passwordConfirm: '',
  name: '',
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserMail: (state, action) => { state.userMail = action.payload; },
    setPassword: (state, action) => { state.password = action.payload; },
    setPasswordConfirm: (state, action) => { state.passwordConfirm = action.payload; },
    setName: (state, action) => { state.name = action.payload; },
    setNickname: (state, action) => { state.nickname = action.payload; },
  },
});

export const { setUserMail, setPassword, setPasswordConfirm, setName, setNickname } = userSlice.actions;

export default userSlice.reducer;
