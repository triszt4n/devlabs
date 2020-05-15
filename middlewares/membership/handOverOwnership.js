/**
 * Overwrites owner of the project to the developer posted.
 */
const { MEMSHIP_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        let project = res.locals.membership._proj;
        project._owner = res.locals.membership._dev._id;

        project.save((err) => {
            if (err) {
                console.log(err);
                req.session.message = MEMSHIP_MESSAGES.handOverSaveError;
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${project._id}`);
        });
    };
};