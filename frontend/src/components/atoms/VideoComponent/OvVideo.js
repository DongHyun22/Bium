import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFallCount } from '../../../slices/roomSlice/roomSlice';
import { Publisher } from 'openvidu-browser';

const OpenViduVideoComponent = (props) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const join = useSelector((state) => state.video.join);
  const publisher = useSelector((state) => state.video.publisher);
  const start = useSelector((state) => state.room.start);
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
  }, []);

  useEffect(() => {
    const FaceMyDetect = () => {
      setInterval(async () => {
        console.log('1');
        // DRAW YOU FACE IN WEBCAM
        if (videoRef.current !== null && props.streamManager === publisher) {
          const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          if (detections && detections.expressions.neutral < 0.6) {
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
      console.log('clear');
      clearInterval(FaceMyDetect);
    };
  }, [start]);

  return (
    <>
      <video id="localVideo" audio="false" autoPlay={true} ref={videoRef} />
    </>
  );
};

export default OpenViduVideoComponent;
