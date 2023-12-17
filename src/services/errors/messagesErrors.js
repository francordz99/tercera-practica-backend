import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const messagesErrors = {
    getChatMessagesError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al obtener los mensajes del chat',
            errorCode: EError.GET_CHAT_MESSAGES_ERROR
        });
    },

    postMessageError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al enviar el mensaje',
            errorCode: EError.POST_MESSAGE_ERROR
        });
    },
};

export { messagesErrors };
