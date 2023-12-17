import express from "express";
import productsController from '../controllers/productsController.js'
import { authenticateToken } from "../middlewares/tokenValidity.js";

const productsRoutes = express.Router();

productsRoutes.get('/products', authenticateToken, productsController.getProducts);

export default productsRoutes;

