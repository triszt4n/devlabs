/**
 * Delete developer/user from db.
 */
const { ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (res.locals.dev.memberships.iHaveOwnership) {
            req.session.message = ACCOUNT_MESSAGES.account.ownershipError;
            return res.redirect(`/error`);
        }

        let dev = res.locals.dev;
        dev.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = ACCOUNT_MESSAGES.account.deleteSaveError;
                return res.redirect(`/error`);
            }
            return next();
        });
    };  
};