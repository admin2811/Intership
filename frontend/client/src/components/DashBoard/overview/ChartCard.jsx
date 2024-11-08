import React , {useState, useEffect}from 'react'
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const ChartCard = ({ name, icon: Icon, value, color, isDarkMode, percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 1000; // Thời gian chuyển động (ms)
    const incrementTime = 150; // Thời gian tăng giá trị (ms)
    const totalSteps = duration / incrementTime; // Số bước

    const increment = (end - start) / totalSteps; // Giá trị tăng mỗi bước

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        start = end; // Đảm bảo kết thúc tại giá trị cuối
      }
      setProgress(Math.round(start));
    }, incrementTime);

    return () => clearInterval(interval); // Dọn dẹp khi component bị gỡ bỏ
  }, [percentage]);
  return (
    <motion.div
    className={`${isDarkMode ? 
    'bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 flex justify-between'
    : 'bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-200 flex justify-between'}`}
    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
>
    <div className='px-8 py-12 sm:p-10'>
        <span className='flex items-center text-sm font-medium text-gray-400'>
            <Icon size={20} className='mr-2' style={{ color }} />
            {name}
        </span>
        <p className={`mt-6 text-3xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-black'}`}>
          {value}/{value}
        </p>
    </div>
    <div style={{ width: '100%', height: 'auto', maxWidth: 200, maxHeight: 200 }} className='p-10'>
        <CircularProgressbar 
          value={progress} 
          text={`${progress}%`} 
          styles={buildStyles({
              textColor: color,
              pathColor: color,
          })} 
          />
    </div>  
    
</motion.div>
  )
}
ChartCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired, // Validate icon as a component
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};
export default ChartCard
