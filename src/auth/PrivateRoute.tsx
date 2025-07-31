import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateLayout from 'components/layout/PrivateLayout';
import { useAuthStore } from 'store/use.auth.store';

const PrivateRoute: React.FC = () => {
  const { user, token, logout } = useAuthStore();

  if (!user || !token ) {
    logout(); // pakai logout() yang sudah kamu buat
    return <Navigate to="/login" replace />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoute;
