const testPasswordAgainstDenyList = require('../security/passwordDenyList');
const AppError = require('../errors/appError');

module.exports.validateUserData = async (userData) => {
    if (!userData.firstName) {
        throw new AppError('No first name was provided', 400);
    }
    if (userData.firstName > 255) {
        throw new AppError(
            'First name must be less than 255 characters long',
            400
        );
    }
    if (!userData.lastName) {
        throw new AppError('No last name was provided', 400);
    }
    if (userData.lastName > 255) {
        throw new AppError(
            'Last name must be less than 255 characters long',
            400
        );
    }
    if (!userData.email) {
        throw new AppError('No email name was provided', 400);
    }
    if (!module.exports.isValidEmail(userData.email)) {
        throw new AppError('Invalid email', 400);
    }
    if (userData.email > 255) {
        throw new AppError('Email must be less than 255 characters long', 400);
    }
    if (!userData.password) {
        throw new AppError('No password was provided', 400);
    }
    const [isValidPassword, invalidPasswordMessage] =
        await module.exports.validatePassword(userData.password);
    if (!isValidPassword) {
        throw new AppError(invalidPasswordMessage, 400);
    }
};
module.exports.isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        String(email).toLowerCase()
    );
};
/**
 * @param {String} password
 * @returns {[Boolean,String]}
 */
module.exports.validatePassword = async (password) => {
    if (password.length < 12) {
        return [false, 'Password must be at least 12 characters long'];
    }
    if (password.length > 255) {
        return [false, 'Password must be less than 255 characters long'];
    }
    const allowedPassword = await testPasswordAgainstDenyList(password);
    if (!allowedPassword) {
        return [false, 'Password is in deny list.'];
    }

    return [true, ''];
};
