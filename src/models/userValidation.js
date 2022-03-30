const testPasswordAgainstDenyList = require('../security/passwordDenyList');
const AppError = require('../errors/appError');

const validateUserData = async (userData) => {
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
    if (validateEmail(userData.email)) {
        throw new AppError('Invalid email', 400);
    }
    if (userData.email > 255) {
        throw new AppError('Email must be less than 255 characters long', 400);
    }
    if (!userData.password) {
        throw new AppError('No password was provided', 400);
    }
    if (userData.password.length < 12) {
        throw new AppError('Password must be at least 12 characters long', 400);
    }
    if (userData.password.length < 255) {
        throw new AppError(
            'Password must be less than 255 characters long',
            400
        );
    }
    const isValidPassword = await testPasswordAgainstDenyList(
        userData.password
    );
    if (!isValidPassword) {
        throw new AppError('Password is in deny list.', 400);
    }
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
module.exports = validateUserData;