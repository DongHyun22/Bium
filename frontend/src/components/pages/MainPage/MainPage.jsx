import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './MainPage.module.css';
import NavBar from '../../../components/atoms/NavBar/NavBar';

export const MainPage = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const goToGameRooom = () => {
    return token === null || isLogin === false ? navigate('/login') : navigate('/gameroomlist');
  };

  const goToHome = () => {
    return navigate('/');
  };

  return (
    <div>
      <div className={styles.mainpagebg}>
        <div className={styles.photo}>
          <button className={styles.biumlogobutton} onClick={goToHome}></button>
          <div className={styles.leftContent}>
            <p>바쁘게 살아가는 현대인에게</p>
            <p>잠깐의 여유를 함께하기 위해</p>
            <p>생각 비우기</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <NavBar></NavBar>
          <div className={styles.rightContent}>
            <h3 className={styles.titleBium}>비 움</h3>
            <span className={styles.titleContent}>멍하니 있고 싶을 때</span>
          </div>
          <button className={styles.startButton} onClick={goToGameRooom}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
