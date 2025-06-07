
import React from 'react';
import { Navigate } from 'react-router-dom';

const MessagesPage = () => {
  // Redirect to the main messages page
  return <Navigate to="/messages" replace />;
};

export default MessagesPage;
