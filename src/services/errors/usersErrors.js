import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const usersErrors = {
    getInformationError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al obtener la información del usuario',
            errorCode: EError.GET_USER_INFO_ERROR
        });
    },

    editInformationError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al editar la información del usuario',
            errorCode: EError.EDIT_USER_INFO_ERROR
        });
    },
};

export { usersErrors };
