import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const isAuthenticated = localStorage.getItem("currentUser");
  return (
    isAuthenticated ? <Navigate to="/dashboard"/> : <Outlet />
  )
}

export default PublicRoutes
