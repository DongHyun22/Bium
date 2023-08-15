import React, { useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useSelector } from 'react-redux';
import emptyprofile from '../../../../src/asset/backgroudimage/emptyprofile.png';
import styles from './UserVideoComponent.module.css';
import { IoRocket } from 'react-icons/io5';

const UserVideoComponent = (props) => {
  const OV = useSelector((state) => state.video.OV);
  const session = useSelector((state) => state.video.session);
  const subscribers = useSelector((state) => state.video.subscribers);
  const publisher = useSelector((state) => state.video.publisher);

  const [disturb, setDisturb] = useState(false);
  const start = useSelector((state) => state.room.start);
  return (
    <div className={styles.videoBox}>
      {props.streamManager !== undefined ? (
        <>
          {disturb && start === false ? (
            <>
              <img src={emptyprofile} alt="사진이 없어..." />
            </>
          ) : (
            <div className={styles.userVideos}>
              <OpenViduVideoComponent streamManager={props.streamManager} />
              {props.streamManager === publisher ? (
                <button
                  className={styles.disturbButton}
                  onClick={() => {
                    setDisturb(true);
                  }}
                >
                  <i className={styles.iTag}>
                    <IoRocket className={styles.rocketIcon} />
                  </i>
                  <span className={styles.spanTag}>Disturb</span>
                </button>
              ) : null}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
