import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setJoin } from '../../../slices/videoSlice/videoSlice';
import { setRoomTitle, setRoomPassword, setMySessionId, setMyUserName, setMaxPeople, setBackgroundImage } from '../../../slices/roomSlice/roomSlice';

export const CreateGameRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSecret, setIsSecret] = useState(false);

  const gameRoomTitle = useSelector((state) => state.room.roomTitle);
  const roomPassword = useSelector((state) => state.room.roomPassword);
  const mySessionId = useSelector((state) => state.room.mySessionId);
  const myUserName = useSelector((state) => state.room.myUserName);
  const maxPeople = useSelector((state) => state.room.maxPeople);
  const backgroundImage = useSelector((state) => state.room.backgroundImage);

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
    dispatch(setRoomTitle({ gameRoomTitle: e.target.value }));
  };
  const handleChangeRoomPassword = (e) => {
    dispatch(setRoomPassword({ roomPassword: e.target.value }));
  };
  const handleChangeSessionId = (e) => {
    dispatch(setMySessionId({ mySessionId: e.target.value }));
  };
  const handleChangeUserName = (e) => {
    dispatch(setMyUserName({ myUserName: e.target.value }));
  };
  const handleChangeMaxPeople = (e) => {
    dispatch(setMaxPeople({ maxPeople: e.target.value }));
  };
  const handleChangeBackground = (e) => {
    dispatch(setBackgroundImage({ backgroundImage: e.target.value }));
  };

  return (
    <div>
      <div id="join">
        <div id="img-div">{/* <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" /> */}</div>
        <div id="join-dialog" className="jumbotron vertical-center">
          <h1> CreateGameRoom </h1>
          <form className="form-group" onSubmit={handleJoin}>
            <p>
              <label>GameRoomTitle: </label>
              <input className="form-control" type="text" id="gameRoomTitle" value={gameRoomTitle} onChange={handleChangeRoomTitle} required />
            </p>
            <p>
              <label>MaxPeople: </label>
              <select className="form-control" id="maxPeople" value={maxPeople} onChange={handleChangeMaxPeople}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </p>
            <p>
              <label>backImage: </label>
              <select className="form-control" id="backgroundImage" value={backgroundImage} onChange={handleChangeBackground}>
                <option value="1">불</option>
                <option value="2">물</option>
                <option value="3">숲</option>
              </select>
            </p>
            <p>
              <label>Participant: </label>
              <input className="form-control" type="text" id="userName" value={myUserName} onChange={handleChangeUserName} required />
            </p>
            <p>
              <label> Session: </label>
              <input className="form-control" type="text" id="sessionId" value={mySessionId} onChange={handleChangeSessionId} />
            </p>
            <p>
              <label> 비밀방 여부: </label>
              <input className="form-control" type="checkbox" id="secretRoom" value={isSecret} onChange={handleChangeisSecret} />
              {isSecret && (
                <div>
                  <label> Password: </label>
                  <input className="form-control" type="text" id="roomPassword" value={roomPassword} onChange={handleChangeRoomPassword} required />
                </div>
              )}
            </p>
            <p className="text-center">
              <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGameRoom;
