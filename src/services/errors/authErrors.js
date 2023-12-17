import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const authErrors = {
    registrationError: (errorMessage) => {
        throw CustomError.createError({
            name: 'Error',
            message: `Error al registrar: ${errorMessage}`,
            errorCode: EError.REGISTER_ERROR
        });
    },

    loginError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Correo o contraseña incorrectos',
            errorCode: EError.LOGIN_ERROR
        });
    },

    loginServerError: (errorMessage) => {
        throw CustomError.createError({
            name: 'Error',
            message: `Error al iniciar sesión: ${errorMessage}`,
            errorCode: EError.AUTHENTICATE_TOKEN_ERROR
        });
    },
};

export { authErrors };
