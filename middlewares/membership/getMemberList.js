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
        }).populate('_dev').sort('-creationDate').exec((err, result) => {
            if (err) {
                return next(err);
            }

            //Remapping to be easier to use:
            let members = [];
            result.forEach((item) => {
                members.push({
                    memshipID: item._id,
                    devID: item._dev._id,
                    name: item._dev.name,
                    email: item._dev.email,
                    rank: item._dev.rank,
                    joinDateString: moment(item._dev.creationDate).format("YYYY/MM/DD")
                });
            });
            
            res.locals.project.members = members;
            return next();
        });
    };  
};