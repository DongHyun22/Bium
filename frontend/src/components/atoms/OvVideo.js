import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const OpenViduVideoComponent = (props) => {
  console.log('제발 빨리 끝내고 잘 수 있으면 좋겠다', props);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  //모델 불러오기
  const loadModels = () => {
    console.log('start');
    const MODEL_URL = process.env.PUBLIC_URL + '/models';

    Promise.allSettled([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)

      // faceapi.nets.face
    ]).then((e) => {
      console.log('end');

      faceMyDetect();
    });
  };

  // 변경마다;
  useEffect(() => {
    videoRef && loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  //내 이미지로부터 인식하고 다시 그려주기
  const faceMyDetect = () => {
    setInterval(async () => {
      console.log(videoRef.current);
      const videoElement = document.querySelector('#localVideo');
      const detections = await faceapi
        .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // DRAW YOU FACE IN WEBCAM
      if (detections && canvasRef.current !== null) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoElement);
        faceapi.matchDimensions(canvasRef.current, {
          width: 480,
          height: 270
        });

        const resized = faceapi.resizeResults(detections, {
          width: 480,
          height: 270
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      } else {
        return;
      }
    }, 8000);
  };

  return (
    <>
      <video id="localVideo" autoPlay={true} ref={videoRef} />
      <canvas id="drawCanvas" ref={canvasRef} />
    </>
  );
};

export default OpenViduVideoComponent;
