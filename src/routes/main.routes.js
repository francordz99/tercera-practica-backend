import express from 'express';
import mainController from '../controllers/mainController.js';
import { authenticateToken, checkAuthenticated } from "../middlewares/tokenValidity.js";
import { checkUserRole } from '../middlewares/checkRole.js';

const mainRoutes = express.Router();

mainRoutes.get('/', authenticateToken, mainController.getIndex);
mainRoutes.get('/productinfo', authenticateToken, mainController.getProductInfo);
mainRoutes.get('/cart', authenticateToken, checkUserRole, mainController.getCart);
mainRoutes.get('/contact', authenticateToken, checkUserRole, mainController.getContact);
mainRoutes.get('/about', authenticateToken, mainController.getAbout);
mainRoutes.get('/support', authenticateToken, checkUserRole, mainController.getSupport);

export default mainRoutes;

