import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const testingErrors = {
    getMockedProductsError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al obtener productos simulados',
            errorCode: EError.GET_MOCKED_PRODUCTS_ERROR
        });
    },
};

export { testingErrors };
