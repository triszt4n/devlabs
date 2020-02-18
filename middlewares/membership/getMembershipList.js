/**
 * returns all of the memberships of the developer in a list.
 */
const requireOption = require('../default/requireOption');
const async = require('async');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');
        const ProjectModel = requireOption(objectRepository, 'ProjectModel');

        let devID = (typeof req.params.devID === 'undefined')? req.session.userID : req.params.devID;

        MembershipModel.find({
            _dev: devID
        }).populate('_proj').sort('-joinDate').exec((err, memshipRes) => {
            if (err) {
                return next(err);
            }

            memshipRes.iHaveOwnership = false;

            async.each(memshipRes, (memship, callback) => {
                memship.joinDateString = moment(memship.joinDate).format("YYYY/MM/DD");
                ProjectModel.populate(memship._proj, '_owner', (err) => {
                    if (err) {
                        return callback(err);
                    }
                    if (memship._proj._owner._id.equals(req.session.userID)) {
                        memshipRes.iHaveOwnership = true;
                    }
                    return callback();
                });
            }, (err) => {
                if (err) {
                    return next(err);
                }

                res.locals.dev.memberships = memshipRes;
                return next();
            });
        });
    };
};