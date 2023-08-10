import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import { joinSession } from '../../../slices/videoSlice/videoThunkActionSlice';
import { setJoin, audioMute, deleteSubscriber, enteredSubscriber, initOVSession, leaveSession } from '../../../slices/videoSlice/videoSlice';
import { setGameFallCount, setMySessionId, setStart } from '../../../slices/roomSlice/roomSlice';

import UserVideoComponent from '../../atoms/VideoComponent/UserVideoComponent';
import Timer from '../../atoms/Timer/Timer';
import styles from './GamRoomPage.module.css';
import EndGameRank from '../../molecules/EndGameRank/EndGameRank';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

function GameRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const customSessionId = location.state;
  const userEmail = useSelector((state) => state.user.userEmail);

  const gameRoomTitle = useSelector((state) => state.room.roomTitle);
  const roomPassword = useSelector((state) => state.room.roomPassword);
  const host = useSelector((state) => state.room.host);

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
  const gameRoomId = useSelector((state) => state.room.gameRoomId);
  const gameId = useSelector((state) => state.room.gameId);
  const gameFallCount = useSelector((state) => state.room.gameFallCount);
  const biumSecond = useSelector((state) => state.room.biumSecond);
  const start = useSelector((state) => state.room.start);

  const [rankModal, setRankModal] = useState(false);
  const [gameRankList, setGameRankList] = useState([]);

  const onbeforeunload = (e) => {
    dispatch(leaveSession());
  };

  const setAudioMute = () => {
    dispatch(audioMute());
  };

  const handleLeaveSession = () => {
    if (session) {
      session.disconnect();
      gameOut();
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
  }, [host]);

  // join 의존성
  useEffect(() => {
    if (join) {
      const OV = new OpenVidu();
      const session = OV.initSession();

      dispatch(initOVSession({ OV, session }));
    }
  }, [join]);

  //세션이 있다면, 스트림을 넣어 될듯
  useEffect(() => {
    if (session) {
      // On every new Stream received...

      const handleStreamCreated = (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
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
      dispatch(joinSession({ OV, session, mySessionId, myUserName, gameRoomTitle, backgroundImage, maxPeople, roomPassword, userEmail, host, dispatch }));
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

  useEffect(() => {
    if (publisher !== undefined) {
      console.log('쿠키 세션에 이벤트 추가', publisher);
      publisher.stream.session.on('signal:timer', (e) => {
        console.log('여기는 데이터야...', e);
        dispatch(setStart(true));
      });
    }
  }, [publisher]);

  const startSignal = (publisher) => {
    const data = {
      message: 'start'
    };
    publisher.stream.session.signal({
      data: JSON.stringify(data),
      type: 'timer'
    });
  };

  //게임방 나가기 시작여부 확인
  const gameOut = async () => {
    try {
      const response = await axios.post(APPLICATION_SERVER_URL + '/api/game/out', {}, { params: { gameId } });
      console.log(response);
    } catch (err) {
      return;
    }
  };

  const gameStart = async () => {
    try {
      console.log('gameroom ID니까 ', gameRoomId);
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/start',
        { gameRoomId },
        {
          params: { gameRoomId },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const endGame = async () => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/stop',

        {
          params: {
            gameRoomId: gameRoomId
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
      );
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const modalSignal = (props) => {
    console.log('여기는 데이터인데', props);

    const data = {
      gameRankList: props.ranking
    };
    props.publisher.stream.session.signal({
      data: JSON.stringify(data),
      type: 'gamerank'
    });
  };
  //게임 탈락
  const fallAxios = async () => {
    console.log('비움시간', biumSecond);
    try {
      console.log('당신은 탈락했습니다');
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/over',
        { gameId: gameId, gameRecord: biumSecond },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
      );
      dispatch(setStart(false));
      // dispatch(setGameFallCount(gameFallCount));
      if (typeof response.data === 'object') {
        const ranking = response.data;
        modalSignal({ publisher, ranking });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (publisher !== undefined) {
      console.log('쿠키 세션에 이벤트 추가', publisher);
      publisher.stream.session.on('signal:gamerank', (e) => {
        console.log('여기는 랭크리스트야...', JSON.parse(e.data).gameRankList);
        setGameRankList(JSON.parse(e.data).gameRankList);
        setRankModal(true);
        console.log(rankModal);
      });
    }
  }, [start]);

  useEffect(() => {
    if (gameFallCount > 1 && gameFallCount < 3) {
      fallAxios();
    }
  }, [gameFallCount]);
  return (
    <div>
      {/* join 이후 화면 */}
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{gameRoomTitle}</h1>
          </div>
          <div id="session-sidebar">
            <input className="btn btn-large btn-danger" type="button" id="buttonLeaveSession" onClick={handleLeaveSession} value="Leave session" />
            <input className="btn btn-large btn-success" type="button" id="buttonSwitchCamera" onClick={setAudioMute} value="Mute Audio" />
            {host === true ? <button>수정</button> : null}
          </div>
          {gameRankList === null ? <h3>트루</h3> : <h3>팰스</h3>}

          {rankModal && gameRankList !== [] ? (
            <div>
              {gameRankList.map((rank, id) => {
                return <EndGameRank rank={rank}></EndGameRank>;
              })}
            </div>
          ) : (
            <>
              <h6>하나루</h6>
            </>
          )}
          <h3>당신의 탈락 카운트{start ? <> {gameFallCount}</> : null}</h3>
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
            {host ? (
              <button
                onClick={() => {
                  gameStart();
                  startSignal(publisher);
                }}
              >
                Start
              </button>
            ) : null}

            {start ? <Timer></Timer> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default GameRoomPage;
