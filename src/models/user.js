import bcrypt from 'bcrypt';
import calculateIdealHashCost from '../security/calculateIdealHashCost';
import db from './dbConnection';
import AppError from '../errors/appError';
import testPassword from '../security/passwordDenyList';

export const insert = async (data) => {
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    const result = {
        ok: false,
    };
    try {
        validateUserData(userData);
    } catch (error) {
        console.log('validation error: ' + error);
        result.ok = false;
        result.message(error); //TODO test validation error messages
        return;
    }
    //complete user data
    userData.firstName = userData.firstName.toLowerCase();
    userData.lastName = userData.lastName.toLowerCase();
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(userData.password, hashCost);
    //query db
};

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
    const isValidPassword = await testPassword(userData.password);
    if (!isValidPassword) {
        throw new AppError('Password is too common/weak.', 400);
    }
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
