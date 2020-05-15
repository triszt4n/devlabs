/**
 * Return developer's attributes. Gets ID from req.query, else moves on.
 */
const requireOption = require('../default/requireOption');
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const DeveloperModel = requireOption(objectRepository, 'DeveloperModel');
        let devID = (typeof req.params.devID === 'undefined')? req.session.userID : req.params.devID;

        DeveloperModel.findOne({
            _id: devID
        }, (err, result) => {
            if (err) {
                return next(err);
            }

            if (result === null) {
                req.session.message = DEFAULT_MESSAGES.pageNotFoundError;
                return res.redirect("/error");
            }

            res.locals.dev = result;
            return next();
        });
    };
};