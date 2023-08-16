import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { OpenVidu, SignalEvent } from 'openvidu-browser';
import axios from 'axios';

import { joinSession } from '../../../slices/videoSlice/videoThunkActionSlice';
import { setJoin, audioMute, deleteSubscriber, enteredSubscriber, initOVSession, leaveSession } from '../../../slices/videoSlice/videoSlice';
import { leaveRoom, setBackgroundImage, setDisturb, setErrorSolve, setGameFallCount, setGameRankList, setMySessionId, setRankModal, setRoomTitle, setStart } from '../../../slices/roomSlice/roomSlice';

import UserVideoComponent from '../../atoms/VideoComponent/UserVideoComponent';
import Timer from '../../atoms/Timer/Timer';
import styles from './GameRoomPage.module.css';
import EndGameRank from '../../molecules/EndGameRank/EndGameRank';

import img1 from '../../../asset/backgroudimage/firebase2.gif';
import img2 from '../../../asset/backgroudimage/rainbase1.gif';

import { IoLogOutOutline } from 'react-icons/io5';

import Confetti from '../../atoms/Confeti/Confeti';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';
let backImage = '';

function GameRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const mySessionId = useSelector((state) => state.room.mySessionId);
  const gameRoomTitle = useSelector((state) => state.room.roomTitle);
  const backgroundImage = useSelector((state) => state.room.backgroundImage);
  if (location.state) {
    const customSessionId = location.state.customSessionId;
    const gameTitle = location.state.gameRoomTitle;
    const backenterimage = location.state.gameRoomMovie;
    console.log(backenterimage);
    dispatch(setMySessionId(customSessionId));
    dispatch(setRoomTitle(gameTitle));
    dispatch(setBackgroundImage(`${backenterimage}`));
  }

  const userEmail = useSelector((state) => state.user.userEmail);
  const roomPassword = useSelector((state) => state.room.roomPassword);
  const host = useSelector((state) => state.room.host);

  const myUserName = useSelector((state) => state.user.nickname);
  const maxPeople = useSelector((state) => state.room.maxPeople);
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
  const gameRankList = useSelector((state) => state.room.gameRankList);
  const rankModal = useSelector((state) => state.room.rankModal);
  const errorSolve = useSelector((state) => state.room.errorSolve);
  const disturb = useSelector((state) => state.room.disturb);

  useEffect(() => {
    if (backgroundImage === '1') {
      console.log('백이미지버놓11111', backgroundImage);
      backImage = img1;
    } else if (backgroundImage === '2') {
      console.log('백이미지버놓2222', backgroundImage);
      backImage = img2;
    }
  }, [backgroundImage]);

  const onbeforeunload = (e) => {
    dispatch(leaveSession());
  };

  const setAudioMute = () => {
    dispatch(audioMute());
  };

  const gameOut = async (props) => {
    console.log('여기 프롮', props);
    const kkk = props;
    console.log('이건 idx', kkk);
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/out',
        {},
        {
          params: { gameId: kkk },
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

  const handleLeaveSession = () => {
    if (session) {
      session.disconnect();
      gameOut();
      dispatch(leaveSession());
      dispatch(setJoin(false));
      navigate('/gameroomlist', { replace: true });
    }
  };

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

  const gameStart = async () => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/start',
        {},
        {
          params: { gameRoomId },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
      );
    } catch (err) {}
  };

  const endGame = async () => {
    try {
      console.log('몇명만 해?');
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/game/delete',
        {},
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
    } catch (err) {
      return;
    }
  };

  const modalSignal = (props) => {
    const rankdata = {
      gameRankList: props.ranking
    };
    props.publisher.stream.session.signal({
      data: JSON.stringify(rankdata),
      type: 'gamerank'
    });
  };
  //게임 탈락
  const fallAxios = async () => {
    try {
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
      console.log(response.data);
      console.log(typeof response.data);
      if (typeof response.data === 'object') {
        console.log('누구누구 요청해?', typeof response.data === 'object');
        const ranking = response.data;
        modalSignal({ publisher, ranking });
        endGame();
      }
    } catch (err) {
      return;
    }
  };
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
      console.log('여기가 문제인지 확인하고 싶어', session, OV);
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
      console.log('디스 시작');
      dispatch(joinSession({ OV, session, mySessionId, myUserName, gameRoomTitle, backgroundImage, maxPeople, roomPassword, userEmail, host, dispatch }));

      // Clean-up 함수 등록
      return () => {
        console.log('등록이 되는 순간이 언제일까?');
        console.log('clear');
        session.off('streamCreated', handleStreamCreated);
        session.off('streamDestroyed', handleStreamDestroyed);
        session.off('exception', handleException);
        // dispatch(leaveRoom());
        dispatch(leaveSession());

        const mySession = session;
        if (mySession) {
          mySession.disconnect(); // 예시에서는 disconnect()로 대체하였으나, 이는 OpenVidu에 따라 다르게 적용될 수 있음
        }
      };
    }
  }, [session]);
  useEffect(() => {
    if (publisher !== undefined) {
      publisher.stream.session.on('signal:gamerank', (e) => {
        dispatch(setGameRankList(JSON.parse(e.data).gameRankList));
        dispatch(setRankModal(true));
      });
    }
  }, [start]);
  useEffect(() => {
    if (publisher !== undefined) {
      publisher.stream.session.on('signal:disturb', (e) => {
        dispatch(setDisturb(true));
        setTimeout(() => {
          dispatch(setDisturb(false));
        }, 30);
      });
    }
  }, [publisher]);

  useEffect(() => {
    return () => {
      gameOut(gameId);
    };
  }, [gameId]);

  useEffect(() => {
    if (rankModal === true) {
      setTimeout(() => {
        console.log('axions 요청중이니까 확인해줄래?');
        dispatch(setGameRankList(null));
        dispatch(setRankModal(false));
        dispatch(setJoin(false));
        // dispatch(leaveRoom());
        dispatch(leaveSession());
        window.location.href = '/gameroomlist';
      }, 6000);
    }
  }, [gameRankList]);

  useEffect(() => {
    if (gameFallCount > 1 && gameFallCount < 3) {
      fallAxios();
    }
  }, [gameFallCount]);

  useEffect(() => {
    if (errorSolve === true) {
      // dispatch(leaveRoom());
      dispatch(leaveSession());
      alert('이미 사라진 방입니다.');
      window.location.href = '/gameroomlist';
    }

    return () => {
      if (errorSolve === true) {
        setErrorSolve(false);
      }
    };
  }, [errorSolve]);
  // 컴포넌트 마운트, 언마운트 시 session 값 초기화

  useEffect(() => {
    if (publisher !== undefined) {
      publisher.stream.session.on('signal:timer', (e) => {
        dispatch(setStart(true));
      });
    }
  }, [publisher]);

  useEffect(() => {
    console.log('gameId 바뀔때마다 출력해');
  }, [gameId]);
  useEffect(() => {}, [disturb]);

  return (
    <div className={styles.backimage} style={{ backgroundImage: `url(${backImage})` }}>
      {rankModal && gameRankList !== null ? (
        <div className={styles.endGame}>
          <div className={styles.endGameText}>
            <p>안녕하세요 {myUserName} 님!</p>
            <p>오늘 당신의 비움은 잘하셨나요?</p>
          </div>
          <div className={styles.endgameTitleBox}>
            <>{gameRankList !== null ? <p>비움표</p> : null}</>
            {gameRankList.map((rank) => (
              <>
                <EndGameRank key={rank.index} rank={rank} />
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          {/* join 이후 화면 */}
          {session !== undefined ? (
            <div className={styles.gameroom}>
              {host && start === false ? (
                <button
                  className={styles.gameStartbutton}
                  onClick={() => {
                    gameStart();
                    startSignal(publisher);
                  }}
                >
                  <p>게임 시작</p>
                </button>
              ) : null}
              {/* 게임방 제목 */}
              <div className={styles.gameTitleBox}>
                <p className={styles.gameroomTitle} id="session-title">
                  {gameRoomTitle}
                </p>
                {host === true ? (
                  <button className={styles.updateButton}>
                    <p>수정</p>
                  </button>
                ) : null}
              </div>

              <div className={styles.playerVideosBox} id="video-container">
                <div className={styles.countBox}>
                  <p className={styles.countText}>{start ? <> 탈락 카운트 :{gameFallCount}</> : <>탈락 카운트 </>}</p>
                  <button className={styles.gameoutButton} onClick={handleLeaveSession}>
                    <IoLogOutOutline className={styles.gameoutIcon}></IoLogOutOutline>
                    <p className={styles.gameoutText}>나가기</p>
                  </button>
                </div>
                {publisher !== undefined ? (
                  <>
                    <UserVideoComponent streamManager={publisher} />
                  </>
                ) : (
                  <div className={styles.bg}>
                    <div className={styles.camloader}></div>
                  </div>
                )}
                {subscribers.map((sub) => (
                  <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
              {/* 빵빠레 */}
              {disturb ? <Confetti></Confetti> : null}

              <Timer></Timer>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default GameRoomPage;
