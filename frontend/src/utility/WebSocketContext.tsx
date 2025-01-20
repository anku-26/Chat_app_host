import { createContext, useState, useEffect, useContext } from "react";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_BACKEND_URL);
    console.log("WebSocket connecting...");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setWs(socket); // Set WebSocket once connected
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null); // Reset on close
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setWs(null); // Handle error state
    };

    return () => {
      socket.close(); // Clean up on unmount
    };
  }, []);

  if (!ws) {
    console.log("WebSocket is not ready yet.");
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

// Custom hook to use WebSocket
export const useWebSocket = () => {
  return useContext(WebSocketContext); // Returns WebSocket instance or null
};
