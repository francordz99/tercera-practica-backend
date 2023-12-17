import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenValidity.js";
import { checkUserRole } from "../middlewares/checkRole.js";
import testingController from "../controllers/testingController.js";

const testingRoutes = Router();

testingRoutes.get('/mockingProducts', authenticateToken, checkUserRole, testingController.getMockedProducts);
testingRoutes.get('/logsTesting', authenticateToken, checkUserRole, testingController.logsTesting);

export default testingRoutes;