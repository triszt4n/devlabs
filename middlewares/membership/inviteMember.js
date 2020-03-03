/**
 * Executes joining a new member to the project.
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        //projID from params, devID from body
        const MembershipModel = requireOption(objectRepository, 'MembershipModel');
        let member = new MembershipModel();
        if (typeof res.locals.invitation !== 'undefined') {
            member._dev = res.locals.invitation.devID;
            member._proj = res.locals.invitation.projID;
        }
        else {
            member._dev = req.body.devID;
            member._proj = req.params.projID;
        }

        member.save((err, result) => {
            if (err) {
                console.log(err);
                req.session.message = "Error occured while inviting member to project.";
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${result._proj}`);
        });
    };  
};