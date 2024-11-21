import React, {useEffect } from 'react'
import SideBar from '../../components/DashBoard/common/SideBar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../components/DashBoard/common/ThemeContext';
const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useTheme();
  const user = localStorage.getItem('user');
  console.log(user)
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    document.body.className = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-black';
  }, [isDarkMode]);
  return (
    <div className='flex h-screen overflow-hidden'>
          {/* BG */}
          <div className='fixed inset-0 z-0'>
            <div className={isDarkMode ? 'absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80': ''}/>
            <div className={isDarkMode ? 'absolute inset-0 backdrop-blur-sm': ''} />
          </div>

          <SideBar isDarkMode={isDarkMode} setIsDarkMode = {setIsDarkMode}/>

          <div className="flex-1 overflow-auto">
            <Outlet context={{isDarkMode, setIsDarkMode}}/>
          </div>
    </div>
  )
}

export default Dashboard
