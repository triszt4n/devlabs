/**
 * Return developer's attributes. Gets ID from req.query, else moves on.
 */
const requireOption = require('../default/requireOption');

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
                console.log("Developer not found.");
                req.session.message = "The page you're looking for is not found.";
                return res.redirect("/error");
            }

            res.locals.dev = result;
            return next();
        });
    };
};