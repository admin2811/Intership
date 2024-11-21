import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Camera, Play, AlignJustify, Eye } from "lucide-react";
import FormApp from "./FormApp";
import { useDispatch, useSelector } from "react-redux";
import { getStreamsByUserThunk } from "../../../redux/application/streamSlice";

const AppTable = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user)?._id; // Check nếu `user` không tồn tại
  const { streams, isLoading } = useSelector((state) => state.stream);

  const [addSection, setAddSection] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  // Fetch streams khi `userId` hoặc `addSection` thay đổi
  // Đóng menu `addSection` khi nhấn Escape
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
  }, []);
  useEffect(() => {
    if (userId || addSection){
      dispatch(getStreamsByUserThunk(userId));
    }
  }, [userId, dispatch, addSection]);
  // Hiển thị loading hoặc danh sách streams
  const handleStream = (stream) => {
    console.log('Stream key: ', stream.key)
    console.log('Video Url:' , stream.videoUrl)
  }
  const renderStreamContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4 text-gray-400">
            Loading...
          </td>
        </tr>
      );
    }

    if (streams?.length > 0) {
      return streams.map((stream) => (
        <motion.tr
          key={stream._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                  <Camera />
                </div>
              </div>
              <div className="ml-4">
                <div
                  className={`${
                    isDarkMode
                      ? "text-sm font-medium text-gray-100"
                      : "text-sm font-medium text-black"
                  }`}
                >
                  {stream.name}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div
              className={`${
                isDarkMode ? "text-sm text-gray-300" : "text-sm text-black"
              }`}
            >
              {stream.key}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                stream.status === "online"
                  ? "bg-green-800 text-green-100"
                  : "bg-red-800 text-red-100"
              }`}
            >
              {stream.status || "offline"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-3 relative">
            <button 
              onClick={() => handleStream(stream)}
              className="text-indigo-400 hover:text-indigo-300">
              <Play />
            </button>
            <button
              className={`${isDarkMode ? "" : "text-black"}`}
              onClick={() =>
                setActiveMenuKey(activeMenuKey === stream.key ? null : stream.key)
              }
            >
              <AlignJustify />
            </button>
            <button className="text-green-400 hover:text-green-300">
              <Eye />
            </button>
          </td>
          {/* Menu Actions */}
          <AnimatePresence>
            {activeMenuKey === stream.key && (
              <motion.div
                className="absolute bg-white rounded-lg shadow w-60 z-50 flex-col"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ul className="py-2 text-sm text-gray-950 flex-col">
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                    Update Media BackUp
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                    Edit RTMP Endpoint
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                    Copy config RTMP
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                    Delete Broadcast
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.tr>
      ));
    }

    return (
      <tr>
        <td colSpan="4" className="text-center py-4 text-gray-400">
          No streams found
        </td>
      </tr>
    );
  };

  return (
    <div className="relative">
      {/* Header */}
      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
            : "bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`${
              isDarkMode
                ? "text-xl font-semibold text-gray-100"
                : "text-xl font-semibold text-black"
            }`}
          >
            Live Stream
          </h2>
          <div className="relative flex gap-5">
            <input
              type="text"
              placeholder="Search users..."
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-white text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            />
            <Search
              className={`${
                isDarkMode
                  ? "absolute left-3 top-2.5 text-gray-400"
                  : "absolute left-3 top-2.5 text-black"
              }`}
              size={18}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-5"
              onClick={() => setAddSection(true)}
            >
              Add +
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stream Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stream Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {renderStreamContent()}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Section Form */}
      {addSection && <FormApp isDarkMode={isDarkMode} />}
    </div>
  );
};

export default AppTable;
