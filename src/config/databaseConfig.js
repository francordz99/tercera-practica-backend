import mongoose from 'mongoose';
import { config } from './dotenvConfig.js';
import { logger } from '../helpers/loggerConfig.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        logger.info("Base de datos conectada");
    } catch (error) {
        logger.error(`Error Al Conectar A MongoDB ${error.message}`);
    }
};

export { connectDB };
