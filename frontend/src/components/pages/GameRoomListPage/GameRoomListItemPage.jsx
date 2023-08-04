import React from 'react';

export const GameRoomListItem = (props) => {
  const allRoom = props.allRoom;
  console.log(allRoom);
  return (
    <div>
      <h3>{allRoom}</h3>
    </div>
  );
};
export default GameRoomListItem;
