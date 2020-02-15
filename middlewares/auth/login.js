/**
 * completes login with starting session, saving userID into session.
 * finally redirect to /
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        req.session.userID = res.locals.dev._id;
        return res.redirect("/projects");
    };  
};