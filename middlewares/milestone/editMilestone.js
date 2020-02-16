/**
 * edit task's attribute with given data from body
 * if no data passed from body, move on.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        //POST branch:
        let milestone = res.locals.project;

        let startDateMoment = moment(req.body.startDate);
        if (startDateMoment.isValid())
            project.startDate = startDateMoment.toDate();

        if (req.body.isEnded) {
            let endDateMoment = moment(req.body.endDate);
            if (endDateMoment.isValid())
                project.endDate = endDateMoment.toDate();
            else
                project.endDate = (typeof res.locals.endDate !== 'undefined') ? res.locals.endDate : new Date();

            project.isSuccess = req.body.isSuccess;
        }
        if (req.body.title !== "")
            project.title = req.body.title;
        project.desc = req.body.desc;
        project.reward = (req.body.reward === "")? 0 : parseFloat(req.body.reward);

        project.save((err, result) => {
            if (err) {
                req.session.message = "An error occured while applying changes. Try again.";
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