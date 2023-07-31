import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';

function RouteLink() {
  return (
    <div>
      <Routes>
        <Route path="/api" element={<MainPage />} />
        <Route path="/apilogin/" element={<LoginPage />} />
        <Route path="/apisignup/" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
