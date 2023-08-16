import React from 'react';
import styles from './MainPage3.module.css';
import brain from '../../../asset/mainImage/brain.png';
import concentrate from '../../../asset/mainImage/concentrate.png';
import laydown from '../../../asset/mainImage/laydown.png';

const MainPage3 = () => {
  return (
    <div className={styles.main3}>
      <div className={styles.main3box}></div>
      <p className={styles.main3Title}>비움의 효능</p>
      <div className={styles.cards}>
        <div className={styles.firstcard}>
          <div className={styles.firstcardfirst}>
            <img src={brain} alt="" />
            <p>DMN</p>
          </div>
          <div className={styles.firstcardsecond}>
            <span>DMN이란?</span>
          </div>
        </div>
        <div className={styles.firstcard}>
          <div className={styles.firstcardfirst}>
            <img src={laydown} alt="" />
            <p>Rest</p>
          </div>
          <div className={styles.firstcardsecond}>
            <span>Second</span>
          </div>
        </div>
        <div className={styles.firstcard}>
          <div className={styles.firstcardfirst}>
            <img src={concentrate} alt="" />
            <p>Refresh</p>
          </div>
          <div className={styles.firstcardsecond}>
            <span>Second</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage3;
