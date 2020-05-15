/**
 * Execute creation of a new project with posted data, if no data in body, move on.
 * (note: if title not specified, Untitled is default,
 * if reward not specified, 0.00 is default)
 */
const moment = require('moment');
const requireOption = require('../default/requireOption');
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            res.locals.project = {
                title: "",
                startDateString: "",
                endDateString: "",
                isEnded: false,
                isSuccess: false,
                desc: ""
            };

            return next();
        }

        //POST branch:
        //Defining new Project:
        var ProjectModel = requireOption(objectRepository, 'ProjectModel');
        var project = new ProjectModel();

        let startDateMoment = moment(req.body.startDate);
        if ((typeof req.body.isEnded !== 'undefined') && (req.body.isEnded == "on")) {
            let endDateMoment = moment(req.body.endDate);
            project.endDate = (startDateMoment.isValid() && req.body.endDate !== "")? endDateMoment.toDate() : new Date();
        }
        project.startDate = (startDateMoment.isValid() && req.body.startDate !== "")? startDateMoment.toDate() : new Date();
        project.title = req.body.title;
        project.desc = req.body.desc;
        project.githubRepoPath = req.body.githubRepoPath;
        project.reward = (req.body.reward === "")? 0 : parseFloat(req.body.reward);
        project.isSuccess = ((typeof req.body.isSuccess !== 'undefined') && (req.body.isSuccess == "on"));
        project._owner = req.session.userID;

        project.save((err, result) => {
            if (err) {
                req.session.message = DEFAULT_MESSAGES.saveError;
                console.log(err);
                return res.redirect("/projects/new");
            }
            
            //passing these for "inviting" the creator:
            res.locals = new Object({
                invitation: {
                    projID: result._id,
                    devID: req.session.userID
                }
            });
            return next();
        });
    };  
};