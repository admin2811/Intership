import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/DashBoard/common/Header';
import { motion } from "framer-motion";
import StatCard from '../../../components/DashBoard/overview/StatCard';
import { Cpu, MonitorCheck, Server, MemoryStick } from "lucide-react";
import ChartCard from '../../../components/DashBoard/overview/ChartCard';
import OverviewTable from '../../../components/DashBoard/overview/OverviewTable';
import { useOutletContext } from 'react-router-dom';
import { fetchSystemStats } from '../../../redux/cpu/cpuSlice';
const OverviewPage = () => {
  const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
  const dispatch = useDispatch();
  const { cpuLoad, disk, memory, jvmHeap, loading } = useSelector(state => state.cpu);
  // Gọi action để lấy dữ liệu khi component render
  useEffect(() => {
    dispatch(fetchSystemStats());
  }, [dispatch]);

  const activeLive = localStorage.getItem('activeStreams');
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Dashboard' isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 p-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name='CPU Load' icon={Cpu} value={loading ? 'Loading...' : cpuLoad} color='#6366F1' isDarkMode={isDarkMode} />
        <StatCard name='AMS CPU Load' icon={Cpu} value='0%' color='#8B5CF6' isDarkMode={isDarkMode} />
        <StatCard name='Active Live Stream' icon={MonitorCheck} value={activeLive} color='#EC4899' isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 px-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ChartCard
          name="System Disk"
          icon={Server}
          value={loading ? 'Loading...' : `${disk.used} / ${disk.total}`}
          color="#6366F1"
          isDarkMode={isDarkMode}
          percentage={loading ? 0 : Math.round((parseFloat(disk.used) / parseFloat(disk.total)) * 100)} // Calculate percentage only once
        />

        <ChartCard
          name='Memory Usage'
          icon={MemoryStick}
          value={loading ? 'Loading...' : `${memory.used} / ${memory.total}`}
          color='#8B5CF6'
          isDarkMode={isDarkMode}
          percentage={loading ? 0 : Math.round((parseFloat(memory.used) / parseFloat(memory.total)) * 100)}
        /> 
        <ChartCard
          name='JVM Heap Memory'
          icon={Cpu}
          value={loading ? 'Loading...' : `${jvmHeap.used} / ${jvmHeap.total}`}
          color='#EC4899'
          isDarkMode={isDarkMode}
          percentage={Math.round((parseFloat(jvmHeap.used) / parseFloat(jvmHeap.total)) * 100)}
        />      </motion.div>

      <div className='p-10 flex-col'>
        <OverviewTable isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

export default OverviewPage;
