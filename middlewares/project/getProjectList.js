/**
 * return the projects' attributes as list of objects including all attributes
 * note: this became a whole microservice
 */
const requireOption = require('../default/requireOption');
const async = require('async');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const ProjectModel = requireOption(objectRepository, 'ProjectModel');
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');

        let conditionObject = (req.path.indexOf("/all") > 0) ? {
            _leader: req.session.userID
        } : {};

        ProjectModel.find(conditionObject).populate('_leaderID').exec((err, projres) => {
            if (err) {
                return next(err);
            }
            let projects = projres;

            //Getting milestones for all projects:
            async.each(projects, (project, callback) => {
                project.startDateString = moment(project.startDate).format("YYYY/MM/DD HH:mm");
                project.endDateString = moment(project.endDate).format("YYYY/MM/DD HH:mm");

                MilestoneModel.find({
                    _projID: project._id
                }).sort('-addedDate').limit(5).exec((err, msres) => {
                    if (err) {
                        return callback(err);
                    }

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