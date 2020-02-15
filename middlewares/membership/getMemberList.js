/**
 * returns all of the members of the project in a list.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');

        MembershipModel.find({
            _proj: req.params.projID
        }, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.project.members = result;
            return next();
        });
    };  
};