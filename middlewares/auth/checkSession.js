/**
 * if logged in - according to session -, redirects to /account page
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userID !== "undefined") {
            return res.redirect("/account");
        }
        return next();
    };
};