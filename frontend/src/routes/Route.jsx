import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';
import GameReadyPage from '../components/pages/GameReadyPage/GameReadyPage';
import GameRoomPage from '../components/pages/GameRoomPage/GameRoomPage';
import { CreateGameRoom } from '../components/pages/CreateGameRoomPage/CreateGameRoomPage';
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage';

function RouteLink() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/gameready/" element={<GameReadyPage />} />
        <Route path="/api" element={<MainPage />} />
        <Route path="/api/login" element={<LoginPage />} />
        <Route path="/api/signup/" element={<SignupPage />} />
        <Route path="/api/createroom" element={<CreateGameRoom />} />
        <Route path="/api/room" element={<GameRoomPage />} />
        <Route path="/api/profile/:nickname" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
