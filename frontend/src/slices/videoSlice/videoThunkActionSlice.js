import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { leaveRoom, setErrorSolve, setGameId, setGameRoomId, setHost, setMySessionId } from '../roomSlice/roomSlice';
import { leaveSession } from './videoSlice';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

export const joinSession = createAsyncThunk('joinSession', async (props) => {
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
  const dispatch = props.dispatch;

  try {
    console.log('1');
    const token = await getToken({ props, accessToken });
    console.log('여기토큰', token);
    if (token === null) {
      console.log('토클 널이랑 실행되니?');
      dispatch(leaveRoom());
      dispatch(leaveSession());
      dispatch(setErrorSolve(true));
    } else if (myUserName && session && token !== null) {
      console.log('9');
      console.log('시작');

      await session.connect(token, { clientData: myUserName });
      console.log('중간');

      const publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '280x180', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false // Whether to mirror your local video or not
      });

      console.log('10');

      await session.publish(publisher);

      console.log('포블퍼블', publisher);
      if (publisher === undefined) {
        console.log('일로오니...?');
        dispatch(setErrorSolve(true));
      } else {
        console.log('아니면 여기니?');
        const response = {
          publisher: publisher
        };
        console.log('11');
        console.log('resolution', response);

        return response;
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
});

async function getToken(props) {
  try {
    console.log('2');
    const dispatch = props.props.dispatch;
    const newSessionId = await createSession(props);
    console.log('5');

    dispatch(setMySessionId(newSessionId.customSessionId));
    dispatch(setGameRoomId(newSessionId.gameRoomId));
    const token = await createToken({ props, newSessionId });

    console.log('8');
    dispatch(setGameId(token.gameId));
    dispatch(setHost(token.host));
    console.log('8.5');
    return token.sessionId;
  } catch (err) {
    console.log('오류남./.... 해결해줜');
  }
}

function createSession(props) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('3');
      const accessToken = sessionStorage.getItem('accessToken');
      const userEmail = props.props.userEmail;

      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/create',
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
      console.log('4');

      return response.data;
    } catch (response) {
      let error = Object.assign({}, response);
      // 세션이 있으면 409 에러를 주는데 그때는 세션이 벌써 있다는 것이다.
      if (error?.response?.status === 409) {
        console.log('여기 2번 오류');
        return resolve(props.mySessionId);
      }
    }
  });
}

function createToken(props) {
  const dispatch = props.props.props.dispatch;
  return new Promise(async (resolve, reject) => {
    try {
      console.log('6');
      console.log(props);
      const userEmail = props.props.props.userEmail;
      const gameRoomId = props.newSessionId.gameRoomId;
      const gameRoomPw = props.newSessionId.gameRoomPw;
      const customSessionId = props.newSessionId.customSessionId;
      const host = props.newSessionId.host;

      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/enter',
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

      console.log('7');

      return resolve(response.data);
    } catch (error) {
      console.log('여기서 오류 해결해야해');

      dispatch(setErrorSolve(true));
    }
  });
}
