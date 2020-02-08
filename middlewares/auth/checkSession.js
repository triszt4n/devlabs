/**
 * if logged in - according to session -, redirects to /projects page
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userID !== "undefined") {
            return res.redirect("/projects");
        }
        return next();
    };
};