import { useState } from 'react';
import React from 'react';
import GameReady from '../GameReadyPage/GameReadyPage';

function CreateGame() {
  const [inputTitle, setInputTitle] = useState('');
  const [titleList, setTitleList] = useState([]);
  const videos = ['불', '물', '산', '야경'];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const [number, setNumber] = useState(0);

  const [secret, setSecret] = useState(false);

  const addItem = () => {
    setTitleList([...titleList, inputTitle]);
    setInputTitle(''); // 입력창의 내용 지움
  };

  const handleDecrease = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const handleIncrease = () => {
    if (number < 8) {
      setNumber(number + 1);
    }
  };
  return (
    <div>
      <p>방 제목</p>
      <input type="text" value={inputTitle} onChange={(event) => setInputTitle(event.target.value)}></input>
      <button onClick={addItem}>추가</button>
      <GameReady titleList={titleList}></GameReady>
      <hr></hr>

      <p>영상 종류</p>
      {videos.map((video) => (
        <label key={video}>
          <input
            type="radio"
            name="video"
            onChange={(e) => setSelectedVideo(video)}
            checked={video == selectedVideo}
          ></input>
          {video}
          &nbsp;
        </label>
      ))}
      <p>현재: {selectedVideo}</p>
      <hr></hr>

      <p>최대 인원</p>
      <div>
        숫자 : {number}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleIncrease}>▲</button>
        &nbsp;
        <button onClick={handleDecrease}>▼</button>
      </div>
      <hr></hr>

      <p>비밀방</p>
      <input type="radio" name="secret"></input>
    </div>
  );
}

export default CreateGame;
