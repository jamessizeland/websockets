import { useEffect, useRef, useState } from 'react';
import { notify } from '../services/notifications';

const WebSocketComponent = () => {
  const ws = useRef<WebSocket | null>(null);
  const [payload, setPayload] = useState<Random>({num: 0, message: ''})

  type Random = {
    num: number,
    message: string
  }

  type WebSocketMessage<P> = {
    topic: string,
    payload: P
  }

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket('ws://localhost:9001');

      ws.current.onopen = () => {
        notify('Connected to WebSocket server', 'success');
        console.log('connected');
      };

      ws.current.onmessage = (event: MessageEvent<string>) => {
        // Logs any message received from server
        const data = JSON.parse(event.data) as WebSocketMessage<unknown>;
        console.log('Message from server: ', event.data);
        if (data.topic === "random") {
          console.log('Message includes: ', data.payload);
          setPayload(data.payload as Random);
        }
      };

      ws.current.onerror = (error) => {
        notify('WebSocket error', 'error');
        console.log('WebSocket error: ', error);
      };

      ws.current.onclose = () => {
        notify('WebSocket connection closed. Attempting to reconnect...', 'reconnect');
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
      <p>{payload.message}</p>
      <p>{payload.num}</p>
    </div>
  );
};


export default WebSocketComponent;
