import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <Link to="/api/login">로그인/ </Link>
      <Link to="/api/signup">회원가입/ </Link>
      <Link to="/api/createroom">게임방 생성/ </Link>
      <Link to="/api/room">게임방입장/ </Link>
      <Link to="/api/profile/:nickname">프로필 화면</Link>
    </div>
  );
};
