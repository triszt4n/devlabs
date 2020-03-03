/**
 * Return the projects' attributes as list of objects including all attributes.
 */
const requireOption = require('../default/requireOption');
const async = require('async');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const ProjectModel = requireOption(objectRepository, 'ProjectModel');
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');

        //Getting all the projects:
        ProjectModel.find({}).populate('_owner').sort('-startDate').exec((err, projres) => {
            if (err) {
                return next(err);
            }
            let projects = projres;

            //Getting milestones for all projects:
            async.each(projects, (project, callback) => {
                project.startDateString = moment(project.startDate).format("YYYY/MM/DD HH:mm");
                if (typeof project.endDate !== "undefined")
                    project.endDateString = moment(project.endDate).format("YYYY/MM/DD HH:mm");

                MilestoneModel.find({
                    _proj: project._id
                }).populate('_dev').sort('-addedDate').limit(5).exec((err, msres) => {
                    if (err) {
                        return callback(err);
                    }

                    msres.forEach(ms => {
                        ms.addedDateString = moment(ms.addedDate).format("YYYY/MM/DD HH:mm");
                    });
                    
                    project.milestones = msres;
                    return callback();
                });
            }, (err) => {
                if (err) {
                    return next(err);
                }
                res.locals.projects = projects;
                return next();
            });
        });
    };
};