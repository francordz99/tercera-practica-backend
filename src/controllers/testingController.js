import { productsGenerator } from '../helpers/mockingConfig.js';
import { testingErrors } from '../services/errors/testingErrors.js';
import { logger } from "../helpers/loggerConfig.js";

const testingController = {
    getMockedProducts: async (req, res) => {
        try {
            const mockedProducts = Array.from({ length: 100 }, productsGenerator);
            logger.info('Obteniendo productos mock');
            res.render('testing', { mockedProducts });
        } catch (error) {
            logger.error(`Error al obtener productos mock: ${error.message}`);
            testingErrors.getMockedProductsError();
        }
    },
    logsTesting: async (req, res) => {
        try {
            logger.debug('Mensaje de prueba - Debug');
            logger.http('Mensaje de prueba - HTTP');
            logger.info('Mensaje de prueba - Info');
            logger.warning('Mensaje de prueba - Warning');
            logger.error('Mensaje de prueba - Error');
            logger.fatal('Mensaje de prueba - Fatal');
            logger.info('Pruebas de logs realizadas con éxito');
            res.status(200).json({ message: 'Pruebas de logs realizadas con éxito' });
        } catch (error) {
            logger.error(`Error en la prueba de logs: ${error.message}`);
            res.status(500).json({ error: 'Error en las pruebas de logs' });
        }
    }
};

export default testingController;
