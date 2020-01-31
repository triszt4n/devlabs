/**
 * return the developers' as list of objects including all attributes
 * (excluding password, freshpw)
 * (needed by /devs)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};