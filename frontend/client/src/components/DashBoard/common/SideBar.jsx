import React, { useState} from 'react';
import { BarChart2, AppWindowIcon, User, Settings, Webhook, Menu, Moon, SunMoon, Notebook } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../../css/Sidebar.css';
const SideBar = ({isDarkMode, setIsDarkMode}) => {
  const SIDEBAR_ITEMS = [
    {
      name: 'Dashboard',
      icon: BarChart2,
      color: "#6366f1",
      href: '/dashboard',
    },
    {
      name: 'Applications',
      icon: AppWindowIcon,
      color: "#8B5CF6",
      href: '/dashboard/applications',
    },
    {
      name: 'Users',
      icon: User,
      color: "#EC4899",
      href: '/dashboard/users',
    },
    {
      name: 'Webhook',
      icon: Webhook,
      color: "#10B981",
      href: '/dashboard/webhook',
    },
    {
      name: 'Settings',
      icon: Settings,
      color: "#3B82F6",
      href: '/dashboard/setting',
    },
    {
      name:'Logs',
      icon: Notebook,
      color: '#F87171',
      href: '/dashboard/logs',
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className={isDarkMode ? 'h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700': 
      'h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r-2 text-black'}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors max-w-fit`}
        >
          <Menu size={24} />
        </motion.button>

        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-4 text-sm font-medium rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors mb-2`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {(isSidebarOpen || hoveredItem === item.name) && (
                    <motion.span
                      className={`${isSidebarOpen ? "ml-4" : "ml-10"} 
                      whitespace-nowrap ${isDarkMode ? "text-white" : "text-black"}` }
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
          {/* Button to change background color with item */}
          <motion.button
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={()=> setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors max-w-fit mt-36`}
          >
            {isDarkMode ? <Moon size={20} /> : <SunMoon size={24} />}
          </motion.button>
        </nav>
      </div>
    </motion.div>
  );
}

export default SideBar;
