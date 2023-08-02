import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';
import GameRoomListPage from '../components/pages/GameRoomListPage/GameRoomListPage';
import GameRoomPage from '../components/pages/GameRoomPage/GameRoomPage';
import CreateGameRoom from '../components/pages/CreateGameRoomPage/CreateGameRoomPage';
import { ProfilePage } from '../components/pages/ProfilePage/ProfilePage';
import { useSelector } from 'react-redux';

function RouteLink() {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createroom" element={<CreateGameRoom />} />
        <Route path="/gameroomlist" element={<GameRoomListPage />} />
        <Route path="/gameroom" element={<GameRoomPage />} />
        <Route path="/profile/{userEmail}" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
