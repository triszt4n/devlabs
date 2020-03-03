/**
 * Only used for executing the edit of membership's rank attribute.
 */
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
                req.session.message = "Error occured while applying changes to Member's details. Try again.";
                return res.redirect(`/projects/rankedit/${membership._id}`);
            }
            return res.redirect(`/projects/${membership._proj._id}`);
        });
    };
};