import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Timer.module.css';
import { setBiumSecond } from '../../../slices/roomSlice/roomSlice';

export default function GameTimer() {
  const dispatch = useDispatch();
  const start = useSelector((state) => state.room.start);
  const totalCount = useSelector((state) => state.room.biumSecond);
  const [ovSecond, setOvSecond] = useState(0);
  const [ovMinute, setOvMinute] = useState(0);
  const [ovHour, setOvHour] = useState(0);

  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    if (start === true) {
      const startTimer = setInterval(() => {
        dispatch(setBiumSecond(1));
      }, 1000);
      const secToHour = Math.floor(totalCount / 3600);
      const secToMinute = Math.floor((totalCount - secToHour * 3600) / 60);
      const secToSec = totalCount % 60;
      setOvHour(secToHour);
      setOvMinute(secToMinute);
      setOvSecond(secToSec);
      return () => {
        clearInterval(startTimer);
      };
    }
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [totalCount, start]);

  return (
    <>
      <div className={styles.biumTimer}>
        <p>비움 시간</p>
        <p>
          {ovHour} 시간 {ovMinute} 분 {ovSecond} 초
        </p>
      </div>
    </>
  );
}
