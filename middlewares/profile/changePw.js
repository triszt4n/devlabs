/**
 * changes developer's password to the body.newpass1,
 * then redirect to /profile
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};