import {useEffect } from "react";

const useLongPolling = (streamKey, updateStreamStatus) => {
  useEffect(() => {
    let isCancelled = false;
    const poll = async () => {
      try {
        const response = await fetch(`/api/streams/status?key=${streamKey}`);
        const data = await response.json();

        if (!isCancelled) {
          updateStreamStatus(streamKey, data.isStreaming);
          if (data.isStreaming) {
            setTimeout(poll, 5000);
          }
        }
      } catch (error) {
        console.error(`Error polling status for stream ${streamKey}:`, error);
        if (!isCancelled) {
          setTimeout(poll, 5000); 
        }
      }
    };

    poll();

    return () => {
      isCancelled = true; 
    };
  }, [streamKey, updateStreamStatus]);
};

export default useLongPolling;
