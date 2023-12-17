import Message from "../dao/models/messageModel.js";
import configureSocket from '../config/socketConfig.js';
import { messagesErrors } from '../services/errors/messagesErrors.js';
import { logger } from '../helpers/loggerConfig.js';

const { io } = configureSocket();

const messagesController = {
    getChat: async (req, res) => {
        try {
            const messages = await Message.find().sort({ timestamp: 1 });
            logger.info('Obteniendo mensajes del chat');
            res.render('chat', { messages });
        } catch (error) {
            logger.error(`Error al obtener mensajes del chat: ${error.message}`);
            messagesErrors.getChatMessagesError();
        }
    },
    postMessage: async (req, res) => {
        try {
            const { nick, contenido } = req.body;
            const newMessage = new Message({
                sender: nick,
                content: contenido,
            });
            await newMessage.save();
            io.emit('newMessage', newMessage);
            const messages = await Message.find().sort({ timestamp: 1 });
            logger.info(`Nuevo mensaje publicado por ${nick}`);
            res.render('chat', { messages });
        } catch (error) {
            logger.error(`Error al publicar un mensaje: ${error.message}`);
            messagesErrors.postMessageError();
        }
    },
};

export default messagesController;
