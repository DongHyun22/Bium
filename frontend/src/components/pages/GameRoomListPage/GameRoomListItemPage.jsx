import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setJoin } from '../../../slices/videoSlice/videoSlice';

export const GameRoomListItem = (props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  console.log('자식', props);
  const gameRoomTitle = props.allRoom.gameRoomTitle;
  const roomPeople = props.allRoom.maxPeople;
  const customSessionId = props.allRoom.customSessionId;

  const enterRoom = (e) => {
    dispatch(setJoin(true));
    // <Link to="/gameroom"></Link>;
    navigator('/gameroom', { state: { customSessionId: `${e}` } });
  };
  return (
    <div
      onClick={() => {
        enterRoom(customSessionId);
      }}
    >
      <h3>{gameRoomTitle}</h3>
      <h6>{roomPeople}</h6>
    </div>
  );
};
export default GameRoomListItem;
