import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';

const useAuth = () => {
  const user = localStorage.getItem('SystemUser')
  if(user){
    return true
  } else {
    return false
  }
}

const PrivateRoutes = () => {

  const auth = useAuth();
  
  return auth? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoutes;