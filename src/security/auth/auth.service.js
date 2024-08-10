import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUser } from '../../repositories/user.repository.js';

const validateUserService = async (mobile, password) => {
    const user = await findUser(mobile);

    if (!user || !await bcrypt.compare(password, user.password)) {
        return null;
    }

    return user;
};

const generateTokenService = (user) => {
    console.log(user);
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const registerUserService = async ({ username, email, phone, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.query().insert({ username, email, phone, password: hashedPassword });
};

const clearRefreshTokenService = async (userId) => {
    await User.query().findById(userId).patch({ refreshToken: null });
};

export { 
    validateUserService, 
    generateTokenService, 
    registerUserService, 
    clearRefreshTokenService 
};
