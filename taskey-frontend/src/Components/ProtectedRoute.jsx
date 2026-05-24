import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/user-dashboard" replace />;
    }

    if (userOnly && user.role === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
