import { setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } from './userSlice';
import jwtDecode from 'jwt-decode';
import { login, findById, tokenRegeneration } from './login';

// 사용자 로그인 처리 함수
export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await login(user);
    if (response.message === 'success') {
      console.log(response.data);
      const { accessToken: accessToken, refreshToken: refreshToken } = response;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));
    } else {
      dispatch(setIsLogin(false));
      dispatch(setIsLoginError(true));
      dispatch(setIsValidToken(false));
    }
  } catch (error) {
    console.log(error);
  }
};

// 사용자 정보를 가져오는 동작 처리 함수
export const getUserInfo = (token) => async (dispatch) => {
  try {
    const decodedToken = jwtDecode(token);
    const response = await findById(decodedToken.sub);
    if (response.message === 'success') {
      // 토큰이 유효하다면 setUserInfo 액션을 디스패치하여 사용자 정보를 가져와 상태를 업데이트
      dispatch(setUserInfo(response.userInfo));
    } else {
      console.log('유저 정보 없음');
    }
  } catch (error) {
    console.error('토큰 만료되어 사용 불가능', error.response.status);
    dispatch(setIsValidToken(false));
    await dispatch(tokenRegeneration());
  }
};

// 토큰 갱신 동작 처리 함수
export const tokenRegenerationAction = () => async (dispatch, getState) => {
  try {
    console.log(dispatch, getState);
    const state = getState();
    console.log('토큰 재발급 >> 기존 토큰 정보: ', sessionStorage.getItem('accessToken'));
    const response = await tokenRegeneration(JSON.stringfy(state.user.userInfo));
    if (response.message === 'success') {
      const { accessToken: accessToken } = response;
      sessionStorage.setItem('accessToken', accessToken);
      dispatch(setIsValidToken(true));
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log('갱신 실패');
    }
  }
};
