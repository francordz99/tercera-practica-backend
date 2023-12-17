import express from "express";
import messagesController from '../controllers/messagesController.js'
import { checkUserRole } from "../middlewares/checkRole.js";

const messagesRoutes = express.Router();

messagesRoutes.get('/chat', checkUserRole, messagesController.getChat);
messagesRoutes.post('/chat/send', checkUserRole, messagesController.postMessage);

export default messagesRoutes;

