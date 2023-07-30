import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const OpenViduVideoComponent = (props) => {
  console.log('제발 빨리 끝내고 잘 수 있으면 좋겠다', props);
  const videoRef = useRef(null);

  useEffect(() => {
    if (props && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;
