import http from 'http';
import { sequelize } from './config/database.config';
import Server from './config/server.config';
import { ENV } from './config/env.config';
import { initSocketIO } from './config/socketio.config';

async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.info('Base de datos conectada');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    setTimeout(connectWithRetry, 5000);
  }
}

async function start() {
  try {
    await connectWithRetry();

    // Crear servidor HTTP que será usado por Express y Socket.IO
    const httpServer = http.createServer(Server);
    
    // Inicializar Socket.IO en el mismo servidor HTTP
    initSocketIO(httpServer);

    console.info('Base de datos conectada correctamente');

    // Escuchar en un solo puerto para Express y Socket.IO
    httpServer.listen(ENV.PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

start();




