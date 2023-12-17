import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0
    },
    sexo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    celular: Number,
    password: {
        type: String,
        required: true
    },
    token: String,
    role: {
        type: String,
        default: 'user',
    }
});

const User = mongoose.model('User', userSchema);

export default User;
