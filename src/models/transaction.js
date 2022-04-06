const db = require('./dbConnection');
const validation = require('./transactionValidation');

module.exports.select = async ({ userId }) => {
    const result = {
        ok: false,
    };
    const connection = db.getConnection();
    const selectQuery =
        'SELECT transaction_id, amount, transaction_type, reason, reference FROM v_user_transactions WHERE user_id = ?';
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

    //query db
    const insertQuery =
        'INSERT INTO transaction (amount,user_id,transaction_type_id,reason_id,date) VALUES (?)';
    const connection = db.getConnection();
    const values = [
        transactionData.amount,
        transactionData.userId,
        transactionData.transactionTypeId,
        transactionData.reasonId,
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
