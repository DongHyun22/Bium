import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import MainPage1 from './MainPage1';
import MainPage2 from './MainPage2';
import MainPage3 from './MainPage3';
import MainPage4 from './MainPage4';
import MainPage5 from './MainPage5';
import { BsArrowBarDown } from 'react-icons/bs';

export const MainPage = () => {
  const navigate = useNavigate();

  const [downScroll, setDownScroll] = useState(true);
  const [upScroll, setUpScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setUpScroll(false);
      setDownScroll(true);
    } else if (window.scrollY >= 2500) {
      setUpScroll(true);
      setDownScroll(false);
    } else {
      setUpScroll(false);
      setDownScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <div className={styles.mains}>
      <div className={styles.biumlogobutton}></div>
      {downScroll ? (
        <div className={downScroll ? styles.downscroll : ''}>
          scroll
          <BsArrowBarDown></BsArrowBarDown>
        </div>
      ) : null}
      {upScroll ? (
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className={upScroll ? styles.upscroll : ''}
        >
          ^
        </button>
      ) : null}

      <MainPage1></MainPage1>
      <MainPage2></MainPage2>
      <MainPage3></MainPage3>
      <MainPage5></MainPage5>
      <MainPage4></MainPage4>
    </div>
  );
};
export default MainPage;
