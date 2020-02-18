/**
 * delete developer with devID from db
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (res.locals.dev.memberships.iHaveOwnership) {
            console.log("Couldn't delete yet.");
            req.session.message = "ATTENTION: Can't delete account yet. Please hand over the control of your own projects to other Members.";
            return res.redirect(`/error`);
        }

        let dev = res.locals.dev;
        dev.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = "Error occured while deleting user.";
                return res.redirect(`/error`);
            }
            return next();
        });
    };  
};