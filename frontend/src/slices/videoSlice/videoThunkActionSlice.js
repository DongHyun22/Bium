import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

export const joinSession = createAsyncThunk('videoAction/joinSession', async (props) => {
  const accessToken = sessionStorage.getItem('accessToken');
  console.log(accessToken);
  console.log('props는 이거다', props);
  const OV = props.OV;
  const backgroundImage = props.backgroundImage;
  const maxPeople = props.maxPeople;
  const mySessionId = props.mySessionId;
  const myUserName = props.myUserName;
  const roomName = props.roomName;
  const roomPassword = props.roomPassword;
  const session = props.session;

  console.log(123);
  console.log(456);
  try {
    console.log('해줘');
    const token = await getToken({ props, accessToken });
    console.log('제발 이거는 되니?');
    if (myUserName && session) {
      console.log('AAAAA');

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

async function getToken(props) {
  console.log('bbbbb는?');
  const newSessionId = await createSession(props);
  const token = await createToken(newSessionId);
  return token;
}

function createSession(props) {
  console.log('토큰있니....?');
  const accessToken = props.accessToken;
  const userEmail = props.userEmail;
  console.log(props);
  return new Promise(async (resolve, reject) => {
    try {
      console.log(accessToken, '비코좀...');
      // const response = await axios({
      //   url: `http://localhost:8080/api/game/create?userEmail=${userEmail}`,
      //   method: 'POST',
      //   data: {
      //     title: props.roomName,
      //     movie: props.backgroundImage,
      //     maxPeople: props.maxPeople,
      //     pw: props.roomPassword,
      //     customSessionId: props.mySessionId
      //   },
      //   headers: {
      //     Authorization: sessionStorage.getItem('accessToken'),
      //     'access-token': sessionStorage.getItem('accessToken')
      //   }
      // });
      const response = await axios.post(
        `http://localhost:8080/api/game/create`,
        {
          title: props.roomName,
          movie: props.backgroundImage,
          maxPeople: props.maxPeople,
          pw: props.roomPassword,
          customSessionId: props.mySessionId
        },
        {
          // params: {
          //   userEmail: 'user@example.com' // 쿼리 파라미터로 userEmail을 보낼 수 있습니다
          // },
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
      );

      setTimeout(() => {
        // console.log('개발자 설정을 통한 강제 리턴');
        return resolve(props.mySessionId);
      }, 1000);
      return response.data;
    } catch (response) {
      console.log(response);
      let error = Object.assign({}, response);
      if (error?.response?.status === 409) {
        return resolve(props.mySessionId);
      }
    }
  });
}

function createToken(sessionId) {
  console.log('hhhhh');

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/game/enter' + sessionId + '/connections',
        {},
        {
          headers: {
            // Authorization:
            //   'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('iiiii');
      // console.log(response.data);
      return resolve(response.data);
    } catch (error) {
      console.log(reject(error));
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
