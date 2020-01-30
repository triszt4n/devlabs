/**
 * check if the devID from req is the same as session.devID
 * if yes, redirect to /profile, if not, move on.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};