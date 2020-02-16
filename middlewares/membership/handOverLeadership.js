/**
 * edit membership's rank attribute
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let project = res.locals.membership._proj;
        project._leader = res.locals.membership._dev._id;

        project.save((err) => {
            if (err) {
                console.log(err);
                req.session.message = "Error occured while assigning project to new leader. Try again.";
                return res.redirect(`/error`);
            }
            return res.redirect(`/projects/${project._id}`);
        });
    };
};