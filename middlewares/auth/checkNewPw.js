/**
 * checks in db, if developer's freshpw attribute is true
 * if not, redirect to /sprints, else: redirect to /newpw
 * note: developer is got from devID (from locals)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};