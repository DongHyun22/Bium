import React from 'react';

const EndGameRank = (props) => {
  const nickname = props.nickname;
  const biumTime = props.biumSecond;
  return (
    <>
      <p>
        순위, {nickname}, {biumTime}
      </p>
    </>
  );
};

export default EndGameRank;
