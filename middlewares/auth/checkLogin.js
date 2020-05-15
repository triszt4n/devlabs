/**
 * Checks the login credentials posted, redirects back with errormessage if there's problem.
 */
const { DEFAULT_MESSAGES, ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.email === "" || req.body.pw === "") {
            req.session.message = DEFAULT_MESSAGES.emptyForm;
            return res.redirect("/");
        }

        if (res.locals.dev === null) {
            req.session.message = ACCOUNT_MESSAGES.login.cantFindError;
            return res.redirect("/");
        }

        if (res.locals.dev.pw !== req.body.pw) {
            req.session.message = ACCOUNT_MESSAGES.login.matchError;
            return res.redirect("/");
        }

        if (req.body.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g) === null) {
            req.session.message = ACCOUNT_MESSAGES.email.invalidError;
            return res.redirect("/");
        }

        return next();
    };  
};