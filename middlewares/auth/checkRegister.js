/**
 * checks, if registering is possible, errors may be:
 * missing input: redirect to /register?err=missing_data
 * found email in db: redirect to /register?err=collision
 * wrong email format: redirect to /register?err=wrong_format
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};