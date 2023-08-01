import React, { useState } from 'react';

export const GameRoomListPage = () => {
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState('0');

  const onSelect = (event) => {
    setIndex(event.target.value);
  };
  return (
    <div>
      <button>방 만들기</button>
      <p>방 제목 검색</p>
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="제목을 검색하세요."></input>
      <button>검색</button>
      &nbsp;&nbsp;
      <select value={index} onChange={onSelect}>
        <option value="0">최신순</option>
        <option value="1">잔여인원순</option>
        <option value="2">오름차순</option>
        <option value="3">내림차순</option>
      </select>
    </div>
  );
};
export default GameRoomListPage;
