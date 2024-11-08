import React from 'react'
import Header from '../../../components/DashBoard/common/Header'
import { useOutletContext } from 'react-router-dom';
import AppTable from '../../../components/DashBoard/applications/AppTable';
const ApplicationPage = () => {
  const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
  return (
    <div className='flex-1 relative z-10'>
      <Header title='Application' isDarkMode={isDarkMode} setIsDarkMode = {setIsDarkMode} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <AppTable isDarkMode={isDarkMode} />
      </main>
    </div>
  )
}

export default ApplicationPage
