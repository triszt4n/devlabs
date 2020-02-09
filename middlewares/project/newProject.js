/**
 * create a new sprint with given data from body
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
            res.locals = {
                title: "",
                startDateString: "",
                endDateString: "",
                isEnded: false,
                isSuccess: false,
                desc: ""
            };

            return next();
        }

        //POST branch:
        let startDateMoment = moment(req.body.startDate);
        let startDate = (startDateMoment.isValid() && req.body.startDate !== "")? startDateMoment.toDate() : new Date();

        return next();
    };  
};