/**
 * change user's password in db to an 8-character random key, "send it to them".
 * finally redirect to /
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};