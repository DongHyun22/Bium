import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setJoin } from '../../../slices/videoSlice/videoSlice';

export const GameRoomListItem = (props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  console.log('bmfhtm', props);
  const gameRoomTitle = props.allRoom.gameRoomTitle;
  const maxPeople = props.allRoom.maxPeople;
  const customSessionId = props.allRoom.customSessionId;
  const gameStart = props.allRoom.start;

  console.log(gameStart);

  const enterRoom = (e) => {
    dispatch(setJoin(true));
    // <Link to="/gameroom"></Link>;
    navigator('/gameroom', { state: { customSessionId: `${e}` } });
  };
  return (
    <>
      {gameStart === 'false' ? (
        <div
          onClick={() => {
            enterRoom(customSessionId);
          }}
        >
          <h3>게임방 제목 : {gameRoomTitle}</h3>
          <h6>{maxPeople}</h6>
        </div>
      ) : null}
    </>
  );
};
export default GameRoomListItem;
