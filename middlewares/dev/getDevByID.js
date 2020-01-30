/**
 * return developer's attributes (except pw)
 * get ID from req.query, else move on.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};