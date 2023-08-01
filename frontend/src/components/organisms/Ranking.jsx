import { useState, useEffect, useSelector } from 'react';
import axios from 'axios';
// import { setProfile } from '../../../slices/userSlice';
import { Fragment } from 'react';
import RankingItem from '../molecules/RankingItem';

function useRanking() {
  // 헤더 인증용 토큰
  const [rank, setRank] = useState([]);
  const nickname = useSelector((state) => state.user.nickname);
  const todayBium = useSelector((state) => state.user.todayBium);
  const totalBium = useSelector((state) => state.user.totalBium);
  // 사용자 등수는 어떻게???

  useEffect(() => {
    // 랭킹 요청
    axios
      .get('http://localhost:8080/profile/ranking')
      .then((response) => {
        setRank(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Fragment>
      <div className="Ranking title">
        <p>Ranking</p>
      </div>
      <div>
        <div></div>
        <div className="Ranking list">
          {rank.map((item, index) => (
            <RankingItem key={index} index={index} item={item} />
          ))}
        </div>
        <p>...</p>
      </div>
    </Fragment>
  );
}

export { useRanking };
