import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/DashBoard/DashBoard';
import { useSelector } from 'react-redux';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import PrivateRoute from './pages/Auth/PrivateRoute';
import OverviewPage from './pages/DashBoard/pages/OverviewPage';
import ApplicationPage from './pages/DashBoard/pages/ApplicationPage';
import { ThemeProvider } from './components/DashBoard/common/ThemeContext';
import UserPage from './pages/DashBoard/pages/UserPage';
import WebHooksPage from './pages/DashBoard/pages/WebHooksPage';
import SettingPage from './pages/DashBoard/pages/SettingPage';
import LogsPage from './pages/DashBoard/pages/LogsPage';
import WatchStream from './pages/DashBoard/pages/WatchStream';
const App = () => {
  const { authToken } = useSelector(state => state.auth);
  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }
  }, [authToken]);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />
    },
    {
      path: "passwordreset/:resetToken",
      element: <ResetPassword />
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      children: [
        { index: true, element: <OverviewPage /> },
        { path: "applications", element: <ApplicationPage /> },
        { path: "users", element: <UserPage />},
        { path: "webhook", element: <WebHooksPage />},
        { path: "setting", element: <SettingPage />},
        { path: "logs", element : <LogsPage />},
      ]
    },
    {
      path: "/watchStream/:key",
      element: <WatchStream />
    }
  ]);

  return (
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
  );
}

export default App;
