import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedProfileRoute = () => {
    const user = localStorage.getItem('logged-in');

    if (!user !== 'logged-in') {
        alert('Access Denied: Only logged in users can view this page.');
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedProfileRoute;