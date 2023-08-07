import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Timer.module.css';

export default function GameTimer() {
  // 시간을 담을 변수
  const [totalCount, setTotalCount] = useState(0);
  const [ovSecond, setOvSecond] = useState(0);
  const [ovMinute, setOvMinute] = useState(0);
  const [ovHour, setOvHour] = useState(0);

  const [start, setStart] = useState(false);

  const publisher = useSelector((state) => state.video.publisher);

  useEffect(() => {
    console.log(start);
    console.log('왜 타이머 시작 안해?');
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    if (start === true) {
      console.log('여기 실행햬?');
      const startTimer = setInterval(() => {
        setTotalCount((totalCount) => totalCount + 1);
      }, 1000);
      const secToHour = Math.floor(totalCount / 3600);
      const secToMinute = Math.floor((totalCount - secToHour * 3600) / 60);
      const secToSec = totalCount % 60;
      setOvHour(secToHour);
      setOvMinute(secToMinute);
      setOvSecond(secToSec);
      return () => {
        // clearInterval(startTimer);
        // setStart(false);
        console.log('여기는 count를 초기화 하는 곳');
        // setTotalCount(0);
      };
    }
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [totalCount]);

  const startSignal = (publisher) => {
    console.log('여기는 스트림 매니저', publisher);
    const data = {
      message: 'start'
    };
    publisher.stream.session.signal({
      data: JSON.stringify(data),
      type: 'timer'
    });
    console.log('타이머 시작', data);

  };

  useEffect(() => {
    if (start && publisher !== undefined) {
      console.log('쿠키 세션에 이벤트 추가', publisher);
      publisher.stream.session.on('signal:timer', (e) => {
        console.log(e);
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.message === 'start') {
          setStart(true);
        }
      });
    }
  }, [start]);

  return (
    <div>
      <div className={styles}>
        <button
          onClick={() => {
            startSignal(publisher);
          }}
        >
          Start
        </button>
        <p>당신의 비움 시간</p>
        <p>{ovHour}</p>
        <p>{ovMinute}</p>
        <p>{ovSecond}</p>
      </div>
    </div>
  );
}
