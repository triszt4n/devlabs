/**
 * Execute creation of milestone with data posted, if no data in body, move on.
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
                req.session.message = "An error occured while creating milestone. Try again.";
                console.log(err);
                return res.redirect(`/milestone/new/${req.params.projID}`);
            }

            return res.redirect(`/projects/${req.params.projID}`);
        });
    };  
};