const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const db = require('./dbConnection');
const validateUserData = require('./userValidation');

module.exports.insert = async (data) => {
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    const result = {
        ok: false,
    };
    try {
        await validateUserData(userData);
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

    console.log({ completedUserData: userData });
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

module.exports.select = async (id) => {
    const result = {
        ok: false,
    };

    const connection = db.getConnection();
    const selectUserQuery =
        'SELECT id, first_name, last_name FROM user WHERE id = ?';
    try {
        result.rows = await db.queryAsync(connection, selectUserQuery, id);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
