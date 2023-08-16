import React from 'react';
import styles from './MainPage5.module.css';
import checkimage from '../../../asset/mainImage/checkpoi.png';
const MainPage5 = () => {
  return (
    <div className={styles.main5}>
      <div className={styles.mainbackimg}></div>
      <div className={styles.mainbackimgbox}></div>
      <p className={styles.main5title}>비움서비스는 멍때리기 대회에서 착안한 서비스입니다.</p>
      <div className={styles.main5cards}>
        <div className={styles.main5card}>
          <div className={styles.main5cardbg}>
            <img className={styles.checkimage} src={checkimage} alt="" />
            <p>혼자만 멍때리는 것이 불안한 사람들에게 같이 멍때리는 플랫폼을 제공합니다.</p>
          </div>
          {/* <div className={styles.main5cardblob}></div> */}
        </div>
        <div className={styles.main5card}>
          <div className={styles.main5cardbg}>
            <img className={styles.checkimage} src={checkimage} alt="" />
            <p>표정을 인식하고, 변화를 감지해 비움을 하는지 알 수 있어요!</p>
          </div>
          {/* <div className={styles.main5cardblob}></div> */}
        </div>
        <div className={styles.main5card}>
          <div className={styles.main5cardbg}>
            <img className={styles.checkimage} src={checkimage} alt="" />

            <p>멍때리기 대회를 연습하기에 좋아요!</p>
          </div>
          {/* <div className={styles.main5cardblob}></div> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage5;
