const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const { catchAsync } = require('../errors/errorController');
const user = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const createPasswordRecoveryToken = require('../auth/passwordRecoveryToken');
const email = require('../models/email');

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
            });
        }
    );
});

module.exports.createPasswordRecoveryToken = catchAsync(
    async (req, res, next) => {
        const userEmail = req.body.email;

        const result = await createPasswordRecoveryToken(userEmail);
        if (!result.ok)
            return next(new AppError(result.message, result.status));
        const passwordRecoveryToken = result.jwt;

        const passwordChangeLink =
            process.env.WEB_CLIENT_HOST ||
            'http://127.0.0.1:3001' +
                '/change-password?token=' +
                passwordRecoveryToken;

        const emailBody = `<a href=${passwordChangeLink}>Click here to set a new password</a>`;

        await email.send({ to: userEmail, emailBody });

        res.status(200).json({
            ok: true,
        });
    }
);

module.exports.changePassword = catchAsync(async (req, res, next) => {
    const { passwordRecoveryToken, newPassword } = req.body;
    if (!passwordRecoveryToken)
        return next(
            new AppError('No password recovery token was provided', 400)
        );
    let tokenData;
    try {
        tokenData = await jsonwebtoken.verify(
            passwordRecoveryToken,
            process.env.PASSWORD_RECOVERY_JWT_SECRET
        );
    } catch (error) {
        return next(new AppError(error.message, 401));
    }
    const result = await user.updatePassword({
        id: tokenData.id,
        newPassword,
        token: tokenData.passwordRecoveryToken,
    });

    if (!result.ok) return next(new AppError(result.message, result.status));

    res.status(200).json({
        ok: true,
    });
});
