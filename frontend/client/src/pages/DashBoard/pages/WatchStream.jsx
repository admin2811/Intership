import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FLVPlayer from '../../../components/DashBoard/common/FLVPlayer';
import { getStreamInfoThunk } from '../../../redux/application/streamSlice';
const WatchStream = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { streamsInfo, isLoading, isError, message } = useSelector((state) => state.stream);
  const [matchedStream, setMatchedStream] = useState(null);
  const pathParts = location.pathname.split("/");
  const key = pathParts[pathParts.length - 1];
  const videoUrl = `http://localhost:80/live?port=1935&app=live&stream=${key}`;
  useEffect(() => {
    dispatch(getStreamInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (streamsInfo && streamsInfo.length > 0) {
      const newMatchedStream = streamsInfo.find((stream) => stream.streamName === key);
      setMatchedStream(newMatchedStream);  // Cập nhật matchedStream
    }
  }, [streamsInfo, key]);
  if (isLoading) return <p>Loading stream info...</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!streamsInfo.length) return <p>No stream information available.</p>;

  return (
    <div>
      <div>
        <FLVPlayer videoUrl={videoUrl} matchedStream={matchedStream} />
      </div>
    </div>
  );
};

export default WatchStream;
