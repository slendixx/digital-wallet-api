const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const userValidation = require('../models/userValidation');
const user = require('../models/user');

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
    const jwtExpirationTime = Number(process.env.JWT_EXPIRATION_TIME) || 900;
    let jwt;
    try {
        jwt = await jsonwebtoken.sign(
            { id: userData.id },
            process.env.PASSWORD_RECOVERY_JWT_SECRET,
            {
                expiresIn: jwtExpirationTime,
            }
        );
    } catch (error) {
        result.message = error.message;
        result.status = 500;
    }
    const responseEmailBody = jwt;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cassandre.west26@ethereal.email',
            pass: 'NjXNGjZhdD8Cs96JxY',
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'Digital Wallet',
        to: email,
        subject: 'Password recovery',
        html: `<b>${responseEmailBody}</b>`,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    result.ok = true;
    return result;
};
