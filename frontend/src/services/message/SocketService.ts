// SocketService.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

type Message = {
  id: string;
  content: string;
  timestamp: number;
  isMine: boolean;
};

export const initializeSocket = (serverUrl: string, token: string): Socket | null => {
  if (socket) {
    console.log('Socket is already initialized');
    return socket;
  }

  if (!serverUrl) {
    console.error('Server URL is not defined');
    return null;
  }

  socket = io(serverUrl, {
    query: { token },
  });

  socket.on('connect', () => {
    console.log(`Connected to server with socket ID: ${socket?.id}`);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};

export const SendMessage = (message: Message): void => {
  if (socket && socket.connected) {
    socket.emit('sendMessage', message);
  } else {
    console.log('Socket is not connected');
  }
};

export const listenToMessages = (callback: (message: Message) => void): void => {
  if (socket) {
    socket.on('receiveMessage', (message: Message) => {
      callback(message);
    });
  } else {
    console.log('Socket is not initialized');
  }
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
    socket = null;
  } else {
    console.log('Socket is already disconnected or not initialized');
  }
};
