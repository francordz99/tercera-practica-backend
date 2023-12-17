
// Diccionario De Errores

export const EError = {
    MONGOOSE_CONNECT_ERROR: 100, // Error al Conectar A MongoDB
    PRODUCT_NOT_FOUND: 101, // Producto no encontrado
    ADD_PRODUCT_ERROR: 102, // Error al agregar el producto
    EDIT_PRODUCT_ERROR: 103, // Error al editar el producto
    DELETE_PRODUCT_ERROR: 104, // Error al eliminar el producto
    USER_NOT_FOUND: 105, // Usuario no encontrado
    EDIT_PERMISSIONS_ERROR: 106, // Error al editar permisos
    REGISTER_ERROR: 107, // Error al registrar
    LOGIN_ERROR: 108, // Error al iniciar sesión
    ADD_TO_CART_ERROR: 109, // Error al agregar el producto al carrito
    GET_CART_PRODUCTS_ERROR: 110, // Error al obtener los productos del carrito
    DELETE_FROM_CART_ERROR: 111, // Error al eliminar el producto del carrito
    EDIT_QUANTITY_ERROR: 112, // Error al actualizar la cantidad del producto en el carrito
    BUY_ITEMS_ERROR: 113, // Error al realizar la compra
    EMPTY_CART_ERROR: 114, // El carrito está vacío
    INSUFFICIENT_STOCK_ERROR: 115, // No hay suficiente stock para el producto
    TICKET_GENERATION_ERROR: 116, // Error al generar el código del ticket
    TICKET_CREATION_ERROR: 117, // Error al crear el ticket de compra
    EMAIL_CONFIRMATION_ERROR: 118, // Error al enviar la confirmación de compra por correo electrónico
    GET_CHAT_MESSAGES_ERROR: 119, // Error al obtener los mensajes del chat
    POST_MESSAGE_ERROR: 120, // Error al enviar el mensaje
    GET_PRODUCTS_ERROR: 121, // Error al obtener la lista de productos
    GET_MOCKED_PRODUCTS_ERROR: 122, // Error al obtener productos simulados
    GET_USER_INFO_ERROR: 123, // Error al obtener la información del usuario
    EDIT_USER_INFO_ERROR: 124, // Error al editar la información del usuario
    CHECK_ADMIN_ROLE_ERROR: 125, // Error al verificar el rol de administrador del usuario
    CHECK_USER_ROLE_ERROR: 126, // Error al verificar el rol de usuario del usuario
    TOKEN_NOT_PROVIDED_ERROR: 127, // Token no proporcionado
    UNAUTHORIZED_ACCESS_ERROR: 128, // Acceso no autorizado
    AUTHENTICATE_TOKEN_ERROR: 129, // Error al autenticar el token del usuario
    CHECK_AUTHENTICATED_ERROR: 130, // Error al verificar la autenticación del usuario
    TOKEN_EXPIRED_ERROR: 131, // Token expirado
    UNAUTHORIZED_ACCESS_ERROR: 132, // Acceso no autorizado
    SEND_PURCHASE_CONFIRMATION_ERROR: 133, // Error al enviar la confirmación de compra por correo electrónico
};
