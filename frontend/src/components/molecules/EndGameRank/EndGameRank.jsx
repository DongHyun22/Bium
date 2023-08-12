import React from 'react';

const EndGameRank = (props) => {
  console.log(props);
  const nickname = props.rank.userNickname;
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
