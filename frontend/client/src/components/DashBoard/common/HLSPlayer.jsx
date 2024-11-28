import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ videoUrl, matchedStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls({
        startLevel: -1, 
        maxBufferLength: 30,
        maxBufferSize: 50 * 1000 * 1000, 
        maxMaxBufferLength: 10, 
      });
      if (Hls.isSupported()) {
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest loaded, starting playback...');
          video.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.fatal) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Network error");
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Media error");
                break;
              case Hls.ErrorTypes.OTHER_ERROR:
                console.error("Other error");
                break;
              default:
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.play();
      } else {
        console.error('HLS is not supported on this browser');
      }
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [videoUrl]);

  // Extracting matchedStream data
  const audioMeta = matchedStream?.metaData?.audio.infoAudio || {};
  const videoMeta = matchedStream?.metaData?.video || {};

  return (
    <>
      <div className='flex items-center rounded-lg justify-center gap-10 mt-10'>
        <video ref={videoRef} controls width="50%" style={{ borderRadius: "15px" }} />
        <div className='gird grid-cols-2 flex flex-col gap-10'>
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

export default HLSPlayer;
