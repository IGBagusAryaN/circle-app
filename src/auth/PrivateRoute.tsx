
import PrivateLayout from "components/layout/PrivateLayout";
import React from "react";
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
    isAuthenticated: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({isAuthenticated}) => {
    return isAuthenticated ? <PrivateLayout/> : <Navigate to="/login"/>;
};

export default PrivateRoute