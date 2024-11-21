import React, { useState, useRef, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { createStreamThunk , reset } from '../../../redux/application/streamSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FormApp = ({ isDarkMode, rest }) => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [selectedFile, setSelectFile] = useState(null);
  const [streamKey, setStreamKey] = useState('');
  const [streamName, setStreamName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user)._id;
  const {isSuccess,  isError, message} = useSelector(state => state.stream);
  const handleFileSelect = (event) => { 
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
      setSelectFile(file);
    }
  };
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    }
  }, [videoSrc]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Bắt đầu loading

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('key', streamKey);
    formData.append('userId', userId);
    formData.append('name', streamName);

    await dispatch(createStreamThunk(formData));
    setLoading(false); // Dừng loading sau khi gửi dữ liệu xong
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Stream created successfully!');
      setStreamName('');
      setStreamKey('');
      setSelectFile(null);
      setVideoSrc('');
    }
    if (isError) {
      toast.error(`Error: ${message || 'Failed to create stream'}`);
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
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
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
          <div className="flex space-x-0 md:space-x-4 mb-4 flex-col md:flex-row items-center">
            <label className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button
                className={`${
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200"
                    : "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in duration-200"
                }`}
              >
                Media Source
              </button>
            </label>
          </div>
          <div className="mb-4">
            <video
              ref={videoRef}
              className="video-js vjs-default-skin w-full h-auto"
              style={{ borderRadius: "15px" }}
              controls
              width="600"
              height="300"
            ></video>
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

export default FormApp;
