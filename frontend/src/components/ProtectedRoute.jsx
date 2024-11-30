import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');

  // Redirect to login if userRole is not found
  if (!userRole) {
    return <Navigate to="/" />;
  }

  // Render the child components if authenticated
  return children;
};

export default ProtectedRoute;
