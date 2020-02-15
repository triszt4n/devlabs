/**
 * create a new sprint with given data from body
 * if no data passed from body, move on.
 * (note: if title not specified, Untitled is default,
 * if reward not specified, 0.00 is default,
 * dates may be NULL)
 */
const moment = require('moment');
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            res.locals = {
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
        if (typeof req.body.isEnded !== 'undefined' && req.body.isEnded) {
            let endDateMoment = moment(req.body.endDate);
            project.endDate = (startDateMoment.isValid() && req.body.endDate !== "")? endDateMoment.toDate() : new Date();
        }
        project.startDate = (startDateMoment.isValid() && req.body.startDate !== "")? startDateMoment.toDate() : new Date();
        project.title = req.body.title;
        project.desc = req.body.desc;
        project.reward = (req.body.reward === "")? 0 : parseFloat(req.body.reward);
        project.isSuccess = (typeof req.body.isSuccess === 'undefined' || req.body.isSuccess === false)? false : true;
        project._leader = req.session.userID;

        project.save((err, result) => {
            if (err) {
                req.session.message = "An error occured while creating item. Try again.";
                console.log(err);
                return res.redirect("/projects/new");
            }
            return res.redirect(`/projects/${result._id}`);
        });
    };  
};