import express from "express";
import authController from '../controllers/authController.js'
import { checkAuthenticated } from "../middlewares/tokenValidity.js";

const authRoutes = express.Router();

// Acceder A Las Vistas

authRoutes.get('/login', checkAuthenticated, authController.getLogin);
authRoutes.get('/register', checkAuthenticated, authController.getRegister);

// Logearse Y Registrarse

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

// Cerrar Sesion

authRoutes.get('/logout', authController.logout);

export default authRoutes;

