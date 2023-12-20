import User from '../dao/models/userModel.js';
import Cart from '../dao/models/cartModel.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import { isValidPassword, createHash } from '../utils.js';
import { authErrors } from '../services/errors/authErrors.js';
import { logger } from '../helpers/loggerConfig.js';
import MailingService from '../services/mailing.service.js';

const authController = {

    // Rutas De Funciones

    register: async (req, res) => {
        try {
            const { nombre, apellido, sexo, edad, email, celular, password } = req.body;
            const hashedPassword = await createHash(password);
            const user = new User({
                nombre,
                apellido,
                sexo,
                edad,
                email,
                celular,
                password: hashedPassword,
            });
            await user.save();
            const newCart = new Cart({
                email: user.email,
                products: [],
            });
            await newCart.save();
            user.cart = newCart._id;
            await user.save();
            logger.info(`Usuario registrado: ${user.email}`);
            res.redirect('/login');
        } catch (error) {
            logger.error(`Error en registro: ${error.message}`);
            authErrors.registrationError(error.message);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && (await isValidPassword(user, password))) {
                const token = jwt.sign({ username: user.email, userId: user._id }, config.jwt.jwtSecret, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: false });
                logger.info(`Usuario inició sesión: ${user.email}`);
                res.redirect(`/?token=${token}`);
            } else {
                logger.error('Error en inicio de sesión: Credenciales no válidas');
                authErrors.loginError();
            }
        } catch (error) {
            logger.error(`Error en inicio de sesión: ${error.message}`);
            authErrors.loginServerError(error.message);
        }
    },

    logout: (req, res) => {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        logger.info('Usuario cerró sesión');
        res.redirect('/login');
    },

    resetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                logger.warn(`Intento de restablecimiento de contraseña fallido para el usuario inexistente: ${email}`);
                return res.render('resetpassword', { error: 'Usuario no encontrado' });
            }

            const token = await MailingService.generateEmailToken(email, '1h');
            await MailingService.sendRecoveryEmail(req, email, token);

            user.token = token;
            await user.save();

            logger.info(`Correo de restablecimiento de contraseña enviado a: ${email}`);
            return res.render('resetpassword', { success: true });
        } catch (error) {
            logger.error('Error en resetPassword:', error);
            return res.render('resetpassword', { error: 'Error inesperado, intente nuevamente.' });
        }
    },

    postStepTwo: async (req, res) => {
        try {
            const { newPassword, confirmNewPassword, token } = req.body;
            const user = await User.findOne({ token });

            if (!user) {
                logger.warn(`Intento de cambio de contraseña fallido para un token no válido`);
                return res.render('resetPassword', { error: 'Token no válido' });
            }

            if (newPassword !== confirmNewPassword) {
                logger.warn(`Intento de cambio de contraseña fallido para ${user.email}: Las contraseñas no coinciden`);
                return res.render('resetPasswordStepTwo', { error: 'Las contraseñas no coinciden' });
            }

            const isCurrentPassword = await isValidPassword(user, newPassword);

            if (isCurrentPassword) {
                logger.warn(`Intento de cambio de contraseña fallido para ${user.email}: La nueva contraseña debe ser diferente a la actual`);
                return res.render('resetPasswordStepTwo', { error: 'La nueva contraseña debe ser diferente a la actual' });
            }

            const hashedPassword = await createHash(newPassword);
            user.password = hashedPassword;
            user.token = undefined;
            user.passwordResetComplete = true;
            await user.save();

            logger.info(`Contraseña cambiada con éxito para: ${user.email}`);
            return res.render('login', { success: true });
        } catch (error) {
            logger.error('Error en postStepTwo:', error);
            return res.render('resetpassword', { error: 'Error inesperado, intente nuevamente.' });
        }
    },

    // Rutas De Vistas

    getLogin: (req, res) => {
        res.render('login');
    },

    getRegister: (req, res) => {
        res.render('register');
    },
    getResetPassword: (req, res) => {
        res.render('resetpassword');
    },
    getStepTwo: (req, res) => {
        res.render('resetpasswordtwo');
    },
};

export default authController;
