import PropTypes from 'prop-types';
const FormUser = ({isDarkMode}) => {
  return (
  <>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
					<div className={`${isDarkMode ? "w-full max-w-md bg-[#1c2534] rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" :
                    "w-full max-w-md bg-white rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}`}>
						<h2 className={`${isDarkMode ? "text-[28px] font-bold text-white mb-6 text-center" 
						: "text-[28px] font-bold text-black mb-6 text-center"}`}>Add User</h2>
						<form className="flex flex-col">
							<div className="flex space-x-4 mb-4">
								<input placeholder="Name" className={`${isDarkMode  ? "bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
								: "bg-white text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"}`} type="text" 
									name="name"
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Type" className={`${isDarkMode  ? "bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
								: "bg-white text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"}`} type="text" 
									name="type"
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Scope" className={`${isDarkMode  ? "bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
								: "bg-white text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"}`} type="text" 
								    name="scope"
								/>
							</div>
							<button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200" type="submit">Submit</button>
						</form>
					</div>
            </>
  )
}
FormUser.propTypes = {
	handleOnChange: PropTypes.func.isRequired, // Validate handleOnChange
	handleSubmit: PropTypes.func.isRequired,
	rest: PropTypes.object,
  };
export default FormUser
