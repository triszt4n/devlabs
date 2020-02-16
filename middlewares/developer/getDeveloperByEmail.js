/**
 * return developer's attributes
 * get email from body, if not found, move on.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        var DeveloperModel = requireOption(objectRepository, 'DeveloperModel');

        DeveloperModel.findOne({
            email: req.body.email
        }, (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            
            res.locals.dev = result;
            return next();
        });
    };
};