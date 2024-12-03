import { useEffect, useState } from "react";

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
};
