const jsonwebtoken = require('jsonwebtoken');
const userValidation = require('../models/userValidation');
const user = require('../models/user');

const passwordRecoveryTokenLength =
    Number(proces.env.PASSWORD_RECOVERY_TOKEN_LENGTH) || 30;

module.exports = async (email) => {
    const result = {
        ok: false,
    };
    //validate email
    const isValidEmail = userValidation.validateEmail(email);
    if (!isValidEmail) {
        result.message = 'Invalid email';
        result.status = 400;
        return result;
    }
    //check if user exists
    const response = await user.findOne(email);
    if (response.rows.length === 0) {
        result.message = 'No user found for the given email';
        result.status = 404;
        return result;
    }

    // create response email body
    const [userData] = response.rows;
    const passwordRecoveryToken = generatePasswordRecoveryToken(
        passwordRecoveryTokenLength
    );

    const jwtExpirationTime = Number(process.env.JWT_EXPIRATION_TIME) || 900;
    let jwt;
    try {
        jwt = await jsonwebtoken.sign(
            { id: userData.id, passwordRecoveryToken },
            process.env.PASSWORD_RECOVERY_JWT_SECRET,
            {
                expiresIn: jwtExpirationTime,
            }
        );
    } catch (error) {
        result.message = error.message;
        result.status = 500;
    }
    result.jwt = jwt;

    result.ok = true;
    return result;
};

function generatePasswordRecoveryToken(length) {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}
