/**
 * Return developer's attributes. Gets email from body, if not found, moves on.
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
                return next(err);
            }
            
            res.locals.dev = result;
            return next();
        });
    };
};