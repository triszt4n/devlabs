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

            let iAmMember = false;
            //Remapping to be easier to use:
            result.forEach((member) => {
                member.joinDateString = moment(member.joinDate).format("YYYY/MM/DD");
                //check if user is member in project
                if (!iAmMember && (member._dev._id == req.session.userID)) {
                    iAmMember = true;
                }
            });
            
            res.locals.project.members = result;
            res.locals.project.iAmMember = iAmMember;
            return next();
        });
    };  
};