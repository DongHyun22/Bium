import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';
import GameReadyPage from '../components/pages/GameReadyPage/GameReadyPage';

function RouteLink() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/gameready/" element={<GameReadyPage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
