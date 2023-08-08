import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useSelector } from 'react-redux';
import { clearAllListeners } from '@reduxjs/toolkit';

const OpenViduVideoComponent = (props) => {
  const join = useSelector((state) => state.video.join);

  console.log('제발 빨리 끝내고 잘 수 있으면 좋겠다', props);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  //모델 불러오기
  const loadModels = () => {
    console.log('start');
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)

      // faceapi.nets.face
    ]).then((e) => {
      if (join) {
        faceMyDetect();
      }
    });
  };

  // 한번 실행;
  useEffect(() => {
    if (join) {
      videoRef && loadModels();
    }
    return () => {
      console.log('stopoadModels');
      clearInterval(loadModels);
      console.log('stopfaceDtect');
      clearInterval(faceMyDetect);
      console.log('stoplister');
      clearAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    return;
  }, [props]);

  //내 이미지로부터 인식하고 다시 그려주기
  const faceMyDetect = () => {
    setInterval(async () => {
      console.log('하하하', videoRef.current);
      const videoElement = document.querySelector('#localVideo');

      // DRAW YOU FACE IN WEBCAM
      if (videoRef.current !== null) {
        const detections = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoElement);
        faceapi.matchDimensions(canvasRef.current, {
          width: 480,
          height: 270
        });
        if (detections) {
          const resized = faceapi.resizeResults(detections, {
            width: 480,
            height: 270
          });

          faceapi.draw.drawDetections(canvasRef.current, resized);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }
      } else {
        return;
      }
    }, 8000);
  };

  return (
    <>
      <video id="localVideo" audio="false" autoPlay={true} ref={videoRef} />
      <canvas id="drawCanvas" ref={canvasRef} />
    </>
  );
};

export default OpenViduVideoComponent;
