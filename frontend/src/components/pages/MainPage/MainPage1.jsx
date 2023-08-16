import React, { useState, useEffect } from 'react';
import styles from './MainPage1.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainPage1 = () => {
  const txt = '그대여, 아무 걱정하지 말아요';
  const navigate = useNavigate();
  const [Text, setText] = useState('');
  const [Count, setCount] = useState(0);
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = useSelector((state) => state.user.token);

  const goToGameRooom = () => {
    return token === null || isLogin === false ? navigate('/login') : navigate('/gameroomlist');
  };
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
          goToGameRooom();
        }}
        className={styles.mainstartbutton}
      >
        비움, 시작하기
      </button>
    </div>
  );
};

export default MainPage1;
