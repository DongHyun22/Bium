import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setJoin } from '../../../slices/videoSlice/videoSlice';
import styles from './GameRoomList.module.css';

export const GameRoomListItem = (props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const gameRoomTitle = props.allRoom.gameRoomTitle;
  const maxPeople = props.allRoom.maxPeople;
  const customSessionId = props.allRoom.customSessionId;
  const gameStart = props.allRoom.start;

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
          className={styles.listItem}
        >
          <div className={styles.listItemThumbnail}></div>
          <div className={styles.listItemContents}>
            <h2>{gameRoomTitle}</h2>
            <h3>🔥  불멍</h3>
            <h3>👤 1 / {maxPeople}</h3>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default GameRoomListItem;
