import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RankingItem from '../molecules/RankingListItem';
import styles from './RankingList.module.css';

function GetRanking() {
  // 헤더 인증용 토큰
  const [rank, setRank] = useState([]);
  const [myRank, setMyRank] = useState([]);
  const userEmail = useSelector((state) => state.user.userEmail);

  // 랭크에 본인 정보가 있는지 여부 파악
  const myRankExistsInRank = rank.some((item) => item.userNickname === myRank.userNickname);

  useEffect(() => {
    // 랭킹 요청
    axios
      .get(`https://i9c205.p.ssafy.io/api/profile/ranking/${userEmail}`)
      .then((response) => {
        setRank(response.data.ranking);
        setMyRank(response.data.myRanking);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="Ranking title">
        <p>Ranking</p>
      </div>
      <div>
        <div>
          <span>순위</span>
          &nbsp;
          <span>닉네임</span>
          &nbsp;
          <span>티어</span>
          &nbsp;
          <span>최고기록</span>
        </div>
        <div className="Ranking list">
          {rank.map((item, index) => (
            <RankingItem key={index} nickname={item.userNickname} rank={item.userRank} topBium={item.topBium} ranking={item.ranking} />
          ))}
        </div>
        <p>...</p>
        <div>
          {!myRankExistsInRank && (
            <div className={styles.myRanking}>
              <div>{myRank.ranking}</div>
              &nbsp;
              <div>{myRank.userNickname}</div>
              &nbsp;
              <div>{myRank.userRank}</div>
              &nbsp;
              <div>{myRank.topBium}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { GetRanking };
