/**
 * Return the developers as list of objects including all attributes
 * (needed by /developers)
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        var DeveloperModel = requireOption(objectRepository, 'DeveloperModel');

        DeveloperModel.find({}, (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.locals.devs = result;
            return next();
        });
    };
};