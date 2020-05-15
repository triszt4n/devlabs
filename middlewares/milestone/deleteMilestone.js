/**
 * Delete milestone from db, redirect to /projects/:projID in the end.
 */
const { MILESTONE_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        let milestone = res.locals.milestone;
        let projID = res.locals.milestone._proj._id;

        milestone.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = MILESTONE_MESSAGES.deleteSaveError;
                return res.redirect("/error");
            }
            return res.redirect(`/projects/${projID}`);
        });
    };
};