const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const { catchAsync } = require('../errors/errorController');

module.exports.signJwt = catchAsync(async (req, res, next) => {
    jwt.sign({ id: req.user }, process.env.JWT_SECRET, (error, token) => {
        if (error) return next(new AppError(error.message, 400));

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSime: true,
            signed: true,
            secure: true,
        });

        return res.status(200).json({
            ok: true,
            jwt: token,
        });
    });
});
