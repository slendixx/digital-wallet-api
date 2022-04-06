const AppError = require('../errors/appError');
const db = require('./dbConnection');
module.exports.validateTransactionData = (data) => {
    if (!data.amount) {
        throw new AppError('No amount was provided', 400);
    }
    if (data.amount <= 0) {
        throw new AppError('Amount must be greater than 0', 400);
    }
    if (!data.userId) {
        throw new AppError('No user id was provided', 400);
    }
    if (!data.transactionTypeId) {
        throw new AppError('No transaction type id was provided', 400);
    }
    if (!data.reasonId) {
        throw new AppError('No reason id was provided', 400);
    }
};
/*
transaction table columns:
id
amount int 
user_id int 
transaction_type_id int 
reason_id int 
date datetime 
reference varchar(255)
 */
/*
It is not necessary to check for foreign key value's existence because in that case, the foreign key will fail.

const checkForeignKeysExistence = async ({
    userId,
    transactionTypeId,
    reasonId,
}) => {
    const result = {
        ok: false,
    };
    const connection = db.getConnection();
    const validationQuery =
        'CALL validateTransactionForeignKeys(?,?,?,@userExists,@transactionTypeExists,@reasonExists); SELECT @userExists, @transactionTypeExists, @reasonExists;';
    const values = [data.userId, data.transactionTypeId, data.reasonId];
    let validationResponse;
    try {
        validationResponse = await db.queryAsync(
            connection,
            validationQuery,
            values
        );
    } catch (error) {
        result.message = error;
        return result;
    }

    result.checks = validationResponse[1][1];
    result.ok = true;
    return;
};
*/
