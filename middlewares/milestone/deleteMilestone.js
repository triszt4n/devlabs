/**
 * Delete milestone from db, redirect to /projects/:projID in the end.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let milestone = res.locals.milestone;
        let projID = res.locals.milestone._proj._id;

        milestone.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = "An error occured in our database while deleting milestone.";
                return res.redirect("/error");
            }
            return res.redirect(`/projects/${projID}`);
        });
    };
};