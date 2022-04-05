const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const db = require('./dbConnection');
const validation = require('./userValidation');

module.exports.insert = async (data) => {
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    const result = {
        ok: false,
    };
    try {
        await validation.validateUserData(userData);
    } catch (error) {
        console.log('validation error: ' + error.message);
        result.ok = false;
        result.message = error; //TODO test validation errors
        return result;
    }
    //complete user data
    userData.firstName = userData.firstName.toLowerCase();
    userData.lastName = userData.lastName.toLowerCase();
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(userData.password, hashCost);
    //TODO research why it is not advisable to use pepper with bcrypt
    userData.password = hashedPassword;

    //query db
    const connection = db.getConnection();
    const insertUserQuery =
        'INSERT INTO user (first_name, last_name, email, password) VALUES (?)';

    const values = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
    ];
    try {
        result.rows = await db.queryAsync(connection, insertUserQuery, [
            values,
        ]);

        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.select = async ({ id, getPasswordRecoveryToken }) => {
    const result = {
        ok: false,
    };

    let selectFields = 'id, first_name, last_name';
    if (getPasswordRecoveryToken) selectFields += ',password_recovery_token';

    const connection = db.getConnection();
    const selectUserQuery =
        'SELECT ' + selectFields + ' FROM user WHERE id = ?';
    try {
        result.rows = await db.queryAsync(connection, selectUserQuery, id);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.findOne = async (email) => {
    const selectQuery = 'SELECT * FROM user WHERE email = ?;';
    const connection = db.getConnection();
    const result = {};
    try {
        result.rows = await db.queryAsync(connection, selectQuery, [email]);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.updatePasswordRecoveryToken = async ({ id, token }) => {
    const result = {
        ok: false,
    };

    const hashCost = await calculateIdealHashCost();
    const hashedToken = await bcrypt.hash(token, hashCost);

    const updateQuery =
        'UPDATE user SET password_recovery_token = ? WHERE id = ?';
    const values = [hashedToken, id];
    const connection = db.getConnection();
    try {
        result.rows = await db.queryAsync(connection, updateQuery, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.status = 400;
    }
    return result;
};

module.exports.updatePassword = async ({ id, newPassword, token }) => {
    const result = {
        ok: false,
    };
    const [isValidPassword, invalidPasswordMessage] =
        await validation.validatePassword(newPassword);

    if (!isValidPassword) {
        result.message = invalidPasswordMessage;
        result.status = 400;
        return;
    }
    const response = await module.exports.select({
        id,
        getPasswordRecoveryToken: true,
    });
    if (response.rows.length === 0) {
        result.message = 'No user found for the given id';
        result.status = 404;
        return result;
    }
    const [userData] = response.rows;
    const isValidToken = await bcrypt.compare(
        token,
        userData.password_recovery_token
    );

    if (!isValidToken) {
        result.message = 'Invalid password recovery token';
        result.status = 401;
        return result;
    }
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(newPassword, hashCost);

    const updateQuery =
        'UPDATE user SET password = ?, password_recovery_token = NULL WHERE id = ?';
    const values = [hashedPassword, id];
    const connection = db.getConnection();
    try {
        result.rows = await db.queryAsync(connection, updateQuery, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.status = 400;
    }
    return result;
};
