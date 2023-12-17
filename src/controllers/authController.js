import User from '../dao/models/userModel.js';
import Cart from '../dao/models/cartModel.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import { isValidPassword, createHash } from '../utils.js';
import { authErrors } from '../services/errors/authErrors.js';
import { logger } from '../helpers/loggerConfig.js';

const authController = {
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

    getLogin: (req, res) => {
        res.render('login');
    },

    getRegister: (req, res) => {
        res.render('register');
    }
};

export default authController;
