import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [token, setToken] = useState(sessionStorage.getItem('accessToken'));
  console.log('token', token);
  return (
    <div>
      {token === null ? (
        <>
          <Link to="/login">로그인/ </Link>
          <Link to="/signup">회원가입/ </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              sessionStorage.removeItem('accessToken');
              setToken(null);
              navigate('/');
            }}
          >
            로그아웃
          </button>
          <Link to="/createroom">게임방 생성/ </Link>
          <Link to="/gameroomlist">게임룸 보기/ </Link>
          <Link to="/gameroom">게임방입장/ </Link>
          <Link to="/profile/:nickname">프로필 화면/ </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
