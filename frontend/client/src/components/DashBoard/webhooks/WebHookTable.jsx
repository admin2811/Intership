import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormWebHook from "./FormWebHook";
const WebhookTable = ({isDarkMode}) => {

	const [addSection, setAddSection] = useState(false);
	const data = [
		{id: 1,name: 'test', callback: 'http://119.82.23.4/api/v1/bot/sendMessage', headers: 'Bearer' , events: 'message'}
	]
	const [addDelete , setAddDelete] = useState(false);
	const [editSection, setEditSection] = useState(false);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setAddSection(false);
				setEditSection(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="relative">
			<motion.div
				className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6' : 
					'bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6'}`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className={`${isDarkMode ? 'text-xl font-semibold text-gray-100' : 'text-xl font-semibold text-black'}`}>Webhook</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search users...'
							className={`${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-white text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
						/>
						<Search className={`${isDarkMode ? 'absolute left-3 top-2.5 text-gray-400' : 'absolute left-3 top-2.5 text-black'}`} size={18} />
						<button
						className='text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
						onClick={() => setAddSection(true)}
						>
							Add +
						</button>
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>CallBack URL</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Headers</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Events</th>
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
										<div className='flex items-center'>
											<div className='flex-shrink-0 h-10 w-10'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.name.charAt(0)}
												</div>
											</div>
											<div className='ml-4'>
												<div className={`${isDarkMode ? 'text-sm font-medium text-gray-100': 'text-sm font-medium text-black'}`}>{user.name}</div>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.callback}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.headers}</div>
									</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
										<div className={`${isDarkMode ? 'text-sm text-gray-300': 'text-sm text-black'}`}>{user.events}</div>
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
			{
				editSection && (
					<FormWebHook isDarkMode={isDarkMode} />
				)
			}
			{addDelete && (
				<>
					<div className="fixed inset-0 bg-black opacity-50 z-10"></div>
					<motion.div 
						id="alert-additional-content-4" 
						initial= {{ opacity: 0, y: 20 }}    
						animate= {{ opacity: 1, y: 0 }}
						transition= {{ delay: 0.2 }}
						className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300
						 dark:border-yellow-800 mx-auto z-20 absolute top-0 left-0 right-0" role="alert">
						<div className="flex items-center">
							<svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
							</svg>
							<span className="sr-only">Info</span>
							<h3 className="text-lg font-medium">This is a warning alert</h3>
						</div>
						<div className="mt-2 mb-4 text-sm">
							Are you sure you want to delete user with ID: ?
						</div>
						<div className="flex">
							<button 
								type="submit"
								className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
								Are you sure to Delete?
							</button>
							<button 
							type="button" 
							onClick={() => setAddDelete(false)}
							className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800" data-dismiss-target="#alert-additional-content-4" aria-label="Close">
							Dismiss
							</button>
						</div>
					</motion.div>
				</>
			)
			}
			{addSection && (
					<FormWebHook isDarkMode={isDarkMode} />
			)}
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				
				/>
		</div>
	);
};

export default WebhookTable;
