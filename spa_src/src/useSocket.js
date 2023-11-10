import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';



const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  let socketUrl = url;
  if (process.env.PUBLIC_URL){
    const path = process.env.PUBLIC_URL.replace(/\/$/, '') + '/';
    socketUrl = path + url;
  }
  useEffect(() => {
    const newSocket = io(socketUrl);
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
