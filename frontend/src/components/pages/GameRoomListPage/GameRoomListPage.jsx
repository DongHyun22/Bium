import React, { useState } from 'react';
import axios from 'axios';
import GameRoomListItem from './GameRoomListItemPage';
import { useDispatch } from 'react-redux';

export const GameRoomListPage = async () => {
  const dispatch = useDispatch();
  try {
    const allRoom = await axios.get('url');
    // axios response
    // 방제목, 인원
    console.log(allRoom);
  } catch (err) {
    return;
  }

  const enterRoom = () => {};
  return (
    <div>
      <GameRoomListItem allRoom onClick={enterRoom}></GameRoomListItem>
    </div>
  );
};
export default GameRoomListPage;
