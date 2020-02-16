/**
 * returns all of the members of the project in a list.
 */
const requireOption = require('../default/requireOption');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');

        MembershipModel.find({
            _proj: req.params.projID
        }).populate('_dev').sort('-joinDate').exec((err, result) => {
            if (err) {
                return next(err);
            }

            //Remapping to be easier to use:
            result.forEach((item) => {
                item.joinDateString = moment(item.joinDate).format("YYYY/MM/DD");
            });
            
            res.locals.project.members = result;
            return next();
        });
    };  
};