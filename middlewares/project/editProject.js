/**
 * edit sprint's attribute with given data from body
 * if no data passed from body, move on.
 * (note: if title not specified, Untitled is default,
 * if reward not specified, 0.00 is default,
 * dates may be NULL)
 */
const moment = require('moment');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        //GET branch:
        if (req.method === "GET") {
            return next();
        }

        //POST branch:
        let startDateMoment = moment(req.body.startDate);
        let startDate = startDateMoment.isValid()? startDateMoment.toDate() : res.locals.startDate;

        return res.redirect(`/projects/${req.params.projID}`);
    };
};