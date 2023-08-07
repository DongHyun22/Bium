import React, { useEffect, useState } from 'react';
import styles from './Timer.module.css';

export default function Timer() {
  // 시간을 담을 변수
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    const startTimer = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      setCount((count) => count + 1);
    }, 1000);

    // 0이 되면 카운트가 멈춤
    if (count === 100) {
      clearInterval(startTimer);
    }
    return () => clearInterval(startTimer);
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [count]);

  return (
    <div className={styles.timer}>
      <p>
        <b>당신의 비움 시간</b>
      </p>
      <span>{count}</span>
    </div>
  );
}
