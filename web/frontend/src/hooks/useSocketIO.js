import { useEffect } from 'react';
import io from 'socket.io-client';

// Detectar URL del servidor automáticamente
const getSocketURL = () => {
  // En desarrollo: localhost:3001
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  // En producción: mismo host que el frontend
  return `http://${window.location.hostname}:3001`;
};

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || getSocketURL();

/**
 * Hook para conectar a Socket.io y escuchar eventos de actualizaciones de espacios
 * @param {Function} onSpaceUpdated - Callback cuando se recibe evento 'spaceUpdated'
 * @example
 * const handleUpdate = (data) => {
 *   console.log('Espacio actualizado:', data);
 * };
 * useSocketIO(handleUpdate);
 */
export const useSocketIO = (onSpaceUpdated) => {
  useEffect(() => {
    console.log('onectando a Socket.io en:', SOCKET_URL);
    
    // Conectar a Socket.io con opciones de reconexión
    const socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    // Evento cuando se conecta
    socket.on('connect', () => {
    });

    // Evento cuando se actualiza un espacio desde el hardware
    socket.on('spaceUpdated', (data) => {
      if (onSpaceUpdated) {
        onSpaceUpdated(data);
      }
    });

    // Evento de error
    socket.on('connect_error', (error) => {
    });

    // Evento de desconexión
    socket.on('disconnect', (reason) => {
    });

    // Limpiar la conexión cuando se desmonta el componente
    return () => {
      socket.disconnect();
    };
  }, [onSpaceUpdated]);
};

export default useSocketIO;
