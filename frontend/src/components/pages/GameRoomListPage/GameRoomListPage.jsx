import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameRoomListItem from './GameRoomListItemPage';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './GameRoomList.module.css';
import { Fab, Action } from 'react-tiny-fab';
import { setIsLogin, setToken, setUserEmail, logoutUser } from '../../../slices/userSlice';
import { PURGE } from 'redux-persist';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

export const GameRoomListPage = () => {
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.userEmail);

  const gemeRoomapi = async () => {
    try {
      const response = await axios.get(APPLICATION_SERVER_URL + '/api/game').then((response) => {
        setAllRooms(response.data);
      });
      // axios response
      // 방제목, 인원
    } catch (err) {
      console.log('오류 떴어 .....해결하렴....');
      console.log(err);
      return;
    }
  };
  useEffect(() => {
    gemeRoomapi();
  }, []);

  const goToMyPage = () => {
    navigate(`/profile/${userEmail}`);
  };

  const logout = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem('accessToken');
    dispatch(setToken(null));
    dispatch(setUserEmail(''));
    dispatch(setIsLogin(false));
    dispatch(logoutUser());
    dispatch({ type: PURGE, key: 'root', result: () => null });
    // navigate('/');
  };

  return (
    <>
      <div className={styles.containerTitle}>
        <div className={styles.title}>
          <h1>게임방 목록</h1>
          <Link to="/createroom">
            <div className={styles.BtnGameCreate}>
              <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <path fill="#000" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z" />
              </svg>
            </div>
          </Link>
        </div>
        <div className={styles.search}>
          <input type="text" className={styles.search__input} placeholder="게임방 검색"></input>
          <button className={styles.search__button}>🔍</button>
        </div>
      </div>
      <div className={styles.containerItems}>
        {allRooms !== [] ? (
          <>
            {allRooms.map((allRoom, index) => {
              return <GameRoomListItem key={index} allRoom={allRoom}></GameRoomListItem>;
            })}
          </>
        ) : (
          <>
            <h2>생성된 게임방이 없습니다.</h2>
            <h2>+ 버튼을 통해 게임방을 만들어요!</h2>
          </>
        )}
      </div>

      <Fab alwaysShowTitle={true} icon="👤">
        <Action text="마이페이지" onClick={goToMyPage}>
          🙂
        </Action>
        <Action text="로그아웃" onClick={logout}>
          💨
        </Action>
      </Fab>
    </>
  );
};
export default GameRoomListPage;
