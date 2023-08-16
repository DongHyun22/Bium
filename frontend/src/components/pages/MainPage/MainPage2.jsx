import React from 'react';
import styles from './MainPage2.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const MainPage2 = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = (e) => {
    if (window.scrollY >= 500 && window.scrollY < 1200) {
      setScroll(true);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌

      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <div className={styles.main2box}>
      <div className={styles.main2boxbackimg}></div>
      <div className={styles.main2boxback}></div>
      <div className={styles.main2text}>
        <p className={scroll ? styles.easyIn1 : styles.easyIn12}>당신의 오늘은 어땠나요?</p>
        <p className={scroll ? styles.easyIn2 : styles.easyIn12}>바쁜 하루에 지쳐가고 있을까요...</p>
        <p className={scroll ? styles.easyIn3 : styles.easyIn12}>
          자신을 위해 <br></br>
          <br></br>비움을 해 보는 건 어떨까요?
        </p>
      </div>
    </div>
  );
};

export default MainPage2;
