import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Camera, Play, AlignJustify, Eye, Pause } from "lucide-react";
import FormApp from "./FormApp";
import { useDispatch, useSelector } from "react-redux";
import { getStreamsByUserThunk } from "../../../redux/application/streamSlice";
import { startStreamThunk } from "../../../redux/application/videoStreamSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AppTable = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user)?._id;
  const { streams, isLoading } = useSelector((state) => state.stream);
  const [addSection, setAddSection] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const [loadingStreamKey, setLoadingStreamKey] = useState(null);
  const [streamStatus, setStreamStatus] = useState(() => {
    const savedStatus = localStorage.getItem("streamStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });
  const activeStreams = parseInt(localStorage.getItem("activeStreams") || "0", 10);
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
    const eventSource = new EventSource("http://localhost:5000/api/streams/sse-stream");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Stream status:", data);
      const updatedStatus = {
        ...streamStatus,
        [data.key]: data.isStreaming,
      };
      setStreamStatus(updatedStatus);
      localStorage.setItem("streamStatus", JSON.stringify(updatedStatus));
      if (data.isStreaming) {
        localStorage.setItem("activeStreams", activeStreams + 1);
      } else {
        localStorage.setItem("activeStreams", Math.max(0, activeStreams - 1));
      }
    };
    return () => {
      eventSource.close();
    };
  }, [streamStatus]);
  
  useEffect(() => {
    if (userId) {
      dispatch(getStreamsByUserThunk(userId));
    }
  }, [userId, dispatch, addSection]);

  // Handle start or pause stream
  const handleStreamAction = async (stream, event) => {
    event.preventDefault();
    setLoadingStreamKey(stream.key); 
    const formData = new FormData();
    formData.append("key", stream.key);
    formData.append("videoUrl", stream.videoUrl);
    const action = streamStatus[stream.key] ? "stop" : "start";
    formData.append("action", action);
    try {
      const result = await dispatch(startStreamThunk(formData)).unwrap();
      if (result.status === "success") {
        const updatedStatus = {
          ...streamStatus,
          [stream.key]: result.isStreaming,
        };
        setStreamStatus(updatedStatus);
        localStorage.setItem("streamStatus", JSON.stringify(updatedStatus));
        if (result.isStreaming) {
            localStorage.setItem("activeStreams", activeStreams + 1);
        } else {
            localStorage.setItem("activeStreams", Math.max(0, activeStreams - 1));
        }
      }
    } catch (error) {
      console.error("Error managing stream:", error);
    } finally {
      setLoadingStreamKey(null);
    }
  };
  
  const handleGoToWatchStream = (stream) => {
   window.open(`/watchStream/${stream.key}`, '_blank');
  }
  const handleCopyRTMPEndpoint = (key) => {
    const rtmpEndpoint = `rtmp://localhost:1935/${key}`;
    navigator.clipboard
      .writeText(rtmpEndpoint)
      .then(() => {
        toast.success(`Copied to clipboard: ${rtmpEndpoint}`);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy RTMP Endpoint");
      });
  };
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
               streamStatus[stream.key]
                  ? "bg-green-800 text-green-100"
                  : "bg-red-800 text-red-100"
              }`}
            >
            {streamStatus[stream.key] ? "Online" : "Offline"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-3 relative">
            <form onSubmit={(event) => handleStreamAction(stream, event)}>
              <button
                type="submit"
                className="text-indigo-400 hover:text-indigo-300"
              >
                {loadingStreamKey === stream.key ? ( 
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : streamStatus[stream.key] ? (
                  <Pause />
                ) : (
                  <Play />
                )}
              </button>
            </form>
            <button
              className={`${isDarkMode ? "" : "text-black"}`}
              onClick={() =>
                setActiveMenuKey(
                  activeMenuKey === stream.key ? null : stream.key
                )
              }
            >
              <AlignJustify />
            </button>
            <button className="text-green-400 hover:text-green-300"
            onClick={() => handleGoToWatchStream(stream)}
            >
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
                  <li 
                      className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleCopyRTMPEndpoint(stream.key)}
                  >
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

      {addSection && <FormApp isDarkMode={isDarkMode} />}
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

export default AppTable;
