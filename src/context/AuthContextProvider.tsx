import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { getToken } = useAuth();
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />; //avoid rehydration mismatch
  }

  return <div>{children}</div>;
};

export default AuthContextProvider;
