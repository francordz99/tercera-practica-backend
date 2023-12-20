import Cart from "../dao/models/cartModel.js";
import Product from "../dao/models/productModel.js";
import jwt from "jsonwebtoken";
import MailingService from "../services/mailing.service.js";
import TicketService from "../services/ticket.service.js";
import { config } from "../config/dotenvConfig.js";
import { cartErrors } from '../services/errors/cartErrors.js';
import { logger } from '../helpers/loggerConfig.js';

const cartController = {
    addProductToCart: async (req, res) => {
        try {
            const productId = req.params.productId;
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const product = await Product.findById(productId);
            console.log(product);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            if (product.owner === userEmail) {
                return res.status(403).json({ message: 'No puedes agregar tu propio producto al carrito' });
            }
            const cart = await Cart.findOne({ email: userEmail });
            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            logger.info(`Producto agregado al carrito: ${productId} - Usuario: ${userEmail}`);
            res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
        } catch (error) {
            logger.error(`Error al agregar producto al carrito: ${error.message}`);
            cartErrors.addProductToCartError();
        }
    },

    getCartProducts: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const cart = await Cart.findOne({ email: userEmail });
            if (!cart || !cart.products || cart.products.length === 0) {
                logger.info('Intento de acceder a un carrito vacío');
                return res.status(404).json({ message: 'El carrito está vacío' });
            }
            const productDetails = await Promise.all(cart.products.map(async (item) => {
                const product = await Product.findById(item.product);
                return {
                    product: {
                        _id: product._id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        price: product.price,
                    },
                    quantity: item.quantity,
                };
            }));

            logger.info(`Renderizando el carrito del usuario: ${userEmail}`);
            res.render('cart', { products: productDetails });
        } catch (error) {
            logger.error(`Error al obtener productos del carrito: ${error.message}`);
            cartErrors.getCartProductsError();
        }
    },
    deleteProductFromCart: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const productId = req.params.productId;
            const userCart = await Cart.findOne({ email: userEmail });
            if (!userCart) {
                logger.error('Carrito no encontrado');
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            const productIndex = userCart.products.findIndex(product => product.product.toString() === productId);
            if (productIndex === -1) {
                logger.error('Producto no encontrado en el carrito');
                return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
            }
            userCart.products.splice(productIndex, 1);
            await userCart.save();

            logger.info(`Producto eliminado del carrito: ${productId} - Usuario: ${userEmail}`);
            res.status(200).json({ message: 'Producto eliminado del carrito con éxito' });
        } catch (error) {
            logger.error(`Error al eliminar producto del carrito: ${error.message}`);
            cartErrors.deleteProductFromCartError();
        }
    },
    editProductQuantity: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const productId = req.params.productId;
            const newQuantity = req.body.quantity;
            const userCart = await Cart.findOne({ email: userEmail });

            if (!userCart) {
                logger.error('Carrito no encontrado');
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }
            const productInCart = userCart.products.find(product => product.product.toString() === productId);

            if (!productInCart) {
                logger.error('Producto no encontrado en el carrito');
                return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
            }
            productInCart.quantity = newQuantity;
            await userCart.save();
            logger.info(`Cantidad del producto actualizada: ${productId} - Usuario: ${userEmail}`);
            res.status(200).json({ success: true, message: 'Cantidad del producto actualizada correctamente' });
        } catch (error) {
            logger.error(`Error al actualizar cantidad del producto: ${error.message}`);
            cartErrors.editProductQuantityError();
        }
    },
    buyItems: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const cart = await Cart.findOne({ email: userEmail });

            if (!cart || !cart.products || cart.products.length === 0) {
                logger.info('Intento de comprar con un carrito vacío');
                return res.status(404).json({ success: false, message: 'El carrito está vacío' });
            }

            const productsToBuy = cart.products;

            for (const product of productsToBuy) {
                const existingProduct = await Product.findById(product.product);

                if (!existingProduct || existingProduct.stock < product.quantity) {
                    logger.error(`No hay suficiente stock para el producto: ${existingProduct.title}`);
                    return res.status(400).json({
                        success: false,
                        message: `No hay suficiente stock para el producto: ${existingProduct.title}`
                    });
                }
            }

            const ticketCode = TicketService.generateTicketCode();
            const purchaseDateTime = new Date();
            const amount = parseFloat(req.body.total);
            const purchaser = userEmail;

            await TicketService.createTicket(ticketCode, purchaseDateTime, amount, purchaser);

            for (const product of productsToBuy) {
                const existingProduct = await Product.findById(product.product);

                if (existingProduct) {
                    await Product.findByIdAndUpdate(existingProduct._id, { $inc: { stock: -product.quantity } });
                }
            }

            await Cart.findOneAndUpdate({ email: userEmail }, { $set: { products: [] } });

            const mailingResult = await MailingService.sendPurchaseConfirmation(userEmail, ticketCode);

            if (mailingResult.success) {
                logger.info(`Compra exitosa - Usuario: ${userEmail} - Ticket: ${ticketCode}`);
                return res.status(200).json({ success: true, message: 'Compra exitosa', ticketCode: ticketCode });
            } else {
                logger.error(`Error en el servidor al enviar confirmación de compra - Usuario: ${userEmail} - Ticket: ${ticketCode}`);
                return res.status(500).json({ success: false, message: 'Error en el servidor', error: mailingResult.error });
            }
        } catch (error) {
            logger.error(`Error al realizar la compra: ${error.message}`);
            cartErrors.buyItemsError();
        }
    },
}

export default cartController;
