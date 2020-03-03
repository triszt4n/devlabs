/**
 * When deleting account, must change every milestone's devID to null, and
 * delete every membership from db (frontend will show milestones with [deleted]).
 */
const async = require('async');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        let memberships = res.locals.dev.memberships;
        let milestones = res.locals.dev.milestones;

        async.waterfall([
            (callback) => {
                //removing memberships
                async.each(memberships, (memship, cb) => {
                    memship.remove((err) => {
                        if (err) {
                            console.log("error at memship: ", err);
                            return cb(err);
                        }
                        return cb();
                    });
                }, (err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                });
            },
            (callback) => {
                //changing milestones
                async.each(milestones, (ms, cb) => {
                    ms._dev = null;
                    ms.save((err) => {
                        if (err) {
                            console.log("error at milestone: ", err);
                            return cb(err);
                        }
                        return cb();
                    });
                }, (err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                });
            }
        ], (err) => {
            //after successful each-es
            if (err) {
                return next(err);
            }

            console.log("Successful relation nullification.");
            return next();
        });
    };  
};