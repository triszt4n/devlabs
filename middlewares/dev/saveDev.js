/**
 * create a new developer with given data from body
 * if no data passed from body, move on.
 * (note: check if email collides with others', redirect with /devs/new?err=collision
 * check if email is wrong format, redirect with /devs/new?err=wrong_format
 * check if missing attribute, redirect with /devs/new?err=missing_data)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};