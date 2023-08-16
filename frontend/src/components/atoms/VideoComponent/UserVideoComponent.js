import React, { useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserVideoComponent.module.css';
import { IoRocket } from 'react-icons/io5';
import { setDisturb } from '../../../slices/roomSlice/roomSlice';

const UserVideoComponent = (props) => {
  const dispatch = useDispatch();
  const OV = useSelector((state) => state.video.OV);
  const session = useSelector((state) => state.video.session);
  const subscribers = useSelector((state) => state.video.subscribers);
  const publisher = useSelector((state) => state.video.publisher);

  const start = useSelector((state) => state.room.start);
  return (
    <div className={styles.videoBox}>
      {props.streamManager !== undefined ? (
        <>
          <div className={styles.userVideos}>
            <OpenViduVideoComponent streamManager={props.streamManager} />
            {props.streamManager === publisher ? (
              <button
                className={styles.disturbButton}
                onClick={() => {
                  // dispatch(setDisturb(true));
                  const data = {
                    message: 'disturb'
                  };
                  publisher.stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'disturb'
                  });
                }}
              >
                <i className={styles.iTag}>
                  <IoRocket className={styles.rocketIcon} />
                </i>
                <span className={styles.spanTag}>Disturb</span>
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
