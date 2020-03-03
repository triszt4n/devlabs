/**
 * Return the developer's all milestones as list of objects.
 */
const requireOption = require('../default/requireOption');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        let devID = (typeof req.params.devID === 'undefined')? req.session.userID : req.params.devID;
        
        MilestoneModel.find({
            _dev: devID
        })/*.populate('_proj')*/.sort('-addedDate').exec((err, msres) => {
            if (err) {
                return next(err);
            }

            msres.forEach(ms => {
                ms.addedDateString = moment(ms.addedDate).format("YYYY/MM/DD HH:mm");
            });

            res.locals.dev.milestones = msres;
            return next();
        });
    };  
};