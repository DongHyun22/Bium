import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFallCount } from '../../../slices/roomSlice/roomSlice';
import styles from './OvVideo.module.css';

const OpenViduVideoComponent = (props) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const join = useSelector((state) => state.video.join);
  const publisher = useSelector((state) => state.video.publisher);
  const start = useSelector((state) => state.room.start);

  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  //모델 불러오기
  const loadModels = () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ]);
  };
  // 한번 실행;
  useEffect(() => {
    if (join) {
      videoRef && loadModels();
    }
  }, []);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const FaceMyDetect = () => {
      setInterval(async () => {
        // DRAW YOU FACE IN WEBCAM
        if (videoRef.current !== null && props.streamManager === publisher) {
          const detections = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          if (detections === undefined) {
            console.log('undefined');
            dispatch(setGameFallCount(1));
          } else if (detections && detections.expressions.neutral < 0.6) {
            console.log(detections);
            console.log(detections.expressions);
            dispatch(setGameFallCount(1));
          }
        }
      }, 1000);
    };
    if (start === true) {
      FaceMyDetect();
    }
    return () => {
      clearInterval(FaceMyDetect);
    };
  }, [start]);

  return (
    <>
      <div className={styles.userVideo}>
        <video className={styles.userVideoTag} id="localVideo" audio="false" autoPlay={true} ref={videoRef} />
        <div className={styles.userNickname}>
          <p>{getNicknameTag()}</p>
        </div>
      </div>
    </>
  );
};

export default OpenViduVideoComponent;
