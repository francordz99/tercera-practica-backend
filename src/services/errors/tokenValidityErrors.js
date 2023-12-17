import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const tokenValidityErrors = {
    authenticateTokenError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Acceso no autorizado. Token inválido.',
            errorCode: EError.UNAUTHORIZED_ACCESS_ERROR
        });
    },

    checkAuthenticatedError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Acceso no autorizado. Token inválido.',
            errorCode: EError.UNAUTHORIZED_ACCESS_ERROR
        });
    },
};

export { tokenValidityErrors };
