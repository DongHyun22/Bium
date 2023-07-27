import React, { useState } from 'react';

// 서버에서 데이터를 받아와서 시간을 변환하는 함수
function useGetBiumTime() {
  const [time, setTime] = useState("");

  // 총 시간을 '시:분:초' 형태의 문자열로 변환하는 함수
  const formatTime = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, '0')}`;
  };

  setTime(formatTime());

  return time;
}

export default useGetBiumTime;
