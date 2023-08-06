import React from 'react';

export const GameRoomListItem = (props) => {
  console.log('자식', props);
  const roomTitle = props.allRoom.title;
  const roomPeople = props.allRoom.maxPeople;

  return (
    <div>
      <h3>{roomTitle}</h3>
      <h6>{roomPeople}</h6>
    </div>
  );
};
export default GameRoomListItem;
