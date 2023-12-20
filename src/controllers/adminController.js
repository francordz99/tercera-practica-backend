import Product from "../dao/models/productModel.js";
import User from "../dao/models/userModel.js";
import jwt from 'jsonwebtoken';
import { adminErrors } from "../services/errors/adminErrors.js";
import { config } from "../config/dotenvConfig.js";
import { logger } from "../helpers/loggerConfig.js";

const adminController = {
    getAdmin: async (req, res) => {
        logger.info('Renderizando la página de administrador');
        res.render('admin');
    },
    getProduct: async (req, res) => {
        try {
            const { code } = req.query;
            const existingProduct = await Product.findOne({ code });

            if (!existingProduct) {
                adminErrors.getProductNotFoundError();
            }

            logger.info('Renderizando la página de administrador con información del producto');
            res.render('admin', { product: existingProduct });
        } catch (error) {
            logger.error(`Error en getProduct: ${error}`);
            adminErrors.getProductError(error);
        }
    },
    postProduct: async (req, res) => {
        try {
            const { title, description, price, thumbnail, code, stock, category } = req.body;
            const newProduct = new Product({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category,
            });
            await newProduct.save();
            const successMessage = 'Producto agregado a la base de datos con éxito.';
            logger.info(successMessage);
            res.render('admin', { successMessage });
        } catch (error) {
            logger.error(`Error en postProduct: ${error}`);
            adminErrors.addProductError(error);
        }
    },
    putProduct: async (req, res) => {
        try {
            const { code, title, description, price, thumbnail, stock, category } = req.body;
            const existingProduct = await Product.findOne({ code });

            if (!existingProduct) {
                logger.error('Producto no encontrado');
                return res.status(404).send('Producto no encontrado.');
            }

            existingProduct.title = title || existingProduct.title;
            existingProduct.description = description || existingProduct.description;
            existingProduct.price = price || existingProduct.price;
            existingProduct.thumbnail = thumbnail || existingProduct.thumbnail;
            existingProduct.stock = stock || existingProduct.stock;
            existingProduct.category = category || existingProduct.category;

            await existingProduct.save();

            const successMessage = 'Producto editado con éxito.';
            logger.info(successMessage);
            res.render('admin', { successMessage });

        } catch (error) {
            logger.error(`Error en putProduct: ${error}`);
            adminErrors.editProductError(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { code } = req.body;
            const existingProduct = await Product.findOne({ code });

            if (!existingProduct) {
                logger.error('Producto no encontrado');
                return res.status(404).send('Producto no encontrado.');
            }
            await Product.deleteOne({ code });

            const successMessage = 'Producto eliminado con éxito.';
            logger.info(successMessage);
            res.render('admin', { successMessage });
        } catch (error) {
            logger.error(`Error en deleteProduct: ${error}`);
            adminErrors.deleteProductError(error);
        }
    },
    editPermissions: async (req, res) => {
        try {
            const { email, permissionLevel } = req.body;
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const adminEmail = decodedToken.username;
            if (email === adminEmail) {
                logger.warn('Intento de cambiar el rol del propio administrador');
                return res.status(403).send('No puedes cambiar tu propio rol.');
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                logger.error('Usuario no encontrado');
                return res.status(404).send('Usuario no encontrado.');
            }
            const validRoles = ['user', 'premium', 'admin'];
            if (!validRoles.includes(permissionLevel)) {
                logger.error('Rol de permisos no válido');
                return res.status(400).send('Rol de permisos no válido.');
            }
            user.role = permissionLevel;
            await user.save();
            const successMessage = 'Permisos actualizados con éxito.';
            logger.info(successMessage);
            res.render('admin', { successMessage });
        } catch (error) {
            logger.error(`Error en editPermissions: ${error}`);
            adminErrors.editPermissionsError(error);
        }
    }


};

export default adminController;
