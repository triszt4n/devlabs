/**
 * Return the project's attributes from db.
 */
const moment = require('moment');
const requireOption = require('../default/requireOption');
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {

    return function (req, res, next) {

        const ProjectModel = requireOption(objectRepository, 'ProjectModel');

        ProjectModel.findOne({
            _id: req.params.projID
        }).populate('_owner').exec((err, result) => {
            if (err) {
                return next(err);
            }

            if (result === null) {
                console.log("Can't find project by ID.");
                req.session.message = DEFAULT_MESSAGES.pageNotFoundError;
                return res.redirect("/error");
            }

            res.locals.project = result;
            res.locals.project.startDateString = moment(result.startDate).format("YYYY/MM/DD HH:mm");
            if (typeof result.endDate !== "undefined") {
                res.locals.project.endDateString = moment(result.endDate).format("YYYY/MM/DD HH:mm");
                res.locals.project.isEnded = true;
            } 
            else {
                res.locals.project.endDateString = "";
                res.locals.project.isEnded = false;
            }

            res.locals.iAmOwner = ((result._owner != null) && (result._owner._id == req.session.userID));
            return next();
        });
    };  
};