import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const initialState = {
  token: sessionStorage.getItem('accessToken'),
  userEmail: '',
  nickname: '',
  todayBium: 0,
  totalBium: 0,
  imageId: null,
  disturb: null,
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false,
  profileImage: null,
  rank: 0
};

const persistConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['token', 'userEmail', 'nickname', 'todayBium', 'totalBium', 'imageId', 'disturb', 'isLogin', 'profileImage', 'rank']
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
    setDisturb(state, action) {
      state.disturb = action.payload;
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
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setRank: (state, action) => {
      state.rank = action.payload;
    },
    logoutUser(state) {
      return initialState;
    }
  }
});

export const { setToken, setUserEmail, setNickname, setTodayBium, setTotalBium, setImageId, setDisturb, setIsLogin, setIsLoginError, setIsValidToken, setUserInfo, setProfileImage, setRank, logoutUser } = userSlice.actions;

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export default persistedReducer;
