/**
 * returns the developers from list of res.locals.devs which cannot be found in
 * res.locals.project.members already.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let nonMembers = res.locals.devs.filter(item => 
            res.locals.project.members.indexOf(item._id) === -1
        );
        res.locals.project.nonMembers = nonMembers;

        return next();
    };
};