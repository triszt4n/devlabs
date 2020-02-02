/**
 * edit developer with devID with given data from body
 * if no data passed from body, move on.
 * (note: check if email collides with others', redirect with /devs/edit/:devID?err=collision
 * check if email is wrong format, redirect with /devs/edit/:devID?err=wrong_format
 * check if missing attribute, redirect with /devs/edit/:devID?err=missing_data)
 * 
 * (note: don't redirect, might be used by two paths.)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};