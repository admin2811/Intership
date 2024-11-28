import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HLSPlayer from '../../../components/DashBoard/common/HLSPlayer';
import { getStreamInfoThunk } from '../../../redux/application/streamSlice';
const WatchStream = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { streamsInfo, isLoading, isError, message } = useSelector((state) => state.stream);
  useEffect(() => {
    dispatch(getStreamInfoThunk());
  },[dispatch]);
  useEffect(() => {
    console.log("Updated streamsInfo:", streamsInfo);
  }, [streamsInfo]);

  const pathParts = location.pathname.split("/");
  const key = pathParts[pathParts.length - 1];
  const videoUrl = `http://localhost/hls/${key}/index.m3u8`;
  const matchedStream = streamsInfo.find((stream) => stream.streamName === key);
  if (isLoading) return <p>Loading stream info...</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!streamsInfo.length) return <p>No stream information available.</p>;
  return (
    <div>
      <div>
        <HLSPlayer videoUrl={videoUrl}  matchedStream={matchedStream}/>
      </div>
    </div>
  );
};

export default WatchStream;
