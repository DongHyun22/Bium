import React from 'react';
import { useGetBiumTime } from '../../hooks/TimeInquery';

const RankingItem = ({ item, index }) => (
  <div className="ranking-item">
    <div className="rankingPosition">{index + 1}</div>
    <div className="rankingNickname">{item.nickname}</div>
    <div className="rankingRank">{item.rank}</div>
    /** 시간의 경우 변환이 필요하기에 브랜치 infomationinquery의 시간 변환 hook을 사용하여 변환하여 최고기록을 시 : 분 :
    초의 형식으로 표시 */
    <div className="rankingTopBium">{useGetBiumTime(item.topBium)}</div>
  </div>
);

export default RankingItem;
