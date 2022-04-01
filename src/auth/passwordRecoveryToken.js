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

    result.ok = true;
    return result;
};
