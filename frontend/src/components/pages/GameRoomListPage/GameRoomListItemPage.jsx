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
  const gameRoomMovie = props.allRoom.gameRoomMovie;
  const curPeople = props.allRoom.curPeople;

  const enterRoom = (e) => {
    dispatch(setJoin(true));
    // <Link to="/gameroom"></Link>;
    navigator('/gameroom', { state: { customSessionId: e.customSessionId, gameRoomTitle: e.gameRoomTitle, gameRoomMovie: e.gameRoomMovie } });
  };
  return (
    <>
      {gameStart === 'false' ? (
        <div
          onClick={() => {
            enterRoom({ customSessionId, gameRoomTitle, gameRoomMovie });
          }}
          className={styles.listItem}
        >
          <div className={styles.listItemThumbnail} loading="lazy"></div>
          <div className={styles.listItemContents}>
            <h2>{gameRoomTitle}</h2>
            {gameRoomMovie === 1 ? <h3>🔥 불멍</h3> : <h3>🌊 물멍</h3>}
            <h3>
              👤 {curPeople} / {maxPeople}
            </h3>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default GameRoomListItem;
