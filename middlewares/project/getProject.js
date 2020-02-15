/**
 * get sprint's attributes from db with sprintID
 */
const moment = require('moment');
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {

    return function (req, res, next) {

        const ProjectModel = requireOption(objectRepository, 'ProjectModel');

        ProjectModel.findOne({
            _id: req.params.projID
        }).populate('_leader').exec((err, result) => {
            if (err) {
                return next(err);
            }

            if (result === null) {
                console.log("Project not found.");
                req.session.message = "The page you're looking for is not found.";
                return res.redirect("/error");
            }

            res.locals.project = result;
            res.locals.project.startDateString = moment(result.startDate).format("YYYY/MM/DD HH:mm");
            res.locals.project.endDateString = moment(result.endDate).format("YYYY/MM/DD HH:mm");
            return next();
        });
    };  
};