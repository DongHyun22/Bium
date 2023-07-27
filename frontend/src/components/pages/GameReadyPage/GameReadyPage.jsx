import React from 'react';
import CreateGameItem from '../GameMakePage/GameMakeItem';

function GameReady(props) {
  return (
    <div>
      <h1>방 목록</h1>
      {props.titleList.map((item) => (
        <CreateGameItem item={item} />
      ))}
    </div>
  );
}

export default GameReady;
