/**
 * Post method
 * Changes user/developer's password in db.
 */
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        dev.pw = req.body.newpw1;

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = DEFAULT_MESSAGES.dbError;
                return res.redirect("/account/pw");
            }

            return res.redirect("/");
        });
    };
};