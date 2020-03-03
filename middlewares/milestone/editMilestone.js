/**
 * Execute edits of milestone's attributes with data posted. If no data in body, move on.
 */
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
                req.session.message = "An error occured while applying changes. Try again.";
                console.log(err);
                return res.redirect(`/milestone/edit/${req.params.msID}`);
            }

            return res.redirect(`/projects/${res.locals.milestone._proj._id}`);
        });
    };
};