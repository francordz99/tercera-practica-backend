import winston from "winston";
import { __dirname } from "../utils.js";
import { config } from "../config/dotenvConfig.js";
import path from 'path';

const levels = {
    debug: 5,
    http: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
};

const colors = {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    fatal: 'magenta'
};

winston.addColors(colors);

const transports = [];

if (config.nodemode.env === 'development') {
    transports.push(
        new winston.transports.Console({ level: 'debug', format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),
    );
}

if (config.nodemode.env === 'production') {
    transports.push(
        new winston.transports.File({ filename: path.join(__dirname, "/logs/errors.log"), level: 'info' })
    );
}


const logger = winston.createLogger({
    levels: levels,
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: transports
});

export { logger };
