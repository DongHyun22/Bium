import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <Link to="/login">로그인/ </Link>
      <Link to="/signup">회원가입/ </Link>
      <Link to="/createroom">게임방 생성/ </Link>
      <Link to="/room">게임방입장/ </Link>
      <Link to="/profile/:nickname">프로필 화면/ </Link>
      <Link to="/gameready"> 게임방 생성/ </Link>
      <Link to="/gamemake"> 메이크/ </Link>
    </div>
  );
};

export default NavBar;
