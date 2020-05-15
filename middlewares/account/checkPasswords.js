/**
 * Checks, if data posted is valid for changing the password.
 */
const { ACCOUNT_MESSAGES, DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.newpw1 === "" || req.body.newpw2 === "" || req.body.oldpw === "") {
            req.session.message = DEFAULT_MESSAGES.emptyForm;
            return res.redirect("/account/pw");
        }

        if (req.body.newpw1 !== req.body.newpw2) {
            req.session.message = ACCOUNT_MESSAGES.pw.matchError;
            return res.redirect("/account/pw");
        }

        if (res.locals.dev.pw !== req.body.oldpw) {
            req.session.message = ACCOUNT_MESSAGES.pw.oldError;
            return res.redirect("/account/pw");
        }

        if (req.body.newpw1.length < 6) {
            req.session.message = ACCOUNT_MESSAGES.pw.shortError;
            return res.redirect("/account/pw");
        }

        return next();
    };  
};