/**
 * if not logged in - according to session -, redirects to login page
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.devID === "undefined") {
            res.redirect("/");
        }

        return next();
    };
  
};