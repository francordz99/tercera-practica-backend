import { EError } from "../enums/EError.js";
import { logger } from "../helpers/loggerConfig.js";

export const errorHandler = (error, req, res, next) => {
    logger.info(error.code);
    switch (error.code) {
        case EError.MONGOOSE_CONNECT_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.PRODUCT_NOT_FOUND:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.ADD_PRODUCT_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EDIT_PRODUCT_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.DELETE_PRODUCT_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.USER_NOT_FOUND:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EDIT_PERMISSIONS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.REGISTER_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.LOGIN_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.ADD_TO_CART_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.GET_CART_PRODUCTS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.DELETE_FROM_CART_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EDIT_QUANTITY_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.BUY_ITEMS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EMPTY_CART_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.INSUFFICIENT_STOCK_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.TICKET_GENERATION_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.TICKET_CREATION_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EMAIL_CONFIRMATION_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.GET_CHAT_MESSAGES_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.POST_MESSAGE_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.GET_PRODUCTS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.GET_MOCKED_PRODUCTS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.GET_USER_INFO_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.EDIT_USER_INFO_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.USER_NOT_FOUND_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.CHECK_ADMIN_ROLE_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.CHECK_USER_ROLE_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.TOKEN_NOT_PROVIDED_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.UNAUTHORIZED_ACCESS_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.AUTHENTICATE_TOKEN_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.CHECK_AUTHENTICATED_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.TOKEN_EXPIRED_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        case EError.SEND_PURCHASE_CONFIRMATION_ERROR:
            res.json({ status: "Error", error: error.cause });
            break;
        default:
            res.json({ status: "Error", error: "Error Desconocido" });
            break;
    }
};
