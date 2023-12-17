import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import { tokenValidityErrors } from '../services/errors/tokenValidityErrors.js';
import { logger } from '../helpers/loggerConfig.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
        const token = tokenCookie && tokenCookie.split('=')[1];

        if (!token) {
            logger.warn('Token no encontrado. Redirigiendo a /login');
            return res.redirect('/login');
        }

        jwt.verify(token, config.jwt.jwtSecret, { ignoreExpiration: false }, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    logger.warn('Token expirado. Redirigiendo a /login');
                    return res.redirect('/login');
                } else {
                    logger.error(`Error al autenticar token: ${err.message}`);
                    tokenValidityErrors.authenticateTokenError();
                }
            }
            req.user = user;
            logger.info('Token autenticado correctamente');
            next();
        });
    } catch (error) {
        logger.error(`Error inesperado al autenticar token: ${error.message}`);
        console.error(error);
        tokenValidityErrors.authenticateTokenError();
    }
};

export const checkAuthenticated = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
        const token = tokenCookie && tokenCookie.split('=')[1];

        if (token) {
            jwt.verify(token, config.jwt.jwtSecret, { ignoreExpiration: false }, (err) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        logger.warn('Token expirado. Continuando la ejecución');
                        next();
                    } else {
                        logger.error(`Error al verificar token autenticado: ${err.message}`);
                        tokenValidityErrors.checkAuthenticatedError();
                    }
                } else {
                    logger.info('Usuario autenticado. Redirigiendo a /');
                    return res.redirect('/');
                }
            });
        } else {
            logger.info('Token no encontrado. Continuando la ejecución');
            next();
        }
    } catch (error) {
        logger.error(`Error inesperado al verificar token autenticado: ${error.message}`);
        console.error(error);
        tokenValidityErrors.checkAuthenticatedError();
    }
};
