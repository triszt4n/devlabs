/**
 * returns all of the memberships of the developer in a list.
 */
const requireOption = require('../default/requireOption');
const async = require('async');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');
        const ProjectModel = requireOption(objectRepository, 'ProjectModel');

        MembershipModel.find({
            _dev: req.params.devID
        }).populate('_proj').sort('-creationDate').exec((err, memshipRes) => {
            if (err) {
                return next(err);
            }

            async.each(memshipRes, (memship, callback) => {
                ProjectModel.populate(memship._proj, '_leader', (err) => {
                    if (err) {
                        return callback(err);
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