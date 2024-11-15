import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { createStreamThunk } from '../../../redux/application/streamSlice';

const FormApp = ({ isDarkMode, rest }) => {
  const videoRef = useRef(null);  // Tham chiếu đến thẻ video
  const [videoSrc, setVideoSrc] = useState('');
  const dispatch = useDispatch()  // Người dùng chọn nguồn video từ máy tính
  const [selectFile, setSelectFile] = useState(null);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
      setSelectFile(file);
    }
  };

  // Bắt đầu quay màn hình
  const startDisplayCapture = async (event) => {
    event.preventDefault();
    try {
      // Yêu cầu quyền truy cập vào màn hình
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false,  // Nếu bạn không cần âm thanh
      });
      // Cập nhật nguồn video cho video-js
      videoRef.current.srcObject = stream;
      videoRef.current.play(); // Phát video từ màn hình ghi lại
    } catch (error) {
      console.error('Error capturing display:', error);
    }
  };
  const hanldeFormSubmit = async (event) => {
    event.preventDefault();
    if(!selectFile) {
      alert('Please select a video file or start display capture');
      return;
    }
    const formData = new FormData();
    formData.append('key', event.target.streamKey.value);
    formData.append('video', selectFile);
    try {
      await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('Upload success');
    }catch(error){
      console.error('Error uploading video:', error);
    }
  }
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    }
  }, [videoSrc]);
  /*const handleFormSubmit = (event) => {
    event.preventDefault();
    const streamData = {
      name: event.target.streamName.value,
      key: event.target.streamKey.value,
      videoSrc,
    };
    dispatch(createStreamThunk(streamData))
  }*/
 /*const handleFormSubmit = async (event) => {
  event.preventDefault();
  const streamData = {
    streamKey: event.target.streamKey.value,
    videoSrc,
  };
  try{
    await fetch('http://localhost:5000/api/start-streams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(streamData),
    });
  }catch(error){
    console.error('Error starting stream:', error);
  }
}*/
  return (
    <div>
      <div className='fixed inset-0 bg-black opacity-50 z-10'></div>
      <div className={`${isDarkMode ? "w-full max-w-3xl bg-[#1c2534] rounded-xl shadow-md py-10 px-10 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "w-full max-w-3xl bg-white rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}`}>
        <h2 className={`${isDarkMode ? "text-[28px] font-bold text-white mb-6 text-center" : "text-[28px] font-bold text-black mb-6 text-center"}`}>
          Add Live Stream
        </h2>
        <form className='flex flex-col' onSubmit={hanldeFormSubmit}>
          <div className='flex space-x-4 mb-4'>
            <input  
              placeholder='Stream Name'
              className={`${isDarkMode ? 'bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150' : 'bg-white text-black border-0 rounded-md p-2 w-full focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150'}`}
              type='text'
            />
            <input
              placeholder='Stream Key'
              name='streamKey'
              className={`${isDarkMode ? 'bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150' : 'bg-white text-black border-0 rounded-md p-2 w-full focus:bg-gray-100 focus:outline-none transition ease-in-out duration-150'}`}
              type='text'
            />
          </div>
          <div className='flex space-x-4 mb-4'>
            <label className='relative'>
              <input
                type='file'
                accept='video/*'
                onChange={handleFileSelect}
                className='absolute inset-0 opacity-0 cursor-pointer'
              />
              <button className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200' : 'bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in duration-200'}`}>
                Media Source
              </button>
            </label>
            <button
               onClick={(event) => startDisplayCapture(event)}
              className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200' : 'bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in duration-200'}`}
            >
              Display Capture
            </button>
          </div>
          <div className='mb-4'>
            <video
              ref={videoRef}
              className="video-js vjs-default-skin w-full h-auto"
              style={{ borderRadius: '15px' }}
              controls
              width="600"
              height="300"
            ></video>
          </div>
          <button
            className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200' : 'bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in duration-200'}`}
            type='submit'
          >
            Create Live Stream
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormApp;
