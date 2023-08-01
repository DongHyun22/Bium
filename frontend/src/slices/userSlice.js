import { createSlice } from '@reduxjs/toolkit';

// const initialStateValue= {email: "", password: ""}

const initialState = {
  nickname: '',
  todayBium: 0,
  totalBium: 0,
  imageId: null,
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.nickname = action.payload;
      console.log(action.payload);
      state.todayBium = action.payload;
      state.totalBium = action.payload;
      state.imageId = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setIsLoginError(state, action) {
      state.isLoginError = action.payload;
    },
    setIsValidToken(state, action) {
      state.isValidToken = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    }
  }
});

export const { setProfile, setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
