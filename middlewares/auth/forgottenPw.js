/**
 * if res.locals.devID is undefined or the developer is not admin
 * then don't do anything, else:
 * change password in db to an 8-character random key, and set the
 * freshwp attribute to true.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};