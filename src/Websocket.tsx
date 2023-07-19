import React, { useEffect, useRef } from 'react';

const WebSocketComponent = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket('ws://localhost:9001');

      ws.current.onopen = () => {
        console.log('connected');
      };

      ws.current.onmessage = (event) => {
        // Logs any message received from server
        console.log('Message from server: ', event.data);
      };

      ws.current.onerror = (error) => {
        console.log('WebSocket error: ', error);
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...');
        setTimeout(connect, 5000);  // Try to reconnect every 5 seconds
      };
    };

    connect();

    // Make sure to close the connection when the component unmounts
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Test</h1>
    </div>
  );
};


export default WebSocketComponent;
