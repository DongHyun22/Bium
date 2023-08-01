import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../../slices/getLoginInfo';
import { Fragment } from 'react';
import RankingItem from '../molecules/RankingItem'; 

function useRanking() {

  const [rank, setRank] = useState([]);

  useEffect(() => {
    // 랭킹 요청
    axios.get('http://localhost:8080/profile/ranking')
      .then ((response) => {
        setRank(response.data);
      }) 
      .catch ((error) => {
        console.error(error);
      });
  }, []);
  
  return (
    <Fragment>
      <div className='Ranking title'>
        <p>Ranking</p>
      </div>
      <div>
        <div className='Ranking list'>
          순위 
        </div>
        {rank.map((item, index) => (
          <RankingItem key={index} index={index} item={item} />
        ))}
      </div>
    </Fragment>
  );
  
};


export {useRanking} ;