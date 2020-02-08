/**
 * ends session and redirects to login screen.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        req.session.destroy(() => {
            return res.redirect("/");
        });
    };
  
};