import http from 'http';
import { Server } from 'socket.io';
import { logger } from '../helpers/loggerConfig.js';

const configureSocket = (app) => {
    const server = http.createServer(app);
    const io = new Server(server);

    io.on('connection', (socket) => {
        logger.info('Usuario conectado');

        socket.on('newMessage', (message) => {
            io.emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            logger.info('Usuario desconectado');
        });
    });

    return { io, server };
};

export default configureSocket;
