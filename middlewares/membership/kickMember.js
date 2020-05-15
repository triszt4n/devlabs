/**
 * Executes sacking a member from the project by deleting its membership.
 */
const { MEMSHIP_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        let projID = res.locals.membership._proj._id;
        let membership = res.locals.membership;

        membership.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = MEMSHIP_MESSAGES.kickSaveError;
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${projID}`);
        });
    };
};