import User from "../dao/models/userModel.js";
import Product from "../dao/models/productModel.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/dotenvConfig.js";
import { userInfoDto } from "../dto/userInfo.js";
import { usersErrors } from '../services/errors/usersErrors.js';
import { logger } from "../helpers/loggerConfig.js";

const usersController = {
    getInformation: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                logger.error('Usuario no encontrado al obtener la información del perfil');
                usersErrors.getInformationError();
            }
            const userDto = new userInfoDto(user);
            logger.info('Obteniendo información del perfil');
            res.render('profile', { userEmail: userEmail, user: userDto });
        } catch (error) {
            logger.error(`Error al obtener la información del perfil: ${error.message}`);
            usersErrors.getInformationError();
        }
    },

    editInformation: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const { nombre, apellido, edad, celular } = req.body;
            const userInfo = {
                nombre,
                apellido,
                edad,
                celular,
                email: userEmail,
            };
            const userDto = new userInfoDto(userInfo);
            const updatedUser = await User.findOneAndUpdate(
                { email: userEmail },
                userDto,
                { new: true }
            );
            if (!updatedUser) {
                logger.error('Error al editar la información del perfil');
                usersErrors.editInformationError();
            }
            logger.info('Información del perfil actualizada con éxito');
            res.render('profile', { successMessage: 'Datos Actualizados Con Éxito', userEmail: userEmail });
        } catch (error) {
            logger.error(`Error al editar la información del perfil: ${error.message}`);
            usersErrors.editInformationError();
        }
    },

    getPremiumPanel: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const userProducts = await Product.find({ owner: userEmail });
            res.render('premiumpanel', { userProducts });
            logger.info('Vista premiumpanel renderizada con éxito.');
        } catch (error) {
            logger.error(`Error al renderizar la vista premiumpanel: ${error.message}`);
            res.status(500).send('Error interno del servidor');
        }
    },

    postPremiumProduct: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const { title, description, price, thumbnail, code, stock, category } = req.body;
            const existingProduct = await Product.findOne({ code });
            if (existingProduct) {
                return res.render('premiumpanel', { errorMessage: 'Ya existe un producto con el mismo código.' });
            }
            const newProduct = new Product({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category,
                owner: userEmail
            });
            await newProduct.save();
            res.render('premiumpanel', { successMessage: 'Producto Agregado Con Éxito' });
        } catch (error) {
            logger.error('Error al agregar el producto (PREMIUM)');
            res.render('premiumpanel', { errorMessage: 'Error al agregar el producto. Intente nuevamente.' });
        }
    },

    deletePremiumProduct: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const productCode = req.params.code;
            const productToDelete = await Product.findOne({ code: productCode });

            if (productToDelete && productToDelete.owner === userEmail) {
                await Product.deleteOne({ code: productCode });
                logger.info(`Producto con código ${productCode} eliminado por el usuario premium ${userEmail}`);
                res.render('premiumpanel', { successMessage: 'Producto Eliminado Con Exito' });
            } else {
                logger.warn(`Intento de eliminar un producto no autorizado por el usuario premium ${userEmail}`);
                res.status(403).send('Acceso no autorizado');
            }
        } catch (error) {
            logger.error(`Error al eliminar el producto premium: ${error.message}`);
            res.status(500).send('Error interno del servidor');
        }
    },
};

export default usersController;
