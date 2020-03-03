/**
 * If not logged in - according to session -, redirects to login page
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userID === "undefined") {
            return res.redirect("/");
        }
        return next();
    };
};