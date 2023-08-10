import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import GameRoomListItem from './GameRoomListItemPage';
import { useDispatch } from 'react-redux';
import styles from './GameRoomList.module.css';

export const GameRoomListPage = () => {
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);

  const gemeRoomapi = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/game').then((response) => {
        console.log(response.data);
        setAllRooms(response.data);
      });
      // axios response
      // 방제목, 인원
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gemeRoomapi();
  }, []);

  return (
    <div>
      <div className={styles.containerTitle}>
        <div className={styles.title}>
          <h1>게임방 목록</h1>
          <a className={styles.BtnGameCreate}>
            <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"/>
            </svg>
          </a>
        </div>
        <div className={styles.search}>
          <input type="text" className={styles.search__input} placeholder="게임방 검색"></input>
          <button className={styles.search__button}>
            🔍  
          </button>
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
            <h2>안뜨는데?</h2>
          </>
        )}
      </div>
    </div>
  );
};
export default GameRoomListPage;
