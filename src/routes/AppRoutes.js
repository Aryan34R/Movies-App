
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup'
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProfilePage from "../pages/Profile";
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/' element={<PrivateRoutes/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
