import React from 'react';

async function playVideoFromCamera() {
  try {
    const constraints = { video: true, audio: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector('video#localVideo');
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error opening video camera.', error);
  }
}
export const mainPage = () => {
  const constraints = {
    video: true,
    audio: true
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log('Got MediaStream:', stream);
    })
    .catch((err) => {
      console.log('err :', err);
    });
  function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === type);
      callback(filtered);
    });
  }

  getConnectedDevices('videoinput', (cameras) => console.log('Cameras found', cameras));
  playVideoFromCamera();
  return (
    <div>
      <h1>mainPage</h1>
      <body>
        <video id="localVideo" autoplay playsinline controls="false" />
      </body>
    </div>
  );
};
export default mainPage;
