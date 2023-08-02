import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return isLogin ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
