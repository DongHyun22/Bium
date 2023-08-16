import React from 'react';
import styles from './MainFooter.module.css';

const MainFooter = () => {
  return (
    <>
      <footer id="footer" className={styles.footerhead}>
        <div className={styles.footertitle}>
          <h2 className="text-display-title">BIUM</h2>
        </div>

        <div className={styles.footercontact}>
          <h5>Contact Me</h5>
          <p>c205bium@gmail.com</p>
        </div>

        <div className={styles.footerbottom}>
          <p>© Copyright BIUM Design by C205_Bium</p>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
