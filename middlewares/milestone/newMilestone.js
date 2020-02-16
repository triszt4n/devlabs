/**
 * create a new task in db from given data from body
 * if no data passed from body, move on.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        //POST branch:
        var MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        let milestone = new MilestoneModel();

        milestone.desc = req.body.desc;
        milestone.addedDate = new Date();
        milestone._proj = req.params.projID;
        milestone._dev = req.session.userID;

        milestone.save((err) => {
            if (err) {
                req.session.message = "An error occured while applying changes. Try again.";
                console.log(err);
                return res.redirect(`/milestone/edit/${req.params.msID}`);
            }

            return res.redirect(`/projects/${req.params.projID}`);
        });
    };  
};