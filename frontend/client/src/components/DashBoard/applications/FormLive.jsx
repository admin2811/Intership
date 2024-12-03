import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createLiveStreamThunk, reset } from '../../../redux/application/streamSlice';
const FormLive = ({isDarkMode}) => {
  const [streamKey, setStreamKey] = useState('');
  const [streamName, setStreamName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user)._id;
  const {isSuccess,  isError, message} = useSelector(state => state.stream);
  const handleSubmitLive = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('key', streamKey);
    formData.append('userId', userId);
    formData.append('name', streamName);
    formData.append('video', '');
    formData.append('typeLive', 'live');
    await dispatch(createLiveStreamThunk(formData))
    setLoading(false);
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('Successfully');
      setStreamName('');
      setStreamKey('');
      setVideoSrc('');
    }
    if (isError) {
        console.log('Error');
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);
  return (
    <div>
    <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    <div
      className={`${
        isDarkMode
          ? "w-full max-w-3xl md:max-w-xl bg-[#1c2534] rounded-xl shadow-md py-10 px-6 sm:px-8 md:px-10 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "w-full max-w-3xl md:max-w-xl bg-white rounded-xl shadow-md py-8 px-6 sm:px-8 md:px-10 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }`}
    >
      <h2
        className={`${
          isDarkMode
            ? "text-[24px] md:text-[28px] font-bold text-white mb-6 text-center"
            : "text-[24px] md:text-[28px] font-bold text-black mb-6 text-center"
        }`}
      >
        Add Live Stream
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmitLive}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <input
            placeholder="Stream Name"
            name="streamName"
            onChange={(event) => setStreamName(event.target.value)}
            className={`${
              isDarkMode
                ? "bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                : "bg-white text-black border-0 rounded-md p-2 w-full focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150"
            }`}
            type="text"
          />
          <input
            placeholder="Stream Key"
            name="streamKey"
            onChange={(event) => setStreamKey(event.target.value)}
            className={`${
              isDarkMode
                ? "bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                : "bg-white text-black border-0 rounded-md p-2 w-full focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150"
            }`}
            type="text"
          />
        </div>
        <button
          className={`${
            isDarkMode
              ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200"
              : "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in duration-200"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading ... " : "Create Live Stream"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default FormLive
