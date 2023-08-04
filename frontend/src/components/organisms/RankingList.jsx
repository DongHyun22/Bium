import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RankingItem from '../molecules/RankingListItem';

function GetRanking() {
  // 헤더 인증용 토큰
  const [rank, setRank] = useState([]);
  const [myRank, setMyRank] = useState([]);
  const userEmail = useSelector((state) => state.user.userEmail);
  const todayBium = useSelector((state) => state.user.todayBium);
  const totalBium = useSelector((state) => state.user.totalBium);

  useEffect(() => {
    // 랭킹 요청
    axios
      .get(`http://localhost:8080/api/profile/ranking/${userEmail}`)
      .then((response) => {
        setRank(response.data.ranking);
        setRank(response.data.myRanking);
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
        <div></div>
        <div className="Ranking list">
          {rank.map((item, index) => (
            <RankingItem
              key={index}
              nickname={item.userNickname}
              rank={item.userRank}
              topBium={item.topBium}
              ranking={item.ranking}
            />
          ))}
        </div>
        <p>...</p>
        <div>
          <div>
            <div>{myRank.ranking}</div>
            <div>{myRank.userNickname}</div>
            <div>{myRank.userRank}</div>
            <div>{myRank.topBium}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export { GetRanking };
