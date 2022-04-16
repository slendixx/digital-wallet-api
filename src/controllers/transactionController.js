const AppError = require('../errors/appError');
const { catchAsync } = require('../errors/errorController');
const transaction = require('../models/transaction');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user;

    const result = await transaction.select({ userId });
    if (!result.ok) return next(new AppError(result.message, 400));

    if (result.rows.length === 0)
        return next(
            new AppError('No transactions found for the given userId', 404)
        );

    res.status(200).json({
        ok: true,
        data: result.rows,
    });
});
module.exports.create = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user;
    const transactionData = {
        amount: req.body.amount,
        userId,
        transactionTypeId: req.body.transactionTypeId,
        reasonId: req.body.reasonId,
        reference: req.body.reference,
        date: req.body.date,
    };
    const result = await transaction.insert({ data: transactionData });

    if (!result.ok) return next(new AppError(result.message, result.status));

    res.status(201).json({
        ok: true,
        status: result.message,
    });
});
module.exports.updateById = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user;
    const { transactionId } = req.params;
    const transactionData = {
        transactionId,
        userId,
        amount: req.body.amount,
        reasonId: req.body.reasonId,
        reference: req.body.reference,
    };

    const result = await transaction.update({
        transactionId,
        data: transactionData,
    });

    if (!result.ok) return next(new AppError(result.message, result.status));

    res.status(200).json({
        ok: true,
        status: result.message,
    });
});
module.exports.deleteById = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user;
    const { transactionId } = req.params;
    const result = await transaction.delete({ transactionId, userId });

    if (!result.ok) return next(new AppError(result.message, result.status));

    res.status(204).send();
});
