import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import { joinSession } from '../../../slices/videoSlice/videoThunkActionSlice';
import { setJoin, deleteSubscriber, enteredSubscriber, initOVSession, leaveSession } from '../../../slices/videoSlice/videoSlice';
import { leaveRoom, setBackgroundImage, setDisturb, setErrorSolve, setGameRankList, setMySessionId, setRankModal, setRoomTitle, setStart } from '../../../slices/roomSlice/roomSlice';

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
let backaudio = null;

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
    dispatch(setMySessionId(customSessionId));
    dispatch(setRoomTitle(gameTitle));
    dispatch(setBackgroundImage(`${backenterimage}`));
  } else {
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
      backImage = img1;
      backaudio = new Audio('/audios/fireaudio.mp3');
      backaudio.loop = true;
    } else if (backgroundImage === '2') {
      backImage = img2;
      backaudio = new Audio('/audios/rainaudio3.mp3');
      backaudio.loop = true;
    }
  });

  const onbeforeunload = (e) => {
    dispatch(leaveSession());
  };

  const gameOut = async (props) => {
    const kkk = props;

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
    } catch (err) {}
  };

  const handleLeaveSession = () => {
    if (session) {
      session.disconnect();
      gameOut();
      dispatch(leaveSession());
      dispatch(setJoin(false));
      window.location.href = '/gameroomlist';
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
      if (typeof response.data === 'object') {
        const ranking = response.data;
        modalSignal({ publisher, ranking });
        endGame();
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

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
      backaudio.play();

      // Clean-up 함수 등록
      return () => {
        session.off('streamCreated', handleStreamCreated);
        session.off('streamDestroyed', handleStreamDestroyed);
        session.off('exception', handleException);
        backaudio.pause();

        dispatch(leaveRoom());
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
        }, 3000);
      });
    }
  }, [publisher]);

  useEffect(() => {
    return () => {
      if (gameId !== null) {
        gameOut(gameId);
      }
    };
  }, [gameId]);

  useEffect(() => {
    if (rankModal === true) {
      setTimeout(() => {
        dispatch(setGameRankList(null));
        dispatch(leaveRoom());
        dispatch(leaveSession());
        window.location.href = '/gameroomlist';
      }, 6000);
    }
  }, [gameRankList]);

  useEffect(() => {
    if (gameFallCount > 10) {
      fallAxios();
    }
  }, [gameFallCount]);

  useEffect(() => {
    if (errorSolve === true) {
      dispatch(leaveRoom());
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

  return (
    <div className={styles.backimage} style={{ backgroundImage: `url(${backImage})` }} >
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
        <>
          {/* join 이후 화면 */}
          {session !== undefined ? (
            <div className={styles.gameroom}>
              {host && start === false && gameFallCount === 0 ? (
                <button
                  className={styles.gameStartbutton}
                  onClick={() => {
                    gameStart();
                    startSignal(publisher);
                  }}
                >
                  <p>비움 시작</p>
                </button>
              ) : null}
              {/* 게임방 제목 */}
              <div className={styles.gameTitleBox}>
                <p className={styles.gameroomTitle} id="session-title">
                  {gameRoomTitle}
                </p>
                {host === true ? (
                  <button className={styles.updateButton}>
                    <p>✏️수정</p>
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
                  <div key={sub.stream.connection.connectionId}>
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
              {/* 빵빠레 */}
              {disturb ? <Confetti></Confetti> : null}
              <Timer></Timer>{' '}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
export default GameRoomPage;
