import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ url, children }) {
  const socketRef = React.useRef();

  if (!socketRef.current) {
    socketRef.current = io(url);
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
