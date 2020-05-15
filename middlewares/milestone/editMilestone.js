/**
 * Execute edits of milestone's attributes with data posted. If no data in body, move on.
 */
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        //POST branch:
        let milestone = res.locals.milestone;

        milestone.desc = req.body.desc;

        milestone.save((err) => {
            if (err) {
                req.session.message = DEFAULT_MESSAGES.saveError;
                console.log(err);
                return res.redirect(`/milestone/edit/${req.params.msID}`);
            }

            return res.redirect(`/projects/${res.locals.milestone._proj._id}`);
        });
    };
};