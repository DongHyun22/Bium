import { createSlice } from '@reduxjs/toolkit';

// const initialStateValue= {email: "", password: ""}

const initialState = {
  token: sessionStorage.getItem('accessToken'),
  userEmail: '',
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
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setTodayBium(state, action) {
      state.todayBium = action.payload;
    },
    setTotalBium(state, action) {
      state.totalBium = action.payload;
    },
    setImageId(state, action) {
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

export const {
  setToken,
  setUserEmail,
  setNickname,
  setTodayBium,
  setTotalBium,
  setImageId,
  setIsLogin,
  setIsLoginError,
  setIsValidToken,
  setUserInfo
} = userSlice.actions;
export default userSlice.reducer;
