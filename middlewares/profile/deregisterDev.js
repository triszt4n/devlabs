/**
 * change isAdmin attribute of developer to false, and delete password,
 * end session and redirect to /
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};