/**
 * Execute edits of project with data posted, if no data in body, move on.
 * (note: if title not specified, Untitled is default,
 * if reward not specified, 0.00 is default)
 */
const moment = require('moment');
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        //POST branch:
        let project = res.locals.project;

        let startDateMoment = moment(req.body.startDate);
        if (startDateMoment.isValid())
            project.startDate = startDateMoment.toDate();

        project.endDate = undefined;
        if ((typeof req.body.isEnded !== 'undefined') && (req.body.isEnded == "on")) {
            let endDateMoment = moment(req.body.endDate);
            if (endDateMoment.isValid())
                project.endDate = endDateMoment.toDate();
            else
                project.endDate = (typeof res.locals.endDate !== 'undefined') ? res.locals.endDate : new Date();

            project.isSuccess = ((typeof req.body.isSuccess !== 'undefined') && (req.body.isSuccess == "on"));
        }
        if (req.body.title !== "")
            project.title = req.body.title;
        project.desc = req.body.desc;
        project.githubRepoPath = req.body.githubRepoPath;
        project.reward = (req.body.reward === "")? 0 : parseFloat(req.body.reward);

        project.save((err, result) => {
            if (err) {
                req.session.message = DEFAULT_MESSAGES.saveError;
                console.log(err);
                return res.redirect(`/projects/edit/${req.params.projID}`);
            }

            //passing these for "inviting" the creator:
            res.locals = new Object({
                invitation: {
                    projID: result._id,
                    devID: req.session.userID
                }
            });
            return res.redirect(`/projects/${req.params.projID}`);
        });
    };
};