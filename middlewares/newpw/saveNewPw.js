/**
 * get devID from session, and new password from body
 * and set it as developer's new password, change developer's
 * freshpw attribute from true to false in db.
 * then redirect to /sprints
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};