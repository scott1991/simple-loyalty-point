import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
      setIsConnected(false);
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  return [socket, isConnected];
};

export default useSocket;
