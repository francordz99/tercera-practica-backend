
// Funcionalidad De Creacion De Errores

import { logger } from "../helpers/loggerConfig.js";

export class CustomError {
    static createError({ name = "Error", cause, message, errorCode = 1 }) {
        const error = new Error(message, { cause });
        error.name = name;
        error.code = errorCode;
        logger.error("CustomError", error);
        throw error;
    }
}
