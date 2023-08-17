import React from 'react';
import styles from './EndGameRank.module.css';
const EndGameRank = (props) => {
  const nickname = props.rank.userNickname;
  const biumTime = props.rank.gameRecord;
  const rank = props.rank.index;
  return (
    <>
      <p className={styles.rankitem}>
        <p>{rank}등</p>
        <p>"{nickname}"</p>
        <p>{biumTime} 초</p>
      </p>
    </>
  );
};

export default EndGameRank;
