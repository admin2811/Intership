import React from 'react';
import { ReactFlvPlayer } from 'react-flv-player';

const FLVPlayer = ({ videoUrl, matchedStream }) => {
  // Extracting matchedStream data
  const audioMeta = matchedStream?.metaData?.audio.infoAudio || {};
  const videoMeta = matchedStream?.metaData?.video || {};
  return (
    <>
      <div className='flex items-center rounded-lg justify-center gap-10 mt-10'>
        {/* Use ReactFlvPlayer to render the FLV stream */}
        <ReactFlvPlayer
          url={videoUrl}
          width="100%"
          height="auto"
          controls={true}
          style={{ borderRadius: '15px' }}
        />
        <div className='grid-cols-2 flex flex-col gap-10'>
          <div className='p-10 bg-black text-white rounded-lg'>
            <h1 className='text-2xl font-semibold'>Audio</h1>
            <p className='text-sm'>Codec: {audioMeta?.codec || 'N/A'}</p>
            <p className='text-sm'>Profile: {audioMeta?.profile || 'N/A'}</p>
            <p className='text-sm'>Sample Rate: {audioMeta?.sampleRate || 'N/A'}</p>
            <p className='text-sm'>BitRate: {matchedStream?.bwAudio || 'N/A'}</p>
          </div>
          <div className='p-10 bg-black text-white rounded-lg'>
            <h1 className='text-2xl font-semibold'>Video</h1>
            <p className='text-sm'>Codec: {videoMeta?.codec || 'N/A'}</p>
            <p className='text-sm'>Profile: {videoMeta?.profile || 'N/A'}</p>
            <p className='text-sm'>Resolution: {`${videoMeta?.width || 0} x ${videoMeta?.height || 0}`}</p>
            <p className='text-sm'>BitRate: {matchedStream?.bwVideo || 'N/A'}</p>
            <p className='text-sm'>FPS: {videoMeta?.frameRate || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className='flex mx-auto justify-evenly mt-10'>
        <div className='grid-rows-3 flex flex-row gap-10'>
          <div className='p-10 bg-black text-white rounded-lg'>
            <h1 className='text-2xl font-semibold'>Viewer</h1>
            <p className='text-sm text-center'>{matchedStream?.nclients || 'N/A'}</p>
          </div>
          <div className='p-10 bg-black text-white rounded-lg'>
            <h1 className='text-2xl font-semibold'>In bits/s</h1>
            <p className='text-sm'>{matchedStream?.bwIn || 'N/A'}</p>
          </div>
          <div className='p-10 bg-black text-white rounded-lg'>
            <h1 className='text-2xl font-semibold'>Out bits/s</h1>
            <p className='text-sm'>{matchedStream?.bwOut || 'N/A'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FLVPlayer;
