/**
 * Return the 3 most rewarding and successful projects as list of objects including all attributes.
 */
const moment = require('moment');
const requireOption = require("../default/requireOption");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const ProjectModel = requireOption(objectRepository, 'ProjectModel');

        ProjectModel.find({
            isSuccess: true
        }).populate('_owner').sort('-reward').limit(3).exec((err, projRes) => {
            if (err) {
                return next(err);
            }

            projRes.forEach(project => {
                project.startDateString = moment(project.startDate).format("YYYY/MM/DD HH:mm");
                project.endDateString = moment(project.endDate).format("YYYY/MM/DD HH:mm");
                project.runTime = getRunTimeString(project.endDate, project.startDate);
            });

            res.locals.tops = projRes;
            return next();
        });
    };
};

function getRunTimeString(endDate, startDate) {
    //get difference in days:
    let diff = Math.abs(endDate - startDate) / (1000 * 3600 * 24);
    if (diff < 60) {
        return diff.toFixed(0).toString() + " days";
    } else if (diff < 24*30) {
        diff /= 24*30;
        return "~" + diff.toFixed(1).toString() + " months";
    } else {
        diff /= 24*365;
        return "~" + diff.toFixed(2).toString() + " years";
    }
}