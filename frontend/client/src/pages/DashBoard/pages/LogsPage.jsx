import React from 'react'
import Header from '../../../components/DashBoard/common/Header';
import { useOutletContext } from 'react-router-dom';
const LogsPage = () => {
    const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
    return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Logs Page' isDarkMode={isDarkMode} setIsDarkMode = {setIsDarkMode} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

      </main>
    </div>
    )
}

export default LogsPage
