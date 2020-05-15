/**
 * Only used for executing the edit of membership's rank attribute.
 */
const { MEMSHIP_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        let membership = res.locals.membership;
        membership.rank = (req.body.rank === "")? "Newcomer" : req.body.rank;

        membership.save((err) => {
            if (err) {
                console.log(err);
                req.session.message = MEMSHIP_MESSAGES.editSaveError;
                return res.redirect(`/projects/rankedit/${membership._id}`);
            }
            return res.redirect(`/projects/${membership._proj._id}`);
        });
    };
};