/**
 * return the developer's (by given devID) all tasks as list of objects (taskList)
 * each object contains taskID and title of sprint 
 */
const requireOption = require('../default/requireOption');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        
        MilestoneModel.find({
            _proj: req.params.projID
        }).populate('_dev').sort('-addedDate').exec((err, msres) => {
            if (err) {
                return next(err);
            }

            msres.forEach(ms => {
                ms.addedDateString = moment(ms.addedDate).format("YYYY/MM/DD HH:mm");
            });

            res.locals.project.milestones = msres;
            return next();
        });
    };  
};