import React, { useEffect, useRef } from 'react';

function AudioPlayer(url) {
  const audioRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트되면 오디오를 자동 재생합니다.
    audioRef.current.play();
  }, []);

  return (
    <audio ref={audioRef} autoPlay>
      <source src={url} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;
