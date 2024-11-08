import React from 'react';
import Header from '../../../components/DashBoard/common/Header';
import { motion } from "framer-motion";
import StatCard from '../../../components/DashBoard/overview/StatCard';
import { Cpu, Database, MonitorCheck, Server, MemoryStick } from "lucide-react";
import ChartCard from '../../../components/DashBoard/overview/ChartCard';
import OverviewTable from '../../../components/DashBoard/overview/OverviewTable';
import { useOutletContext } from 'react-router-dom';

const OverviewPage = () => {
  const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Dashboard' isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 p-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name='Server CPU Load' icon={Database} value='0%' color='#6366F1' isDarkMode={isDarkMode} />
        <StatCard name='AMS CPU Load' icon={Cpu} value='0%' color='#8B5CF6' isDarkMode={isDarkMode} />
        <StatCard name='Active Live Stream' icon={MonitorCheck} value='1' color='#EC4899' isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 px-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ChartCard name='System Disk' icon={Server} value='0' color='#6366F1' isDarkMode={isDarkMode} percentage={66} />
        <ChartCard name='System Memory' icon={MemoryStick} value='0' color='#8B5CF6' isDarkMode={isDarkMode} percentage={33} />
        <ChartCard name='JVM Heap Memory' icon={Cpu} value='0' color='#EC4899' isDarkMode={isDarkMode} percentage={20} />
      </motion.div>

      <div className='p-10 flex-col'>
        <OverviewTable isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

export default OverviewPage;
