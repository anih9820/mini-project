import React from 'react';
import { Navigate } from 'react-router-dom';

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;  
};

const AuthGuard = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signup" replace />;
  }

  return children; 
};

export default AuthGuard;
