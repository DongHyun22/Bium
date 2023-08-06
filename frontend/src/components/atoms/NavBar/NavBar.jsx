import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLogin, setToken } from '../../../slices/userSlice';

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userEmail = useSelector((state) => state.user.userEmail);

  return (
    <div>
      {/* {token === null ? ( */}
      <>
        <Link to="/login">로그인/ </Link>
        <Link to="/signup">회원가입/ </Link>
      </>
      {/* ) : ( */}
      <>
        <button
          onClick={() => {
            sessionStorage.removeItem('accessToken');
            dispatch(setToken(sessionStorage.getItem('accessToken')));
            dispatch(setIsLogin(false));
            navigate('/');
          }}
        >
          로그아웃
        </button>
        <Link to="/createroom">게임방 생성/ </Link>
        <Link to="/gameroomlist">게임룸 보기/ </Link>
        <Link to="/gameroom">게임방입장/ </Link>
        <Link to={`/profile/${userEmail}`} key={userEmail}>
          프로필 화면/{' '}
        </Link>
      </>
      {/* )} */}
    </div>
  );
};

export default NavBar;
