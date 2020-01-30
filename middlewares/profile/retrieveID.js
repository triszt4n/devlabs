/**
 * retrieve devID from session's devID, save into req.query
 * for further use.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        req.query.devID = req.session.devID;
        return next();
    };
  
};