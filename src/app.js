
// Importacion De Modulos Y Packages

import express from "express";
import methodOverride from 'method-override';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import configureSocket from './config/socketConfig.js';
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import mainRoutes from "./routes/main.routes.js";
import usersRoutes from "./routes/users.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import productsRoutes from "./routes/products.routes.js";

import testingRoutes from "./routes/testing.routes.js"; // Mocking Y Otros Tests

import { __dirname, __filename, } from "./utils.js";
import { connectDB } from "./config/databaseConfig.js";
import { engine } from "express-handlebars";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./helpers/loggerConfig.js";

// Express & Socket

const app = express();
const port = 8080;
const { io, server } = configureSocket(app);

// Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static('public', { 'extensions': ['html', 'htm', 'js', 'css'] }));
app.use(bodyParser.json());
app.use(cookieParser());

// Handlebars

app.engine('.hbs', engine({
    extname: '.hbs', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Conexion DB

connectDB();

// Rutas

app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', cartRoutes);
app.use('/', mainRoutes);
app.use('/', messagesRoutes);
app.use('/', usersRoutes);
app.use('/', productsRoutes);

app.use('/', testingRoutes); // Mocking Y Otros Tests

// Manejo De Errores

app.use(errorHandler);

// Arranque Del Server

server.listen(port, () => {
    logger.info(`Servidor Express escuchando en el puerto ${port}`);
});

