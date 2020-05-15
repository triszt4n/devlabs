/**
 * Execute edits of account with passed data, then redirect to /account.
 * If problem occurs, pass a message to session.
 */
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        dev.email = req.body.email;
        dev.name = (req.body.name !== "")? req.body.name : req.body.email.split("@")[0];
        dev.phone = req.body.phone;
        dev.githubUsername = req.body.githubUsername;

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = DEFAULT_MESSAGES.saveError;
                return res.redirect("/account/edit");
            }

            return res.redirect("/account");
        });
    };
  
};