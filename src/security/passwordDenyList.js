const { readFileSync } = require('fs');

const passwordDenyList = JSON.parse(
    readFileSync(__dirname + '/passwordDenyList.json')
);

/**
 * Tests password against a dictionary of forbidden passwords.
 * The returned Promise resolves to true if the password is valid or false otherwise.
 * Source: https://www.ncsc.gov.uk/blog-post/passwords-passwords-everywhere
 * @param {String} candidatePassword
 * @returns {Promise}
 */
const testPasswordAgainstDenyList = (candidatePassword) => {
    return new Promise((resolve, reject) => {
        if (passwordDenyList.includes(candidatePassword)) {
            reject(false);
        }
        resolve(true);
    });
};

module.exports = testPasswordAgainstDenyList;
