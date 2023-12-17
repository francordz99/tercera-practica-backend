import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchaseDateTime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
