/**
 * Returns the attributes of the membership.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');

        MembershipModel.findOne({
            _id: req.params.memshipID
        }).populate('_dev').populate('_proj').exec((err, result) => {
            if (err) {
                return next(err);
            }
            
            res.locals.membership = result;
            return next();
        });
    };  
};