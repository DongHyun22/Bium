import React from 'react';
import styles from './MainPage3.module.css';
import brain from '../../../asset/mainImage/brain1.png';
import concentrate from '../../../asset/mainImage/idea_2.png';
import laydown from '../../../asset/mainImage/self-love_2.png';

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
            <span className={styles.cardcontent}>
              뇌가 멈추었을 때 작동하는데 <br></br>불안과 우울 같은 감정을 <br></br>조절해주는 역할
            </span>
          </div>
        </div>
        <div className={styles.firstcard}>
          <div className={styles.firstcardfirst}>
            <img src={laydown} alt="" />
            <p>Rest</p>
          </div>
          <div className={styles.firstcardsecond}>
            <span className={styles.cardcontent}>
              신체와 정신의 휴식,<br></br>여유로운 마음
            </span>
          </div>
        </div>
        <div className={styles.firstcard}>
          <div className={styles.firstcardfirst}>
            <img src={concentrate} alt="" />
            <p>Refresh</p>
          </div>
          <div className={styles.firstcardsecond}>
            <span className={styles.cardcontent}>
              기존 관점에서 벗어나 <br />
              새로운 관점에서 <br /> 생각할 수 있게 됩니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage3;
