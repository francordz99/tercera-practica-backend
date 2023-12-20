import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import User from '../dao/models/userModel.js';
import { checkRoleErrors } from '../services/errors/checkRoleErrors.js';
import { logger } from '../helpers/loggerConfig.js';

const checkAdminRole = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            logger.error('Acceso no autorizado. Token no proporcionado.');
            return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
        }

        const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
        const user = await User.findOne({ email: decodedToken.username });

        if (!user) {
            logger.error('Usuario no encontrado al verificar el rol de administrador.');
            checkRoleErrors.checkAdminRoleError();
        }

        if (user.role === 'admin') {
            req.isAdmin = true;
            logger.info('Usuario tiene el rol de administrador. Acceso permitido.');
            next();
        } else {
            logger.warn('Usuario no tiene el rol de administrador. Acceso no autorizado.');
            res.status(403).send("Acceso No Autorizado");
        }
    } catch (error) {
        logger.error(`Error al verificar el rol de administrador: ${error.message}`);
        checkRoleErrors.checkAdminRoleError();
    }
};

const checkUserRole = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            logger.error('Acceso no autorizado. Token no proporcionado.');
            return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
        }

        const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
        const user = await User.findOne({ email: decodedToken.username });

        if (!user) {
            logger.error('Usuario no encontrado al verificar el rol de usuario.');
            checkRoleErrors.checkUserRoleError();
        }

        if (user.role === 'user' || user.role === 'premium') {
            req.isUser = true;
            logger.info('Usuario tiene el rol de usuario. Acceso permitido.');
            next();
        } else {
            logger.warn('Usuario no tiene el rol de usuario. Acceso no autorizado.');
            res.status(403).send("Acceso No Autorizado");
        }
    } catch (error) {
        logger.error(`Error al verificar el rol de usuario: ${error.message}`);
        checkRoleErrors.checkUserRoleError();
    }
};

const checkPremiumRole = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            logger.error('Acceso no autorizado. Token no proporcionado.');
            return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
        }

        const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
        const user = await User.findOne({ email: decodedToken.username });

        if (!user) {
            logger.error('Usuario no encontrado al verificar el rol de usuario premium.');
            checkRoleErrors.checkUserRoleError();
        }

        if (user.role === 'premium') {
            req.isPremiumUser = true;
            logger.info('Usuario tiene el rol premium. Acceso permitido.');
            next();
        } else {
            logger.warn('Usuario no tiene el rol premium. Acceso no autorizado.');
            res.status(403).send("Acceso No Autorizado");
        }
    } catch (error) {
        logger.error(`Error al verificar el rol premium: ${error.message}`);
        checkRoleErrors.checkUserRoleError();
    }
};

export { checkAdminRole, checkUserRole, checkPremiumRole };
