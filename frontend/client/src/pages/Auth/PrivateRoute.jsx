import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { authToken } = useSelector(state => state.auth);
  const storedAuthToken = localStorage.getItem('authToken'); // Lấy token từ localStorage

  // Kiểm tra nếu người dùng không có authToken thì chuyển hướng về trang Login
  if (!authToken && !storedAuthToken) {
    return <Navigate to="/login" />;
  }

  // Nếu người dùng có token, render component con (trang Dashboard)
  return children;
};

export default PrivateRoute;
