import React from 'react';
import useGetBiumTime from '../../hooks/TimeInquery';

const RankingItem = ({ nickname, rank, topBium, ranking }) => (
  /** 시간의 경우 변환이 필요하기에 브랜치 infomationinquery의 시간 변환 hook을 사용하여
      변환한뒤 최고기록을 시 : 분 : 초의 형식으로 표시 */

  

  <div className="ranking-item">
    <div className="rankingPosition">{ranking}</div>
    <div className="rankingNickname">{nickname}</div>
    <div className="rankingRank">{rank}</div>
    <div className="rankingTopBium">{useGetBiumTime(topBium)}</div>
  </div>
);

export default RankingItem;
