import mongoose from "mongoose";

const { Schema } = mongoose;

const supportSchema = new Schema({
    sender: String,
    title: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Support = mongoose.model('Support', supportSchema);

export default Support;