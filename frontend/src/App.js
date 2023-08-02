import React from 'react';
import './App.css';
import RouteLink from './routes/Route';
import NavBar from './components/atoms/NavBar/NavBar';
import { Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
