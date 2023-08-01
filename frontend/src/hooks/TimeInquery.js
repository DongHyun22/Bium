import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 서버에서 데이터를 받아와서 시간을 변환하는 함수
function useGetBiumTime() {
  const [time, setTime] = useState("");

  // 총 시간을 '시:분:초' 형태의 문자열로 변환하는 함수
  const formatTime = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;
    // 시, 분, 초가 한자리 수인 경우 0을 붙여 '02:04:09'와 같은 형태로 표현
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const getTimeData = async () => {
      try {
        const response = await axios.get('URL이 없네요...');
        const biumTime = response.data;

        setTime(formatTime(biumTime));
      } catch (error) {
        console.log(error)
      }
    }
    getTimeData();
  });

  return time;
}

export default useGetBiumTime;
