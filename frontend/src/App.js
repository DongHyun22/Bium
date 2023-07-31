import React from 'react';
import RouteLink from './routes/Route';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/api/login">로그인</Link>
      <Link to="/api/signup">회원가입</Link>

      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
