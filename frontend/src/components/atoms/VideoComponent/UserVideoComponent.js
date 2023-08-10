import React, { useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useSelector } from 'react-redux';
import emptyprofile from '../../../../src/asset/backgroudimage/emptyprofile.png';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };
  const OV = useSelector((state) => state.video.OV);
  const session = useSelector((state) => state.video.session);
  const subscribers = useSelector((state) => state.video.subscribers);
  const publisher = useSelector((state) => state.video.publisher);

  const [disturb, setDisturb] = useState(false);
  const start = useSelector((state) => state.room.start);
  return (
    <div>
      <div>
        <p>{getNicknameTag()}</p>
      </div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          {props.streamManager === publisher ? (
            <button
              onClick={() => {
                setDisturb(true);
              }}
            >
              방해하기 버튼
            </button>
          ) : null}

          {disturb && start === false ? (
            <>
              <img src={emptyprofile} alt="사진이 없어..." />
            </>
          ) : (
            <OpenViduVideoComponent streamManager={props.streamManager} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
