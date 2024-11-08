import React from 'react'
import Header from '../../../components/DashBoard/common/Header';
import { useOutletContext } from 'react-router-dom';
import UsersTable from '../../../components/DashBoard/users/UserTable';
const UserPage = () => {
    const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
    return (
    <div className='flex-1 relative z-10'>
      <Header title='User Page' isDarkMode={isDarkMode} setIsDarkMode = {setIsDarkMode} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <UsersTable isDarkMode={isDarkMode}/>
      </main>
    </div>
    )
}

export default UserPage
