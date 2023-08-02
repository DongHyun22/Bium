import React from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ isLogin }) {
  /**
   * 로그인 했는지 여부
   * 로그인 했을 경우 : true 라는 텍스트 반환
   * 로그인 안했을 경우 : null or false(로그아웃 버튼 눌렀을경우 false로 설정) 반환
   */
  const isAuthenticated = useSelector((state) => state.user.token);

  if (isLogin) {
    // 인증이 반드시 필요한 페이지

    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    return isAuthenticated === null || isLogin === 'false' ? <Navigate to="/login" /> : <Outlet />;
  } else {
    // 인증이 반드시 필요 없는 페이지

    // 인증을 안했을 경우 해당 페이지로 인증을 한 상태일 경우 main페이지로
    return isAuthenticated === null || isLogin === 'false' ? <Outlet /> : <Navigate to="/" />;
  }
}
