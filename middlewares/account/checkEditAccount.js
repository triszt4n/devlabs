/**
 * Checks, if submitted data is valid for the purpose.
 */
const { ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.email === "" || req.body.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g) === null) {
            req.session.message = ACCOUNT_MESSAGES.email.invalidError;
            return res.redirect("/account/edit");
        }

        if ((res.locals.dev !== null) && (res.locals.dev._id != req.session.userID)) { //can't use !== (userID is not ObjectID())
            req.session.message = ACCOUNT_MESSAGES.email.duplicateError;
            return res.redirect("/account/edit");
        }

        delete res.locals.dev;
        return next();
    };  
};