const nodemailer = require('nodemailer');
module.exports.send = async ({ to, emailBody }) => {
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
        to,
        subject: 'Password recovery',
        html: `<b>${emailBody}</b>`,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
