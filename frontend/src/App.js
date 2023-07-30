import React from 'react';
import RouteLink from './routes/Route';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/room">게임방입장</Link>

      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
