import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;