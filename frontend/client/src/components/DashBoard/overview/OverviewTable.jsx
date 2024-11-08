import React , {useState, useEffect}from 'react'
import { motion } from 'framer-motion'
import { Search } from "lucide-react";
import FormOverview from './FormOverview';
const OverviewTable = ({isDarkMode}) => {
  const [addSection, setAddSection] = useState(false);
  const data = [
    {id: 1,name: 'test', live: 1, ram: '10GB'}
  ];
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setAddSection(false);
        }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
  },[])
  return (
    <div className='relative'>
      <motion.div
				className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6' : 
                'bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6'}`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
                 <div className='flex justify-between items-center mb-6'>
					<h2 className={`${isDarkMode ? 'text-xl font-semibold text-gray-100' : 'text-xl font-semibold text-black'}`}>Overview Page</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search users...'
							className= {`${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-white text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
						/>
						<Search className={`${isDarkMode ? 'absolute left-3 top-2.5 text-gray-400' : 'absolute left-3 top-2.5 text-black'}`} size={18}  />
                        <button
						className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
						onClick={() => setAddSection(true)}>
						    Add +
					    </button>
					</div>
				</div>
                <div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Code</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Live Stream Active</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Ram Usage</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-700'>
							{ data[0] ? (
								data.map((user) => {
									return (					
								<motion.tr
									key={user.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.id}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='flex items-center'>
											<div className='ml-4'>
												<div className={`${isDarkMode ? 'text-sm font-medium text-gray-100': 'text-sm font-medium text-black'}`}>{user.name}</div>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.live}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.ram}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
										<button className='text-red-400 hover:text-red-300'>Delete</button>
									</td>
								</motion.tr>
								);
							})): (
								<p>No data</p>
							)
						}
						</tbody>
					</table>
				    </div>
                    
        </motion.div>
        {addSection && (
                <FormOverview isDarkMode={isDarkMode} rest={{name: data[0].name}} />
        )}
    </div>
  )
}
export default OverviewTable
