/**
 * get task from db with taskID
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        milestone = {
            devID: 123,
            projID: 1,
            title: "Title lorem ipsum",
            msID: 123,
            desc: "Team attended workshop at IBM"
        }
        res.locals = milestone;

        return next();
    };
};