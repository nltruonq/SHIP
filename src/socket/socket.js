import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('https://api-ship.onrender.com');
export const SocketContext = React.createContext();
