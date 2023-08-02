import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavBar = () => {
  const userEmail = useSelector((state) => state.user.userEmail);

  return (
    <div>
      <Link to="/login">로그인/ </Link>
      <Link to="/signup">회원가입/ </Link>
      <Link to="/createroom">게임방 생성/ </Link>
      <Link to="/gameroomlist">게임룸 보기/ </Link>
      <Link to="/gameroom">게임방입장/ </Link>
      {userEmail && <Link to={`/profile/${userEmail}`}>프로필 화면/ </Link>}
    </div>
  );
};

export default NavBar;
