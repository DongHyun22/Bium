// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setJoin,
//   audioMute,
//   deleteSubscriber,
//   enteredSubscriber,
//   initOVSession,
//   leaveSession,
//   setMainStreamManager
// } from '../../../slices/videoSlice/videoSlice';
// import UserVideoComponent from '../../atoms/VideoComponent/UserVideoComponent';
// import { OpenVidu } from 'openvidu-browser';
// import { joinSession } from '../../../slices/videoSlice/videoThunkActionSlice';
// import Timer from '../../atoms/Timer/Timer';
// import styles from './GamRoomPage.module.css';
// import { useNavigate } from 'react-router-dom';

// function GameRoomPage() {
//   console.log('start');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const join = useSelector((state) => state.video.join);
//   const roomName = useSelector((state) => state.video.roomName);
//   const OV = useSelector((state) => state.video.OV);
//   const session = useSelector((state) => state.video.session);
//   const publisher = useSelector((state) => state.video.publisher);
//   const mainStreamManager = useSelector((state) => state.video.mainStreamManager);
//   const mySessionId = useSelector((state) => state.video.mySessionId);
//   const myUserName = useSelector((state) => state.video.myUserName);
//   const subscribers = useSelector((state) => state.video.subscribers);

//   console.log('join', join);
//   const setAudioMute = () => {
//     dispatch(audioMute());
//   };

//   //   useEffect(() => {
//   //     // componentDidMount
//   //     window.addEventListener('beforeunload', onbeforeunload);

//   //     // componentWillUnmount
//   //     return () => {
//   //       window.removeEventListener('beforeunload', onbeforeunload);
//   //     };
//   //   }, []);

//   const onbeforeunload = (e) => {
//     dispatch(leaveSession());
//   };

//   const handleMainVideoStream = (stream) => {
//     if (mainStreamManager !== stream) {
//       dispatch(setMainStreamManager({ publisher: stream }));
//     }
//   };

//   useEffect(() => {
//     dispatch(setJoin(true));

//     return () => {
//       dispatch(setJoin(false));
//     };
//   }, [join]);

//   useEffect(() => {
//     if (join) {
//       const OV = new OpenVidu();
//       const session = OV.initSession();
//       console.log('OV:', OV);
//       console.log('session:', session);
//       dispatch(initOVSession({ OV, session }));
//     }
//   }, [join]);

//   //   // --- 3) Specify the actions when events take place in the session ---
//   //   useEffect(() => {
//   //     if (session) {
//   //       // On every new Stream received...
//   //       const handleStreamCreated = (event) => {
//   //         const subscriber = session.subscribe(event.stream, undefined);
//   //         dispatch(enteredSubscriber(subscriber));
//   //       };

//   //       // On every Stream destroyed...
//   //       const handleStreamDestroyed = (event) => {
//   //         dispatch(deleteSubscriber(event.stream.streamManager));
//   //       };

//   //       // On every asynchronous exception...
//   //       const handleException = (exception) => {
//   //         console.warn(exception);
//   //       };

//   //       session.on('streamCreated', handleStreamCreated);
//   //       session.on('streamDestroyed', handleStreamDestroyed);
//   //       session.on('exception', handleException);

//   //       dispatch(joinSession({ OV, session, mySessionId, myUserName }));

//   //       // Clean-up 함수 등록
//   //       return () => {
//   //         session.off('streamCreated', handleStreamCreated);
//   //         session.off('streamDestroyed', handleStreamDestroyed);
//   //         session.off('exception', handleException);
//   //         const mySession = session;
//   //         if (mySession) {
//   //           mySession.disconnect(); // 예시에서는 disconnect()로 대체하였으나, 이는 OpenVidu에 따라 다르게 적용될 수 있음
//   //         }
//   //       };
//   //     }
//   //   }, [session]);

//   const handleLeaveSession = () => {
//     if (session) {
//       session.disconnect();
//       dispatch(leaveSession());
//       setJoin(false);
//       navigate('/gameroomlist');
//     }
//   };

//   return (
//     <div>
//       {/* join 이후 화면 */}
//       {session !== undefined ? (
//         <div id="session">
//           <div id="session-header">
//             <h1 id="session-title">{mySessionId}</h1>
//           </div>
//           <div id="session-sidebar">
//             <input
//               className="btn btn-large btn-danger"
//               type="button"
//               id="buttonLeaveSession"
//               onClick={handleLeaveSession}
//               value="Leave session"
//             />
//             <input className="btn btn-large btn-success" type="button" id="buttonSwitchCamera" onClick={setAudioMute} value="Mute Audio" />
//           </div>
//           <div id="room-information">
//             <h1 id="room-name">{roomName}</h1>
//           </div>
//           <div className={styles.backimage}>
//             <div id="video-container">
//               {publisher !== undefined ? (
//                 <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
//                   <UserVideoComponent streamManager={publisher} />
//                 </div>
//               ) : (
//                 <h1>같이할 동료들을 연결 중</h1>
//               )}
//               {subscribers.map((sub) => (
//                 <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
//                   <span>{sub.id}</span>
//                   <UserVideoComponent streamManager={sub} />
//                 </div>
//               ))}
//               <Timer></Timer>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }
// export default GameRoomPage;
