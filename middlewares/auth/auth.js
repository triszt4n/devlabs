/**
 * redirects to login page, if not logged in according to session
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.devID === "undefined") {
            res.redirect("/");
        }

        return next();
    };
  
};