import url from 'url';
import path from 'path';
import bcrypt from 'bcrypt';

// Directorios

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// BCrypt

export const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};
