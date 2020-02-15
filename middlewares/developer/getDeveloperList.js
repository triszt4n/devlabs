/**
 * return the developers' as list of objects including all attributes
 * (excluding password, freshpw)
 * (needed by /devs)
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        var DevModel = requireOption(objectRepository, 'DevModel');

        DevModel.find({}, (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.locals.devs = result;
            return next();
        });
    };
};