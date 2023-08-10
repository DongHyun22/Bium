import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from 'react-redux';

const OpenViduVideoComponent = (props) => {
  const dispatch = useDispatch();
  const join = useSelector((state) => state.video.join);
  const [count, setCount] = useEffect(0);

  const videoRef = useRef(null);

  //모델 불러오기
  const loadModels = () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
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
  }, [props]);
  useEffect(() => {
    const FaceMyDetect = (props) => {
      setInterval(async () => {
        console.log('ggg');

        // DRAW YOU FACE IN WEBCAM
        if (videoRef.current !== null) {
          const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          if (detections && detections.expressions.neutral < 0.6) {
            console.log(detections.expressions);
          }
        }
      }, 1000);
    };
    FaceMyDetect();
    return () => {
      console.log('clear');
      clearInterval(FaceMyDetect);
    };
  }, []);

  return (
    <>
      <video id="localVideo" audio="false" autoPlay={true} ref={videoRef} />

      <p>당신의 탈락카운트</p>
      <p>{}</p>
    </>
  );
};

export default OpenViduVideoComponent;
