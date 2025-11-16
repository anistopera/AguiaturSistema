import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';


const userSocketMap = new Map<string, string>(); // userId, socketId

export let io: SocketIOServer;

export const initSocketIO = (httpServer: HTTPServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('test_env_recived', (data) => {
      console.log('Datos de prueba recibidos:', data);
    });

    socket.on('disconnect', (reason) => {
      console.log('Usuario desconectado:', reason);
      // limpiar el mapeo de usuarios
    });
  });
};
