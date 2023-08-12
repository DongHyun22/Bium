import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useNavigation } from 'react-router-dom';
import styles from './CreateGameRoomPage.module.css';
import { setJoin } from '../../../slices/videoSlice/videoSlice';
import { setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } from '../../../slices/roomSlice/roomSlice';

export const CreateGameRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSecret, setIsSecret] = useState(false);

  const gameRoomTitle = useSelector((state) => state.room.roomTitle);
  const roomPassword = useSelector((state) => state.room.roomPassword);
  const mySessionId = useSelector((state) => state.room.mySessionId);
  const myUserName = useSelector((state) => state.user.nickname);
  const maxPeople = useSelector((state) => state.room.maxPeople);
  const backgroundImage = useSelector((state) => state.room.backgroundImage);

  useEffect(() => {
    console.log('실행하나?');
    redirect('');
  }, []);
  // 방 생성
  const handleJoin = async (event) => {
    event.preventDefault();
    try {
      dispatch(setJoin(true));
      navigate('/gameroom');
    } catch (err) {
      alert('방을 생성할 수 없습니다.\n잠시 후 시도해 주세요');
    }
  };

  const handleChangeisSecret = () => {
    setIsSecret(!isSecret);
  };

  const handleChangeRoomTitle = (e) => {
    dispatch(setRoomTitle(e.target.value));
  };
  const handleChangeRoomPassword = (e) => {
    dispatch(setRoomPassword(e.target.value));
  };
  const handleChangeSessionId = (e) => {
    dispatch(setMySessionId(e.target.value));
  };
  const handleChangeUserName = (e) => {
    dispatch(setMyUserName(e.target.value));
  };
  const handleChangeMaxPeople = (e) => {
    dispatch(setMaxPeople(e.target.value));
  };
  const handleChangeBackground = (e) => {
    console.log(e.target.value);
    dispatch(setBackgroundImage(e.target.value));
  };

  return (
    <div>
      <div id="join" className={styles.container}>
      <div id="img-div" className={styles.photo}>{/* <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" /> */}</div>
        <div id="join-dialog" className={styles.joinDialog}>
          <h1 className={styles.titleCreateRoom}> 게임방 생성 </h1>
          <form className={styles.form} onSubmit={handleJoin}>
            <p className={styles.formGroup}>
              <label className={styles.label}>방 제목  </label><br></br>
                <input className={styles.formInput} type="text" id="gameRoomTitle" onChange={handleChangeRoomTitle} required />
            </p>
            <p className={styles.formGroup}>
              <label className={styles.label}>최대 인원  <br></br>
                <select className={styles.formSelect} id="maxPeople" onChange={handleChangeMaxPeople}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </label>
            </p>
            <p className={styles.formGroup}>
              <label className={styles.label}>배경 이미지 <br></br>
                <select className={styles.formSelect} id="backgroundImage" onChange={handleChangeBackground}>
                  <option value="1">불</option>
                  <option value="2">물</option>
                  <option value="3">숲</option>
                </select>
              </label>
            </p>
            {/* <p>
              <label>Participant: </label>
              <input className="form-control" type="text" id="userName" value={myUserName} onChange={handleChangeUserName} required />
            </p>
            <p>
              <label> Session: </label>
              <input className="form-control" type="text" id="sessionId" value={mySessionId} onChange={handleChangeSessionId} />
            </p> */}
            <p className={styles.formGroup}>
              <label className={styles.label}> 비밀방 여부 
              <input className={styles.formInput} type="checkbox" id="secretRoom" value={isSecret} onChange={handleChangeisSecret} />
              {isSecret && (
                <div>
                  <label className={styles.password}> Password <br></br>
                    <input className={styles.formInput} type="text" id="roomPassword" value={roomPassword} onChange={handleChangeRoomPassword} required />
                  </label>
                </div>
              )}
              </label>
            </p>
            <p className={styles.formButton}>
              <input className={styles.joinButton} name="commit" type="submit" value="같이 하기" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGameRoom;
