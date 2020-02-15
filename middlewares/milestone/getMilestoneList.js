/**
 * return the developer's (by given devID) all tasks as list of objects (taskList)
 * each object contains taskID and title of sprint 
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        MilestoneModel.find({
            _proj: req.params.projID
        }).sort('-addedDate').exec((err, msres) => {
            if (err) {
                return next(err);
            }

            res.locals.project.milestones = msres;
            return next();
        });
    };  
};