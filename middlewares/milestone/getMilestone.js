/**
 * Get milestone and its attributes from db with msID.
 */
const requireOption = require('../default/requireOption');
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const MilestoneModel = requireOption(objectRepository, 'MilestoneModel');
        
        MilestoneModel.findOne({
            _id: req.params.msID
        }).populate('_proj').exec((err, msres) => {
            if (err) {
                return next(err);
            }

            res.locals.milestone = msres;
            res.locals.milestone.addedDateString = moment(msres.addedDate).format("YYYY/MM/DD HH:mm");
            return next();
        });
    };  
};