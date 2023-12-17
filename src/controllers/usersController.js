import User from "../dao/models/userModel.js";
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
};

export default usersController;
