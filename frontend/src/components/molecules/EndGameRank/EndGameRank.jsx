import React from 'react';

const EndGameRank = (props) => {
  const nickname = props.rank.nickname;
  const biumTime = props.rank.gameRecord;
  return (
    <>
      <span>
        순위, {nickname}, {biumTime}
      </span>
    </>
  );
};

export default EndGameRank;
