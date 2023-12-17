// ticket.service.js
import Ticket from "../dao/models/ticketModel.js";
import { ticketErrors } from './errors/ticketErrors.js';
import { logger } from "../helpers/loggerConfig.js";

const TicketService = {
    generateTicketCode: () => {
        const randomNumber = Math.floor(Math.random() * 1000000000000);
        return `TICKET${randomNumber.toString().padStart(12, '0')}`;
    },

    createTicket: async (code, purchaseDateTime, amount, purchaser) => {
        try {
            const newTicket = new Ticket({
                code: code,
                purchaseDateTime: purchaseDateTime,
                amount: amount,
                purchaser: purchaser,
            });
            await newTicket.save();
        } catch (error) {
            logger.error('Error al crear el ticket:', error);
            ticketErrors.ticketCreationError(error);
        }
    },
};

export default TicketService;
