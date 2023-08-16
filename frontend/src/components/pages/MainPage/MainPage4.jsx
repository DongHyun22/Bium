import styles from './MainPage4.module.css';
import image3 from '../../../asset/mainImage/full.png';

function MainPage4() {
  return (
    <div className={styles.main4}>
      <p>이용 안내</p>
      <div className={styles.main4box}>
        <div className={styles.mian4order}>
          <p className={styles.order1}>1. 비움방 입장</p>
          <p className={styles.order2}>2. 생각 비우기</p>
          <p className={styles.order3}>3. 비움 즐기기</p>
          <p className={styles.order4}>-> 즐기러 가기</p>
        </div>
        <img className={styles.image3} src={image3} alt="" />
      </div>
    </div>
  );
}

export default MainPage4;
