// src/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

 console.log(token);
 console.log(user);
  // If no token or user data, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles provided, check if user's role matches
  if (allowedRoles && !allowedRoles.includes(user)) {
    console.log(allowedRoles);
    console.log("hello");
    return <Navigate to="/unauthorized" replace />;
  }

  // Else allow access
  return children;
};

export default ProtectedRoute;
