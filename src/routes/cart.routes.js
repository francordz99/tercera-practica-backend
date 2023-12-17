import express from "express";
import { authenticateToken } from "../middlewares/tokenValidity.js";
import { checkUserRole } from "../middlewares/checkRole.js";
import cartController from '../controllers/cartController.js'

const cartRoutes = express.Router();

cartRoutes.put('/cart/addProductToCart/:productId', authenticateToken, checkUserRole, cartController.addProductToCart);
cartRoutes.put('/cart/editProductQuantity/:productId', authenticateToken, checkUserRole, cartController.editProductQuantity);
cartRoutes.get('/cart', authenticateToken, checkUserRole, cartController.getCartProducts);
cartRoutes.post('/cart/buyItems', authenticateToken, checkUserRole, cartController.buyItems);
cartRoutes.delete('/cart/deleteProductFromCart/:productId', authenticateToken, checkUserRole, cartController.deleteProductFromCart);

export default cartRoutes;
