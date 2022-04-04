const AppError = require('../errors/appError');
const { catchAsync } = require('../errors/errorController');
const jsonwebtoken = require('jsonwebtoken');
const user = require('../models/user');

module.exports.create = catchAsync(async (req, res, next) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    const result = await user.insert(userData);

    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(200).json({
        ok: true,
        status: result.message,
    });
});

module.exports.getById = catchAsync(async (req, res, next) => {
    const id = Number(req.params.userId);
    const result = await user.select({ id, getPasswordRecoveryToken: false });

    if (!result.ok) return next(new AppError(result.message, 400));
    if (result.rows.length === 0)
        return next(new AppError('No user found for the given id.', 404));

    res.status(200).json({
        ok: true,
        results: result.rows,
    });
});

module.exports.changePassword = catchAsync(async (req, res, next) => {
    const jwt = req.body.jwt;
    if (!jwt) return next(new AppError('no JWT was provided', 400));
    const isValidJwt = await jsonwebtoken.verify(
        jwt,
        process.env.PASSWORD_RECOVERY_JWT_SECRET
    );
    console.log({ isValidJwt });

    if (!isValidJwt) return next(new AppError('invalid jwt', 401));

    res.status(200).json({
        ok: true,
    });
});
