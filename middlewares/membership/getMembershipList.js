/**
 * returns all of the memberships of the developer in a list.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');

        MembershipModel.find({
            _dev: req.params.devID
        }, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.dev.memberships = result;
            return next();
        });
    };  
};