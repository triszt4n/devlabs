/**
 * DESC
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        console.log("yep", res.locals.membership);
        let projID = res.locals.membership._proj;
        res.locals.membership.remove((err) => {
            if (err) {
                console.log(err);
                req.session.message = "Error occured while kicking Member";
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${projID}`);
        });
    };  
};