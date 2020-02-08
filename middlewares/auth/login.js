/**
 * completes login with starting session, saving userID into session.
 * finally redirect to /
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        req.session.userID = 123; //res.locals.devID;
        return res.redirect("/projects");
    };  
};