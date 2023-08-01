import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export const joinSession = createAsyncThunk('videoAction/joinSession', async (data) => {
  const OV = data.OV;
  const session = data.session;
  const mySessionId = data.mySessionId;
  const myUserName = data.myUserName;

  try {
    const token = await getToken({ sessionId: mySessionId });
    if (myUserName && session) {
      await session.connect(token, { clientData: myUserName });
      const publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false // Whether to mirror your local video or not
      });
      await session.publish(publisher);

      const response = {
        publisher: publisher
      };
      return response;
    }
  } catch (error) {
    console.log('There was an error connecting to the session:', error.code, error.message);
  }
});

async function getToken(mySessionId) {
  console.log('4');
  // console.log(mySessionId)

  const newSessionId = await createSession(mySessionId.sessionId);
  console.log('5', newSessionId);

  const token = await createToken(newSessionId);

  console.log('7');
  console.log(token);
  return token;
}
function createSession(sessionId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/sessions',
        { customSessionId: sessionId },
        {
          headers: {
            // Authorization:
            // 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json'
          }
        }
      );

      setTimeout(() => {
        console.log('개발자 설정을 통한 강제 리턴');
        console.log(sessionId);
        return resolve(sessionId);
      }, 1000);
      console.log(response, '엥');
      return response.data;
    } catch (response) {
      console.log(response);
      let error = Object.assign({}, response);
      if (error?.response?.status === 409) {
        return resolve(sessionId);
      }
    }
  });
}

function createToken(sessionId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
        {},
        {
          headers: {
            // Authorization:
            //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('6');
      console.log(response.data);
      return resolve(response.data);
    } catch (error) {
      return reject(error);
    }
  });
}

export const switchCamera = createAsyncThunk('video/switchCamera', async (data) => {
  const OV = data.OV;
  const currentVideoDevice = data.currentVideoDevice;
  const session = data.session;
  const mainStreamManager = data.mainStreamManager;

  try {
    const devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

    if (videoDevices && videoDevices.length > 1) {
      var newVideoDevice = videoDevices.filter((device) => device.deviceId !== currentVideoDevice.deviceId);

      if (newVideoDevice.length > 0) {
        // Creating a new publisher with specific videoSource
        // In mobile devices the default and first camera is the front one
        var newPublisher = OV.initPublisher(undefined, {
          videoSource: newVideoDevice[0].deviceId,
          publishAudio: true,
          publishVideo: true,
          mirror: true
        });

        //newPublisher.once("accessAllowed", () => {
        await session.unpublish(mainStreamManager);

        await session.publish(newPublisher);
        const response = {
          currentVideoDevice: newVideoDevice[0],
          mainStreamManager: newPublisher,
          publisher: newPublisher
        };
        return response;
      }
    }
  } catch (e) {
    console.error(e);
  }
});
