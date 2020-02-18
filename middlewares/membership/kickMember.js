/**
 * DESC
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let projID = res.locals.membership._proj._id;
        let membership = res.locals.membership;

        membership.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = "Error occured while kicking Member";
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${projID}`);
        });
    };
};