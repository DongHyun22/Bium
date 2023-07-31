import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';

function RouteLink() {
  return (
    <div>
      <Routes>
        <Route path="/api/" element={<MainPage />} />
        <Route path="/api/login/" element={<LoginPage />} />
        <Route path="/api/signup/" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
