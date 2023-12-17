import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const databaseErrors = {
    databaseConnectError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'No se pudo conectar a la base de datos',
            errorCode: EError.MONGOOSE_CONNECT_ERROR
        });
    },
};

export { databaseErrors };
