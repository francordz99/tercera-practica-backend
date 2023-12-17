import express from "express";
import usersController from '../controllers/usersController.js'
import { authenticateToken } from "../middlewares/tokenValidity.js";

const usersRoutes = express.Router();

usersRoutes.get('/profile', authenticateToken, usersController.getInformation); // Esta Es Mi Ruta /Current
usersRoutes.put('/profile/editInformation', authenticateToken, usersController.editInformation);

export default usersRoutes;

