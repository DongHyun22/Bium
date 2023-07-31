import { createSlice } from '@reduxjs/toolkit';

// const initialStateValue= {email: "", password: ""}

const initialState = {
  email: '',
  password: '',
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo(state, action) {
      state.email = action.payload;
      state.password = action.payload;
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

export const { loginActions, setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } = userSlice.actions;

export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialStateValue= {email: "", password: ""}

// const userSlice = createSlice({
//     name: "user",
//     initialState: { value: initialStateValue},
//     reducers: {
//         getUserInfo(state,action) {
//             state.value = action.payload;
//         }
//     },
// });

// export const loginActions = userSlice.actions;

// export default userSlice.reducer;
