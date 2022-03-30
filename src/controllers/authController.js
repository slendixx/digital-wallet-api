const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const { catchAsync } = require('../errors/errorController');

//by default, JWT tokens will expire after 15 minutes = 900 seconds
module.exports.signJwt = catchAsync(async (req, res, next) => {
    const jwtExpirationTime = Number(process.env.JWT_EXPIRATION_TIME) || 900;

    jwt.sign(
        { id: req.user },
        process.env.JWT_SECRET,
        {
            expiresIn: jwtExpirationTime,
        },
        (error, token) => {
            if (error) return next(new AppError(error.message, 500));

            res.cookie('jwt', token, {
                httpOnly: process.env.COOKIE_HTTP_ONLY !== undefined,
                sameSite: process.env.COOKIE_SAME_SITE !== undefined,
                signed: process.env.COOKIE_SIGNED !== undefined,
                secure: process.env.COOKIE_SECURE !== undefined,
            });

            return res.status(200).json({
                ok: true,
                jwt: token,
            });
        }
    );
});
