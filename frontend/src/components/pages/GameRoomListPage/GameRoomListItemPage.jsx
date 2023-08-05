import React from 'react';

export const GameRoomListItem = (props) => {
  console.log(props);
  const roomTitle = props.roomTitle;
  const roomPeople = props.roomPeople;

  console.log(props);
  return (
    <div>
      <h3>{roomTitle}</h3>
      <h6>{roomPeople}</h6>
    </div>
  );
};
export default GameRoomListItem;
