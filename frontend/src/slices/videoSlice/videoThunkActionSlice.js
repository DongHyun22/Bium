import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setGameRoomId, setHost } from '../roomSlice/roomSlice';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

export const joinSession = createAsyncThunk('videoAction/joinSession', async (props) => {
  console.log('제발 joinsession 확ㅇ니좀', props);
  const accessToken = sessionStorage.getItem('accessToken');
  const userEmail = props.userEmail;
  const OV = props.OV;
  const backgroundImage = props.backgroundImage;
  const maxPeople = props.maxPeople;
  const mySessionId = props.mySessionId;
  const myUserName = props.myUserName;
  const roomTitle = props.roomTitle;
  const roomPassword = props.roomPassword;
  const session = props.session;
  const gameRoomId = '';

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

  const dispatch = props.props.dispatch;
  console.log(dispatch);
  const newSessionId = await createSession(props);
  dispatch(setGameRoomId(newSessionId.gameRoomId));
  const token = await createToken({ props, newSessionId });
  dispatch(setHost(token.host));
  return token.sessionId;
}

function createSession(props) {
  console.log('토큰있니....?');

  console.log(props.props);
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      console.log(accessToken, '비코좀...');
      const userEmail = props.props.userEmail;

      const response = await axios.post(
        `http://localhost:8080/api/game/create`,
        {
          gameRoomTitle: props.props.gameRoomTitle,
          gameRoomMovie: props.props.backgroundImage,
          maxPeople: props.props.maxPeople,
          gameRoomPw: props.props.roomPassword,
          customSessionId: props.props.mySessionId
        },
        {
          params: {
            userEmail // 쿼리 파라미터로 userEmail을 보낼 수 있습니다
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setTimeout(() => {
        // console.log('개발자 설정을 통한 강제 리턴');
        return resolve(response.data);
      }, 1000);
      console.log('여기는 create 세션이니까', response.data);
      return response.data;
    } catch (response) {
      console.log(response);
      let error = Object.assign({}, response);
      // 세션이 있으면 409 에러를 주는데 그때는 세션이 벌써 있다는 것이다.
      if (error?.response?.status === 409) {
        return resolve('2번 오류야', props.mySessionId);
      }
    }
  });
}

function createToken(props) {
  console.log('hhhhh');
  console.log(props);

  return new Promise(async (resolve, reject) => {
    try {
      const userEmail = props.props.props.userEmail;
      const gameRoomId = props.newSessionId.gameRoomId;
      const gameRoomPw = props.newSessionId.gameRoomPw;
      const customSessionId = props.newSessionId.customSessionId;
      const host = props.newSessionId.host;

      console.log('이메일 출력', userEmail, gameRoomId, gameRoomPw, customSessionId);
      console.log('호스트호스트 출력출력', host);
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:8080/api/game/enter`,
        {
          gameRoomId,
          gameRoomPw,
          customSessionId,
          host
        },
        {
          params: {
            userEmail // 쿼리 파라미터로 userEmail을 보낼 수 있습니다
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log('입장자야', response.data);
      return resolve(response.data);
    } catch (error) {
      console.log(reject('3번 여기오류야....', error));
    }
  });
}
