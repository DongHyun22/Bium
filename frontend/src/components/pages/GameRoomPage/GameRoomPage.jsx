import { OpenVidu } from 'openvidu-browser';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setJoin, audioMute, deleteSubscriber, enteredSubscriber, initOVSession, leaveSession } from '../../../slices/videoSlice/videoSlice';
import { joinSession } from '../../../slices/videoSlice/videoThunkActionSlice';

import Timer from '../../atoms/Timer/Timer';
import UserVideoComponent from '../../atoms/VideoComponent/UserVideoComponent';

import styles from './GamRoomPage.module.css';
import { setMySessionId, setStart } from '../../../slices/roomSlice/roomSlice';
import { useState } from 'react';

function GameRoomPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const customSessionId = location.state;
  console.log('uuuuuuu', customSessionId);
  const userEmail = useSelector((state) => state.user.userEmail);

  const gameRoomTitle = useSelector((state) => state.room.roomTitle);
  const roomPassword = useSelector((state) => state.room.roomPassword);

  const start = useSelector((state) => state.room.start);

  //customSessionId 필요하다
  //추가하자

  const mySessionId = useSelector((state) => state.room.mySessionId);
  if (location.state) {
    dispatch(setMySessionId(location.state.customSessionId));
  }
  const myUserName = useSelector((state) => state.room.myUserName);
  const maxPeople = useSelector((state) => state.room.maxPeople);
  const backgroundImage = useSelector((state) => state.room.backgroundImage);
  const join = useSelector((state) => state.video.join);
  const OV = useSelector((state) => state.video.OV);
  const session = useSelector((state) => state.video.session);
  const publisher = useSelector((state) => state.video.publisher);
  const subscribers = useSelector((state) => state.video.subscribers);

  const onbeforeunload = (e) => {
    dispatch(leaveSession());
  };

  const setAudioMute = () => {
    dispatch(audioMute());
  };

  const handleLeaveSession = () => {
    if (session) {
      session.disconnect();
      dispatch(leaveSession());
      setJoin(false);
      navigate('/gameroomlist');
    }
  };

  // 컴포넌트 마운트, 언마운트 시 session 값 초기화
  useEffect(() => {
    // componentDidMount
    window.addEventListener('beforeunload', onbeforeunload);
    // componentWillUnmount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  // join 의존성
  useEffect(() => {
    if (join) {
      const OV = new OpenVidu();
      const session = OV.initSession();
      console.log('OV:', OV);
      console.log('session:', session);
      dispatch(initOVSession({ OV, session }));
    }
  }, [join]);

  //세션이 있다면, 스트림을 넣어 될듯
  useEffect(() => {
    if (session) {
      // On every new Stream received...

      const handleStreamCreated = (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        console.log('나갔니?');
        dispatch(enteredSubscriber(subscriber));
      };
      // On every Stream destroyed...
      const handleStreamDestroyed = (event) => {
        dispatch(deleteSubscriber(event.stream.streamManager));
      };
      // On every asynchronous exception...
      const handleException = (exception) => {
        console.warn('exception', exception);
      };

      session.on('streamCreated', handleStreamCreated);
      session.on('streamDestroyed', handleStreamDestroyed);
      session.on('exception', handleException);
      dispatch(joinSession({ OV, session, mySessionId, myUserName, gameRoomTitle, backgroundImage, maxPeople, roomPassword, userEmail }));

      // Clean-up 함수 등록
      return () => {
        session.off('streamCreated', handleStreamCreated);
        session.off('streamDestroyed', handleStreamDestroyed);
        session.off('exception', handleException);
        const mySession = session;
        if (mySession) {
          mySession.disconnect(); // 예시에서는 disconnect()로 대체하였으나, 이는 OpenVidu에 따라 다르게 적용될 수 있음
        }
      };
    }
  }, [session]);

  // const handleMainVideoStream = (stream) => {
  //   if (mainStreamManager !== stream) {
  //     dispatch(setMainStreamManager({ publisher: stream }));
  //   }
  // };

  // --- 3) Specify the actions when events take place in the session ---
  const startSignal = (publisher) => {
    console.log('여기는 스트림 매니저', publisher);
    const data = {
      message: 'start'
    };
    publisher.stream.session.signal({
      data: JSON.stringify(data),
      type: 'timer'
    });
    console.log('타이머 시작', data);

    if (publisher !== undefined) {
      console.log('쿠키 세션에 이벤트 추가', publisher);
      publisher.stream.session.on('signal:timer', (e) => {
        console.log(e);
        const data = JSON.parse(e.data);
        console.log('여기는 데이터', data);
        if (data.message === 'start') {
          console.log(333);
          dispatch(setStart(true));
        }
      });
    }
  };
  return (
    <div>
      {/* join 이후 화면 */}
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
          </div>
          <div id="session-sidebar">
            <input className="btn btn-large btn-danger" type="button" id="buttonLeaveSession" onClick={handleLeaveSession} value="Leave session" />
            <input className="btn btn-large btn-success" type="button" id="buttonSwitchCamera" onClick={setAudioMute} value="Mute Audio" />
            <input className="btn btn-large btn-success" type="button" id="buttonSwitchCamera" onClick={setAudioMute} value="Mute Audio" />
          </div>
          <div id="room-information">
            <h1 id="room-name">{gameRoomTitle}</h1>
          </div>
          <div className={styles.backimage}>
            <div id="video-container">
              {publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6">
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : (
                <h1>같이할 동료들을 연결 중</h1>
              )}
              {subscribers.map((sub) => (
                <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                startSignal(publisher);
              }}
            >
              Start
            </button>
            <Timer></Timer>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default GameRoomPage;
