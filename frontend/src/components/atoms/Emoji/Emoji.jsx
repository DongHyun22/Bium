import React from "react";

function getEmoji(rank) {
  switch (rank) {
    case 0:
      return <span>🥉</span>;
    case 1:
      return <span>🥈</span>;
    case 2:
      return <span>🥇</span>;
    case 3:
      return <span style={{color:'#A6603E'}}>🏆︎</span>;
    case 4:
      return <span style={{color:'#AEAEAE'}}>🏆︎</span>;
    case 5:
      return <span>🏆</span>;
    case 6:
      return <span>👑</span>;
    default:
      return "";
  }
}

export default getEmoji;
