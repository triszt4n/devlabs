/**
 * Deletes the owner attribute of project so that noone can change project anymore.
 * This action translates down to "archiving" the project.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        var project = res.locals.project;

        if ((typeof req.body.isEnded !== 'undefined') && (req.body.isEnded == "on")) {
            project.endDate = (typeof project.endDate ==! 'undefined')? new Date() : project.endDate;
            project.isSuccess = false;
        }
        project._owner = undefined;

        project.save((err, result) => {
            if (err) {
                req.session.message = "An error occured while archiving. Try again.";
                console.log(err);
                return res.redirect(`/projects/${project._id}`);
            }
            
            return res.redirect(`/projects/${project._id}`);
        });
    };  
};