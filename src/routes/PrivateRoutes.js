import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () =>{
    const isAuthenticated = localStorage.getItem("currentUser")
    return(
        isAuthenticated?<Outlet/>:<Navigate to="/"></Navigate>
    )
}
export default PrivateRoutes;