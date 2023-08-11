import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameRoomListItem from './GameRoomListItemPage';
import { useDispatch } from 'react-redux';
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

export const GameRoomListPage = () => {
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);

  const gemeRoomapi = async () => {
    try {
      const response = await axios.get(APPLICATION_SERVER_URL + '/api/game').then((response) => {
        setAllRooms(response.data);
      });
      // axios response
      // 방제목, 인원
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    gemeRoomapi();
  }, []);

  return (
    <div>
      <h1>게임방 목록</h1>
      {allRooms !== [] ? (
        <>
          {allRooms.map((allRoom, index) => {
            return <GameRoomListItem key={index} allRoom={allRoom}></GameRoomListItem>;
          })}
        </>
      ) : (
        <>
          <h2>방이 없어요?</h2>
        </>
      )}
    </div>
  );
};
export default GameRoomListPage;
