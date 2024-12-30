import React from 'react';
import { Navigate } from 'react-router-dom';
import PrivateLayout from 'components/layout/PrivateLayout';

type UserTypes = {
  username: string;
  email: string;
} | null;

interface PrivateRouteProps {
  user: UserTypes;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  if (!user || !user.username || !user.email) {
    return <Navigate to="/login" />;
  }
  return <PrivateLayout />;
};

export default PrivateRoute;
