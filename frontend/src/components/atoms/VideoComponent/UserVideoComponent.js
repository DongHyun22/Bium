import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useSelector } from 'react-redux';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };
  const OV = useSelector((state) => state.video.OV);
  const session = useSelector((state) => state.video.session);
  const subscribers = useSelector((state) => state.video.subscribers);

  console.log('확인해', OV, session, subscribers);
  return (
    <div>
      <div>
        <p>{getNicknameTag()}</p>
      </div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
