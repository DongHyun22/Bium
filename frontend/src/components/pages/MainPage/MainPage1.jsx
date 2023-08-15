import React, { useState, useEffect } from 'react';
import styles from './MainPage1.module.css';
import moonIamge from '../../../asset/mainImage/mainmoon.avif';

const MainPage1 = () => {
  const txt = '그대여, 아무 걱정하지 말아요';
  const [Text, setText] = useState('');
  const [Count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(Text + txt[Count]);
      setCount(Count + 1);
    }, 200);
    if (Count === txt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.main1}>
      <p className={styles.mainstarttext}>{Text}</p>
      <button
        onClick={() => {
          window.scrollTo(0, 923);
        }}
        className={styles.mainstartbutton}
      >
        비움, 시작하기
      </button>
    </div>
  );
};

export default MainPage1;
