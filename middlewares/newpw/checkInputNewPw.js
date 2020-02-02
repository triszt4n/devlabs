/**
 * checks, if the body passes acceptable new password
 * if error: redirect to /newpw?err=missing_input
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};