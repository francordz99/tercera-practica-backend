import { EError } from '../../enums/EError.js';
import { CustomError } from '../../services/errors.service.js';

const cartErrors = {
    addProductToCartError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al agregar el producto al carrito',
            errorCode: EError.ADD_TO_CART_ERROR
        });
    },

    getCartProductsError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al obtener los productos del carrito',
            errorCode: EError.GET_CART_PRODUCTS_ERROR
        });
    },

    deleteProductFromCartError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al eliminar el producto del carrito',
            errorCode: EError.DELETE_FROM_CART_ERROR
        });
    },

    editProductQuantityError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al actualizar la cantidad del producto en el carrito',
            errorCode: EError.EDIT_QUANTITY_ERROR
        });
    },

    buyItemsError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Error al realizar la compra',
            errorCode: EError.BUY_ITEMS_ERROR
        });
    },

    cartNotFoundError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Carrito no encontrado',
            errorCode: EError.EMPTY_CART_ERROR
        });
    },

    productNotFoundErrorInCart: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'Producto no encontrado en el carrito',
            errorCode: EError.PRODUCT_NOT_FOUND
        });
    },

    emptyCartError: () => {
        throw CustomError.createError({
            name: 'Error',
            message: 'El carrito está vacío',
            errorCode: EError.EMPTY_CART_ERROR
        });
    },

    insufficientStockError: (productName) => {
        throw CustomError.createError({
            name: 'Error',
            message: `No hay suficiente stock para el producto: ${productName}`,
            errorCode: EError.INSUFFICIENT_STOCK_ERROR
        });
    },
};

export { cartErrors };
