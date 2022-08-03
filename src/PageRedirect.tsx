import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PageRedirect: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return <Navigate replace to="/main" />;
  }

  return null;
};

export default PageRedirect;
