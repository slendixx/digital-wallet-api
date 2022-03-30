const bcrypt = require( 'bcrypt');
const calculateIdealHashCost = require( '../security/calculateIdealHashCost');
const db = require( './dbConnection');

module.exports.insert = async (data) => {
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    const result = {
        ok: false,
    };
    try {
        validateUserData(userData);
    } catch (error) {
        console.log('validation error: ' + error);
        result.ok = false;
        result.message(error); //TODO test validation errors
        return;
    }
    //complete user data
    userData.firstName = userData.firstName.toLowerCase();
    userData.lastName = userData.lastName.toLowerCase();
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(userData.password, hashCost);
    //TODO research why it is not advisable to use pepper with bcrypt
    userData = hashedPassword;

    //query db
    const connection = db.getConnection();
    const insertUserQuery =
        'INSERT INTO user (first_name, last_name, email, password) VALUES ?';

    const values = [...userData];
    try {
        await db.queryAsync(connection, insertUserQuery, [values]);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.select = (id) => {
    const result = {
        ok: false,
    };

    const connection = db.getConnection();
    const selectUserQuery =
        'SELECT id, first_name, last_name FROM user WHERE id = ?';
    try {
        await db.queryAsync(connection, selectUserQuery, id);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
