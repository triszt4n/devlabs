/**
 * Completes registration of developer/user with data posted, and redirect to /
 */
const requireOption = require('../default/requireOption');
const { DEFAULT_MESSAGES, ACCOUNT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        //Defining new Dev:
        var DeveloperModel = requireOption(objectRepository, 'DeveloperModel');
        var dev = new DeveloperModel();

        dev.name = (req.body.name !== "")? req.body.name : req.body.email.split("@")[0];
        dev.email = req.body.email;
        dev.pw = req.body.pw;
        dev.phone = req.body.phone;
        dev.githubUsername = req.body.githubUsername;

        dev.save((err) => {
            if (err) {
                req.session.message = DEFAULT_MESSAGES.dbError;
                console.log(err);
                return res.redirect("/register");
            }
            req.session.message = ACCOUNT_MESSAGES.account.registerSuccess;
            req.session.messageColor = "#00bc8c";
            return res.redirect("/");
        });
    };
};