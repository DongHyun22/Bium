import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RankingItem from '../molecules/RankingListItem';
import styles from './RankingList.module.css';
import useGetBiumTime from '../../hooks/TimeInquery';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

function GetRanking() {
  // 헤더 인증용 토큰
  const [rank, setRank] = useState([]);
  const [myRank, setMyRank] = useState([]);
  const userEmail = useSelector((state) => state.user.userEmail);

  const myRecord = useGetBiumTime(myRank.topBium);

  // 랭크에 본인 정보가 있는지 여부 파악
  const myRankExistsInRank = rank.some((item) => item.userNickname === myRank.userNickname);

  useEffect(() => {
    // 랭킹 요청
    axios
      .get(APPLICATION_SERVER_URL + `/api/profile/ranking/${userEmail}`)
      .then((response) => {
        setRank(response.data.ranking);
        setMyRank(response.data.myRanking);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  return (
    <div className={styles.rankingContainer}>
      <div >
        <div className={styles.rankingTitle}>
          <p>Ranking</p>
        </div>
        <div className={styles.catalog}>
          <div>
            <p>순위</p>
            <p>닉네임</p>
            <p>티어</p>
            <p>최고기록</p>
          </div>
        </div>
        <div className={styles.rankingList}>
          {rank.map((item, index) => (
            <RankingItem key={index} nickname={item.userNickname} rank={item.userRank} topBium={item.topBium} ranking={item.ranking} />
          ))}
          <p>...</p>
          {!myRankExistsInRank && (
            <div className={styles.myRanking}>
              <div>{myRank.ranking}</div>
              <div>{myRank.userNickname}</div>
              <div>{myRank.userRank}</div>
              <div>{myRecord}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { GetRanking };
