const db = require('./dbConnection');
const validation = require('./transactionValidation');

module.exports.select = async ({ userId }) => {
    const result = {
        ok: false,
    };
    const connection = db.getConnection();
    const selectQuery =
        'SELECT transaction_id, amount, transaction_type, concept, reference FROM v_user_transactions WHERE user_id = ?';
    try {
        result.rows = await db.queryAsync(connection, selectQuery, userId);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};

module.exports.insert = async ({ data }) => {
    const transactionData = { ...data };
    const result = {
        ok: false,
    };
    //validate data
    try {
        validation.validateTransactionData(transactionData);
    } catch (error) {
        result.message = error.message;
        result.status = 400;
        return result;
    }
    //complete data
    const currentDatetime = new Date();
    //'returned date format: YYYY-MM-DDTHH:MM:SS.ZZZ'
    const [datePartFormatted, timePart] = currentDatetime
        .toISOString()
        .split('T');
    const [timePartFormatted] = timePart.split('.');
    transactionData.date = datePartFormatted + ' ' + timePartFormatted;

    // query db
    const insertQuery =
        'INSERT INTO transaction (amount,user_id,transaction_type_id,concept,date) VALUES (?)';
    const connection = db.getConnection();
    const values = [
        transactionData.amount,
        transactionData.userId,
        transactionData.transactionTypeId,
        transactionData.conceptId,
        transactionData.date,
    ];

    try {
        result.rows = await db.queryAsync(connection, insertQuery, [values]);

        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.update = async ({ transactionId, data }) => {
    const transactionData = { ...data };
    const result = {
        ok: false,
    };
    //validate data
    try {
        validation.validateTransactionData(transactionData);
    } catch (error) {
        result.message = error.message;
        result.status = 400;
        return result;
    }
    //query db
    const updateQuery =
        'UPDATE transaction SET amount=?,SET user_id=?,SET transaction_type_id=?,SET concept=?,SET date=? WHERE id=?';
    const connection = db.getConnection();
    const values = [
        transactionData.amount,
        transactionData.userId,
        transactionData.transactionTypeId,
        transactionData.conceptId,
        transactionData.date,
        transactionId,
    ];

    try {
        result.rows = await db.queryAsync(connection, updateQuery, [values]);

        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
