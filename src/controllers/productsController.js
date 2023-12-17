import Product from '../dao/models/productModel.js';
import { productsErrors } from '../services/errors/productsErrors.js';
import { logger } from '../helpers/loggerConfig.js';

const productsController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            if (!products || products.length === 0) {
                logger.info('No se encontraron productos');
                return res.render('products', { errorMessage: 'No se encontraron productos.' });
            }
            logger.info('Obteniendo productos');
            res.render('products', { products });
        } catch (error) {
            logger.error(`Error al obtener productos: ${error.message}`);
            productsErrors.getProductsError();
        }
    },
};

export default productsController;
