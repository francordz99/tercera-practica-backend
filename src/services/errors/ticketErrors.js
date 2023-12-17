import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const ticketErrors = {
    ticketCreationError: (error) => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al crear el ticket',
            errorCode: EError.TICKET_CREATION_ERROR,
            cause: error
        });
    },
};

export { ticketErrors };
