import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const mainComponent = '123';

  return (
    <div>
      <h1>MainPage</h1>
      <div>{mainComponent}</div>
    </div>
  );
};
export default MainPage;
