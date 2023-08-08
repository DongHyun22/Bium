import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useSelector } from 'react-redux';

const OpenViduVideoComponent = (props) => {
  const join = useSelector((state) => state.video.join);

  console.log('제발 빨리 끝내고 잘 수 있으면 좋겠다', props);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

      // faceapi.nets.face
    ]);
  };
  // 한번 실행;
  useEffect(() => {
    if (join) {
      videoRef && loadModels();
      faceMyDetect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    return () => {};
  }, [props]);

  const faceMyDetect = () => {
    setInterval(async () => {
      const videoElement = document.querySelector('#localVideo');
      console.log('히히', videoRef);
      // DRAW YOU FACE IN WEBCAM
      if (videoRef.current !== null) {
        const detections = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log('짜증나네');

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
      }
    }, 2000);
  };
  return (
    <>
      <video id="localVideo" audio="false" autoPlay={true} ref={videoRef} />
      <canvas id="drawCanvas" ref={canvasRef} />
    </>
  );
};

export default OpenViduVideoComponent;
