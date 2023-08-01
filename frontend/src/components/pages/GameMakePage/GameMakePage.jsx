import { useState } from 'react';
import React from 'react';
import GameReady from '../GameReadyPage/GameReadyPage';

function CreateGame() {
  const [title, setTitle] = useState('');
  const [roomList, setRoomList] = useState(['1']);
  const videos = ['불', '물', '산', '야경'];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const [player, setPlayer] = useState(0);

  const [secret, setSecret] = useState(false);

  const [showGameReadyPage, setShowGameReadyPage] = useState(false);
  // const addItem = () => {
  //   // let copyTitleList = [...titleList]
  //   // copyTitleList.unshift(inputTitle)
  //   // setTitleList(copyTitleList)

  //   setTitleList([...titleList, inputTitle]);
  //   console.log(titleList)
  // };

  const handleDecrease = () => {
    if (player > 0) {
      setPlayer(player - 1);
    }
  };

  const handleIncrease = () => {
    if (player < 8) {
      setPlayer(player + 1);
    }
  };

  const handleCreateGame = () => {
    const roomInfo = {
      title,
      videotype: selectedVideo,
      currentplayers: player,
      inSecret: secret
    };
    setRoomList([...roomList, roomInfo]);

    setShowGameReadyPage(true);
  };
  return (
    <div>
      <p>방 제목</p>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
      {/* <button onClick={addItem}>추가</button>
      <GameReady titleList={titleList}></GameReady> */}
      <hr></hr>

      <p>영상 종류</p>
      {videos.map((video) => (
        <label key={video}>
          <input type="radio" name="video" onChange={(e) => setSelectedVideo(video)} checked={video == selectedVideo}></input>
          {video}
          &nbsp;
        </label>
      ))}
      <p>현재: {selectedVideo}</p>
      <hr></hr>

      <p>최대 인원</p>
      <div>
        숫자 : {player}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleIncrease}>▲</button>
        &nbsp;
        <button onClick={handleDecrease}>▼</button>
      </div>
      <hr></hr>

      <div>
        <p>비밀방</p>
        <input type="radio" name="secret"></input>
      </div>

      <button>취소</button>
      <button onClick={handleCreateGame}>방 생성</button>

      {/* {showGameReadyPage && <GameReady roomList={roomList} />} */}
    </div>
  );
}

export default CreateGame;
