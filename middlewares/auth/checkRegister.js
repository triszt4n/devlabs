/**
 * Checks, if registering is possible with the data posted. Redirects back with error
 * message if there's problem.
 */
const { DEFAULT_MESSAGES, ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.email === "" || req.body.pw === "" || req.body.repeatpw === "") {
            req.session.message = DEFAULT_MESSAGES.emptyForm;
            return res.redirect("/register");
        }

        if (req.body.pw !== req.body.repeatpw) {
            req.session.message = ACCOUNT_MESSAGES.pw.matchError;
            return res.redirect("/register");
        }

        if (res.locals.dev !== null) {
            req.session.message = ACCOUNT_MESSAGES.email.duplicateError;
            return res.redirect("/register");
        }

        if (req.body.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g) === null) {
            req.session.message = ACCOUNT_MESSAGES.email.invalidError;
            return res.redirect("/register");
        } //Lesson learnt: handshake method would be more reliable.

        if (req.body.pw.length < 6) {
            req.session.message = ACCOUNT_MESSAGES.pw.shortError;
            return res.redirect("/register");
        }

        return next();
    };  
};