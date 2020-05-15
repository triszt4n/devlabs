/**
 * Delete project from db, plus execute deletion of milestones, memberships, and
 * finally redirect to /projects in the end.
 */
const async = require('async');
const { DEFAULT_MESSAGES } = require("../../utilities/constants");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        let projID = req.params.projID;
        let project = res.locals.project;
        let members = res.locals.project.members;
        let milestones = res.locals.project.milestones;

        async.waterfall([
            (callback) => {
                //deleting members
                async.each(members, (member, cb) => {
                    member.remove((err) => {
                        if (err) {
                            console.log("error at member: ", err);
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
                //deleting milestones
                async.each(milestones, (ms, cb) => {
                    ms.remove((err) => {
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
            },
            (callback) => {
                //deleting the project itself
                project.remove((err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                });
            }
        ], (err) => {
            if (err) {
                console.log(err);
                req.session.message = DEFAULT_MESSAGES.saveError;
                return res.redirect(`/error`);
            }
            return res.redirect(`/`);
        });
    };
};