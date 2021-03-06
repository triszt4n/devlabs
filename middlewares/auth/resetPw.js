/**
 * Change user's password in db to a 10-character random key, "send it to them", and
 * finally redirect to /
 */
const { DEFAULT_MESSAGES, ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        if (dev === null) {
            req.session.message = ACCOUNT_MESSAGES.login.cantFindError;
            return res.redirect("/forgotten");
        }

        dev.pw = generateRandomString(10);

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = DEFAULT_MESSAGES.dbError;
                return res.redirect("/forgotten");
            }

            req.session.message = "New password: " + dev.pw;
            req.session.messageColor = "#00bc8c";
            return res.redirect("/");
        });
    };
};

function generateRandomString(length) {
    var result = '';
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
}