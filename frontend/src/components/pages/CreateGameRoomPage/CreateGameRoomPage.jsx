import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMySessionId, setMyUserName, setRoomName, setRoomPassword } from '../../../slices/video/videoAction';

export const CreateGameRoom = () => {
  const dispatch = useDispatch();

  const [join, setJoin] = useState(false);
  const [isSecret, setIsSecret] = useState(false);

  const roomPassword = useSelector((state) => state.video.roomPassword);
  const roomName = useSelector((state) => state.video.roomName);
  const mySessionId = useSelector((state) => state.video.mySessionId);
  const myUserName = useSelector((state) => state.video.myUserName);

  const handleJoin = (event) => {
    console.log('handleJoin');
    event.preventDefault();
    // setJoin(true);
  };

  const handleChangeisSecret = (e) => {
    setIsSecret(!isSecret);
  };

  const handleChangeRoomPassword = (e) => {
    dispatch(setRoomPassword({ roomPassword: e.target.value }));
  };
  const handleChangeRoomname = (e) => {
    dispatch(setRoomName({ roomName: e.target.value }));
  };
  const handleChangeSessionId = (e) => {
    dispatch(setMySessionId({ mySessionId: e.target.value }));
  };

  const handleChangeUserName = (e) => {
    dispatch(setMyUserName({ myUserName: e.target.value }));
  };

  return (
    <div>
      CreateGameRoom
      <div id="join">
        <div id="img-div">{/* <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" /> */}</div>
        <div id="join-dialog" className="jumbotron vertical-center">
          <h1> Join a video session </h1>
          <form className="form-group" onSubmit={handleJoin}>
            <p>
              <label>RoomName: </label>
              <input className="form-control" type="text" id="roomName" value={roomName} onChange={handleChangeRoomname} required />
            </p>
            <p>
              <label>Participant: </label>
              <input className="form-control" type="text" id="userName" value={myUserName} onChange={handleChangeUserName} required />
            </p>
            <p>
              <label> Session: </label>
              <input className="form-control" type="text" id="sessionId" value={mySessionId} onChange={handleChangeSessionId} required />
            </p>
            <p>
              <label> 비밀방 여부: </label>
              <input className="form-control" type="checkbox" id="secretRoom" value={isSecret} onChange={handleChangeisSecret} />
              {isSecret && (
                <div>
                  <label> Password: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="roomPassword"
                    value={roomPassword}
                    onChange={handleChangeRoomPassword}
                    required
                  />
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
