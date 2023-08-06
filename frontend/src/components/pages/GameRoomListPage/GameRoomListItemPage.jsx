import React from 'react';
import {useNavigate} from "react-router-dom";

export const GameRoomListItem = (props) => {
    const navigator = useNavigate() ;
  console.log('자식', props);
  const gameRoomTitle = props.allRoom.gameRoomTitle;
  const roomPeople = props.allRoom.maxPeople;
  const customSessionId = props.allRoom.customSessionId

    const enterRoom = (e) => {
      {navigator('/gameroom', {stste:{customSessionId:`${e}`}})}
    };
  return (
    <div onClick={()=>{enterRoom(customSessionId)}}>
      <h3>{gameRoomTitle}</h3>
      <h6>{roomPeople}</h6>
    </div>
  );
};
export default GameRoomListItem;
