import React, { useEffect, useState } from 'react';
import { NameInitialsAvatar } from 'react-name-initials-avatar';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/authSlice';
import '../../../css/Header.css';
const Header = ({ title, isDarkMode}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // localStorage.removeItem('activeStreams')
    // localStorage.removeItem('streamStatus');
    navigate('/login');
  } 
  const handleLogout = () => {
    //Loại bỏ background đã lưu vào localStorage
    logoutHandler();
    document.body.className = 'bg-white text-black'; 
  }
  return (
    <header className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex justify-between relative z-10' : 
      'bg-white bg-opacity-50 backdrop-blur-md shadow-lg border-b-2 flex justify-between relative z-10'}`}>
      <div className='max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
        <h1 className={`${isDarkMode ? 'text-2xl font-semibold text-gray-100' : 'text-2xl font-semibold text-black'}`}>
          {title}
        </h1>
      </div>
      <div className='flex justify-between items-center mr-10 gap-x-5'>
        <p className='hidden lg:block'>{username}</p>
        <div className='cursor-pointer relative'>
          <button className='text-white group' onClick={toggleMenu}>
            <NameInitialsAvatar name={username} width={40} height={40} fontSize={20} />
            {menuOpen && (
              <div className='absolute bg-white rounded-lg shadow w-32 z-20 top-full right-0 flex-col'>
                <ul className='py-2 text-sm text-gray-950 flex-col'>
                  <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer'>Profile</li>
                  <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer' onClick={handleLogout}>Log Out</li>
                </ul>
              </div> 
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
