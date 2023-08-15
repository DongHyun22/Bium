import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './MainPage.module.css';
import NavBar from '../../../components/atoms/NavBar/NavBar';
import MainPage1 from './MainPage1';
import MainPage2 from './MainPage2';
import MainPage3 from './MainPage3';
import MainPage4 from './MainPage4';
import MainPage5 from './MainPage5';

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
    <div className={styles.mainscroll}>
      <MainPage1></MainPage1>
      <MainPage2></MainPage2>
      <MainPage3></MainPage3>
      <MainPage5></MainPage5>
      <MainPage4></MainPage4>
      <button className={styles.biumlogobutton} onClick={goToHome}></button>
    </div>
  );
};
export default MainPage;
