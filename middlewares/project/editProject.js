/**
 * edit sprint's attribute with given data from body
 * if no data passed from body, move on.
 * (note: if title not specified, Untitled is default,
 * if reward not specified, 0.00 is default,
 * dates may be NULL)
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.body.title === 'undefined') {
            res.locals.title = "";
            res.locals.reward = "";
            res.locals.startDate = "";
            res.locals.endDate = "";
            res.locals.isEnded = false;
            res.locals.isSuccess = false;
        }

        return next();
    };  
};