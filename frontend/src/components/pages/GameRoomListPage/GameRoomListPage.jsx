import React, { useState } from 'react';
import axios from 'axios';
import GameRoomListItem from './GameRoomListItemPage';

export const GameRoomListPage = async () => {
  try {
    const allRoom = await axios.get('url');
    // axios response
    // 방제목, 인원
    console.log(allRoom);
  } catch (err) {
    return;
  }

  return (
    <div>
      <GameRoomListItem allRoom></GameRoomListItem>
    </div>
  );
};
export default GameRoomListPage;
